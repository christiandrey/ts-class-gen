using System;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using Caretaker.Common.Constants;
using Caretaker.Models.Dtos;
using Caretaker.Models.Entities;
using Caretaker.Models.Enums;
using Caretaker.Models.Services.Payments.Others;
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Entities.Interfaces;
using Caretaker.Services.Messaging;
using Caretaker.Services.Permissions.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Caretaker.Controllers
{
   [Authorize]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/payments")]
   public class PaymentsController : BaseController
   {
      private readonly ICurrencyService _currencyService;
      private readonly IEstateService _estateService;
      private readonly IMessagingService _messagingService;
      private readonly IPaymentService _paymentService;
      private readonly IPaymentBeneficiaryService _paymentBeneficiaryService;
      private readonly IPermissionsService _permissionsService;
      private readonly IRecurringPaymentService _recurringPaymentService;
      private readonly IResidentService _residentService;
      private readonly IServiceChargeLogService _serviceChargeLogService;
      private readonly IMapper _mapper;

      public PaymentsController(
         ICurrencyService currencyService,
         IEstateService estateService,
         IMessagingService messagingService,
         IPaymentService paymentService,
         IPaymentBeneficiaryService paymentBeneficiaryService,
         IPermissionsService permissionsService,
         IRecurringPaymentService recurringPaymentService,
         IResidentService residentService,
         IServiceChargeLogService serviceChargeLogService,
         IMapper mapper) : base(mapper)
      {
         _currencyService = currencyService;
         _estateService = estateService;
         _messagingService = messagingService;
         _paymentService = paymentService;
         _paymentBeneficiaryService = paymentBeneficiaryService;
         _permissionsService = permissionsService;
         _recurringPaymentService = recurringPaymentService;
         _residentService = residentService;
         _serviceChargeLogService = serviceChargeLogService;
         _mapper = mapper;
      }

      [HttpPost("")]
      public async Task<ActionResult<Response<PaymentDto>>> CreatePaymentAsync(PaymentCreationOptionsDto dto)
      {
         var userId = GetUserId();

         var localAmount = dto.LocalAmount;

         var currency = await _currencyService.GetByRegionCodeOrDefaultAsync();

         var currencyToBaseExchangeRate = _currencyService.GetCurrencyToBaseExchangeRate(currency);

         var amount = localAmount * currencyToBaseExchangeRate;

         var payment = await _paymentService.CreateAsync(_mapper.Map<PaymentCreationOptionsDto, PaymentCreationOptions>(dto), userId, amount);

         if (dto.Recurrence != Recurrence.None)
         {
            var recurringPayment = new RecurringPayment
            {
               LocalAmount = localAmount,
               Description = dto.Description,
               Notes = dto.Notes,
               Mode = dto.Mode,
               CurrencyId = currency.Id,
               UserId = userId,
               RecipientId = dto.RecipientId,
               Recurrence = dto.Recurrence,
               StartDate = dto.RecurrenceStartAt ?? DateTime.Now,
               PaymentAccountId = dto.PaymentAccountId,
            };

            await _recurringPaymentService.CreateAsync(recurringPayment);
         }

         return Ok(_mapper.Map<PaymentDto>(payment));
      }

      [Authorize(Roles = nameof(UserRoleType.Resident))]
      [HttpPost("service-charge/{localAmount:decimal}")]
      public async Task<ActionResult<Response<PaymentDto>>> CreateServiceChargePaymentAsync(decimal localAmount, Guid? paymentAccountId)
      {
         var userId = GetUserId();

         var resident = await _residentService.GetCurrentByUserIdAsync(userId, true);

         await _permissionsService.AssertOrganizationManagesFundsOnlineAsync(resident.Apartment.EstateId);

         var apartment = resident.Apartment;

         var apartmentType = apartment.Type;

         var estate = resident.Apartment.Estate;

         var paymentAccount = _estateService.GetPaymentAccountOrDefault(estate, paymentAccountId);

         if (estate == null || apartmentType.ServiceChargeAmount <= 0)
         {
            return BadRequest();
         }

         var currency = await _currencyService.GetByRegionCodeOrDefaultAsync();

         var currencyToBaseExchangeRate = _currencyService.GetCurrencyToBaseExchangeRate(currency);

         var amount = localAmount * currencyToBaseExchangeRate;

         var isFullPayment = amount == apartmentType.ServiceChargeAmount;

         if (isFullPayment)
         {
            var recurringPayments = await _recurringPaymentService.GetAllByUserAsync(userId);

            var serviceChargeRecurringPayment = recurringPayments.FirstOrDefault(o => o.EstateId == estate.Id && o.Description == TransactionDescriptions.ServiceCharge);

            if (serviceChargeRecurringPayment != null)
            {
               await _recurringPaymentService.DeleteByIdAsync(serviceChargeRecurringPayment.Id, userId);
            }
         }

         var payment = await _paymentService.CreateAsync(new PaymentCreationOptions
         {
            RecipientId = estate.FacilityManager.UserId,
            EstateId = estate.Id,
            Description = TransactionDescriptions.ServiceCharge,
            Mode = PaymentMode.Wallet,
            PaymentAccountId = paymentAccountId,
         }, userId, amount);

         await _serviceChargeLogService.CreateAsync(new ServiceChargeLog
         {
            ResidentId = resident.Id,
            IsCredit = true,
            Amount = amount,
            PaymentId = payment.Id,
            ApartmentId = apartment.Id,
            PaymentAccountId = paymentAccountId,
         });

         if (isFullPayment && apartmentType.ServiceChargeRecurrence != Recurrence.None)
         {
            var recurringPayment = new RecurringPayment
            {
               LocalAmount = localAmount,
               Description = TransactionDescriptions.ServiceCharge,
               Mode = PaymentMode.Wallet,
               CurrencyId = currency.Id,
               UserId = userId,
               RecipientId = estate.FacilityManager.UserId,
               EstateId = estate.Id,
               Recurrence = apartmentType.ServiceChargeRecurrence,
               StartDate = DateTime.Now,
               PaymentAccountId = paymentAccountId,
            };

            await _recurringPaymentService.CreateAsync(recurringPayment);
         }

         var updatedResident = await _residentService.GetByIdAsync(resident.Id);

         var baseToCurrencyExchangeRate = _currencyService.GetBaseToCurrencyExchangeRate(currency);

         await _messagingService.SendOnPaymentSuccessfulAsync(
            updatedResident.User.PhoneNumber,
            currency.Symbol,
            localAmount,
            updatedResident.GetServiceChargeBalance() * baseToCurrencyExchangeRate
         );

         return Ok(_mapper.Map<PaymentDto>(payment));
      }

      [HttpGet("")]
      public async Task<ActionResult<PaginatedResponse<PaymentDto>>> GetPaymentsByUserAsync(int page = 1, int pageSize = 30)
      {
         var userId = GetUserId();

         var payments = await _paymentService.GetByUserAsync(userId, page, pageSize);

         return Paginated<Payment, PaymentDto>(payments);
      }

      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<PaymentDto>>> GetPaymentIdAsync(Guid id)
      {
         var payment = await _paymentService.GetByIdAsync(id, true);

         return Ok(_mapper.Map<Payment, PaymentDto>(payment));
      }

      [HttpGet("summary")]
      public async Task<ActionResult<Response<PaymentSummaryDto>>> GetSummaryByUserAsync()
      {
         var userId = GetUserId();

         var summary = await _paymentService.GetSummaryByUserAsync(userId);

         return Ok(_mapper.Map<PaymentSummaryDto>(summary));
      }

      [HttpGet("all"), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<PaginatedResponse<PaymentDto>>> GetPaymentsAsync(
          string query = null, int page = 1, int pageSize = 30, Guid? userId = null)
      {
         var payments = !userId.HasValue
             ? await _paymentService.GetAllAsync(page, pageSize)
             : await _paymentService.GetByUserAsync(userId.Value, page, pageSize);

         return Paginated<Payment, PaymentDto>(payments);
      }

      [HttpPut("{id:guid}/evidence")]
      public async Task<ActionResult<Response<PaymentDto>>> UpdateEvidenceUrlAsync(Guid id, PaymentUpdateOptionsDto dto)
      {
         var payment = await _paymentService.UpdateEvidenceUrlAsync(id, dto.EvidenceUrl);

         return Ok(_mapper.Map<PaymentDto>(payment));
      }

      [HttpDelete("beneficiaries/{id:guid}")]
      public async Task<ActionResult<Response>> DeletePaymentBeneficiaryAsync(Guid id)
      {
         var userId = GetUserId();

         await _paymentBeneficiaryService.DeleteAsync(id, userId);

         return Ok();
      }
   }
}