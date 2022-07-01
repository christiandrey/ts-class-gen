using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using Caretaker.Common.Constants;
using Caretaker.Models.Dtos;
using Caretaker.Models.Entities;
using Caretaker.Models.Enums;
using Caretaker.Models.Services.Management;
using Caretaker.Models.Services.Payments.Others;
using Caretaker.Models.Utilities;
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Entities.Interfaces;
using Caretaker.Services.Messaging;
using Caretaker.Services.Permissions.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Caretaker.Controllers
{
   [Authorize]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/residents")]
   public class ResidentController : BaseController
   {
      private readonly ICurrencyService _currencyService;
      private readonly IEstateService _estateService;
      private readonly IMessagingService _messagingService;
      private readonly IResidentService _residentService;
      private readonly IPaymentService _paymentService;
      private readonly IPermissionsService _permissionsService;
      private readonly IProjectService _projectService;
      private readonly IServiceChargeLogService _serviceChargeLogService;
      private readonly ITransactionService _transactionService;
      private readonly IUserService _userService;
      private readonly IWalletService _walletService;
      private readonly ILogger _logger;
      private readonly IMapper _mapper;

      public ResidentController(
         ICurrencyService currencyService,
         IEstateService estateService,
         IMessagingService messagingService,
         IResidentService residentService,
         IPaymentService paymentService,
         IPermissionsService permissionsService,
         IProjectService projectService,
         IServiceChargeLogService serviceChargeLogService,
         ITransactionService transactionService,
         IUserService userService,
         IWalletService walletService,
         ILogger<ResidentController> logger,
         IMapper mapper) : base(mapper)
      {
         _currencyService = currencyService;
         _estateService = estateService;
         _messagingService = messagingService;
         _residentService = residentService;
         _paymentService = paymentService;
         _permissionsService = permissionsService;
         _projectService = projectService;
         _serviceChargeLogService = serviceChargeLogService;
         _transactionService = transactionService;
         _userService = userService;
         _walletService = walletService;
         _mapper = mapper;
         _logger = logger;
      }

      [HttpPost("")]
      public async Task<ActionResult<Response<IEnumerable<ResidentDto>>>> CreateAsync()
      {
         var userId = GetUserId();

         var residents = await _residentService.CreateAsync(userId);

         return Ok(residents.Select(_mapper.Map<ResidentDto>));
      }

      [HttpGet("current")]
      public async Task<ActionResult<Response<ResidentDto>>> GetCurrentAsync()
      {
         var userId = GetUserId();

         var resident = await _residentService.GetCurrentByUserIdAsync(userId);

         if (resident == null)
         {
            return NotFound(ResponseMessages.ResidentNotExist);
         }

         return Ok(_mapper.Map<ResidentDto>(resident));
      }

      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<ResidentDto>>> GetByIdAsync(Guid id)
      {
         var resident = await _residentService.GetByIdAsync(id);

         if (resident == null)
         {
            return NotFound(ResponseMessages.ResidentNotExist);
         }

         return Ok(_mapper.Map<ResidentDto>(resident));
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpGet("")]
      public async Task<ActionResult<PaginatedResponse<ResidentLiteDto>>> GetAllAsync(string query = null, int page = 1, int pageSize = 30)
      {
         var residents = await _residentService.GetAllAsync(page, pageSize, query);

         return Paginated<Resident, ResidentLiteDto>(residents);
      }

      [HttpPatch("{id:guid}")]
      public async Task<ActionResult<Response<ResidentDto>>> UpdateAsync(Guid id, ResidentUpdateOptionsDto dto)
      {
         var userId = GetUserId();

         var resident = await _residentService.UpdateAsync(id, _mapper.Map<ResidentUpdateOptions>(dto));

         if (resident.Apartment.EstateId.HasValue)
         {
            await _permissionsService.AssertOrganizationScopeAsync(resident.Apartment.EstateId.Value, userId, OrganizationScopes.ApartmentManage);
         }

         return Ok(_mapper.Map<ResidentDto>(resident));
      }

      [HttpGet("current/projects")]
      public async Task<ActionResult<PaginatedResponse<ProjectLiteDto>>> GetProjectsAsync([FromQuery] ProjectQuery projectQuery, int page = 1, int pageSize = 30)
      {
         var userId = GetUserId();

         var resident = await _residentService.GetCurrentByUserIdAsync(userId, true);

         var projects = await _projectService.GetAllByResidentAsync(resident.Id, page, pageSize, projectQuery);

         return Paginated<Project, ProjectLiteDto>(projects);
      }

      [HttpGet("{id:guid}/projects")]
      public async Task<ActionResult<PaginatedResponse<ProjectLiteDto>>> GetProjectsByResidentAsync([FromQuery] ProjectQuery projectQuery, Guid id, int page = 1, int pageSize = 30)
      {
         var projects = await _projectService.GetAllByResidentAsync(id, page, pageSize, projectQuery);

         return Paginated<Project, ProjectLiteDto>(projects);
      }

      [HttpGet("{id:guid}/payments")]
      public async Task<ActionResult<PaginatedResponse<PaymentLiteDto>>> GetPaymentsAsync(Guid id, string query = null, int page = 1, int pageSize = 30)
      {
         var resident = await _residentService.GetByIdAsync(id, true);

         var payments = await _paymentService.GetByUserAsync(resident.UserId, page, pageSize, query);

         return Paginated<Payment, PaymentLiteDto>(payments);
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpPost("{id:guid}/payments/service-charge/{localAmount:decimal}")]
      public async Task<ActionResult<Response<PaymentDto>>> CreateOfflineServiceChargePayment(Guid id, decimal localAmount, Guid? paymentAccountId)
      {
         var userId = GetUserId();

         var resident = await _residentService.GetByIdAsync(id, true);

         var userWallet = await _userService.GetWalletAsync(userId);

         var residentWallet = await _userService.GetWalletAsync(resident.UserId);

         var estate = resident.Apartment.Estate;

         await _permissionsService.AssertOrganizationScopeAsync(estate.Id, userId, OrganizationScopes.IncomeRemit);

         var paymentAccount = _estateService.GetPaymentAccountOrDefault(estate, paymentAccountId);

         var apartment = resident.Apartment;

         var apartmentType = apartment.Type;

         if (apartmentType.ServiceChargeAmount <= 0)
         {
            return BadRequest();
         }

         var currency = await _currencyService.GetByRegionCodeOrDefaultAsync();

         var currencyToBaseExchangeRate = _currencyService.GetCurrencyToBaseExchangeRate(currency);

         var amount = localAmount * currencyToBaseExchangeRate;

         if (estate.OrganizationId.HasValue && estate.Organization.ManageFundsOffline)
         {
            await _walletService.CreditAsync(residentWallet, amount);
         }
         else
         {
            await _walletService.TransferFromWalletToWalletAsync(userWallet.Id, residentWallet.Id, amount);

            await _transactionService.CreateAsync(userId, amount, TransactionDescriptions.OfflineServiceChargeRemittance, TransactionMode.Wallet);
         }

         await _transactionService.CreateAsync(resident.UserId, amount, TransactionDescriptions.Topup, TransactionMode.Wallet, true);

         try
         {
            var payment = await _paymentService.CreateAsync(new PaymentCreationOptions
            {
               EstateId = estate.Id,
               RecipientId = estate.FacilityManager.UserId,
               Description = TransactionDescriptions.ServiceCharge,
               Mode = PaymentMode.Wallet,
               PaymentAccountId = paymentAccountId,
            }, resident.UserId, amount);

            await _serviceChargeLogService.CreateAsync(new ServiceChargeLog
            {
               ResidentId = resident.Id,
               IsCredit = true,
               Amount = amount,
               PaymentId = payment.Id,
               ApartmentId = apartment.Id,
               PaymentAccountId = paymentAccountId,
            });

            var updatedResident = await _residentService.GetByIdAsync(id);

            var baseToCurrencyExchangeRate = _currencyService.GetBaseToCurrencyExchangeRate(currency);

            await _messagingService.SendOnPaymentSuccessfulAsync(
               updatedResident.User.PhoneNumber,
               currency.Symbol,
               localAmount,
               updatedResident.GetServiceChargeBalance() * baseToCurrencyExchangeRate
            );

            return Ok(_mapper.Map<PaymentDto>(payment));
         }
         catch (Exception exception)
         {
            await _walletService.DebitAsync(residentWallet, amount);

            await _transactionService.CreateAsync(resident.UserId, amount, TransactionDescriptions.TopupReversal, TransactionMode.Cash);

            _logger.LogError(exception, LogMessages.E_ServiceChargeCreditFailed, resident.UserId, localAmount);

            return BadRequest();
         }
      }

      [HttpDelete("{id:guid}")]
      public async Task<ActionResult<Response>> DeleteResidentAsync(Guid id)
      {
         var userId = GetUserId();

         var resident = await _residentService.GetByIdAsync(id, true);

         if (resident.Apartment.EstateId.HasValue)
         {
            await _permissionsService.AssertOrganizationScopeAsync(resident.Apartment.EstateId.Value, userId, OrganizationScopes.ApartmentManage);
         }

         await _residentService.DeleteAsync(id, userId);

         return Ok();
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpDelete("{id:guid}/offboard")]
      public async Task<ActionResult<Response>> OffboardResidentAsync(Guid id)
      {
         var userId = GetUserId();

         var resident = await _residentService.GetByIdAsync(id, true);

         if (resident.Apartment.EstateId.HasValue)
         {
            await _permissionsService.AssertOrganizationScopeAsync(resident.Apartment.EstateId.Value, userId, OrganizationScopes.ApartmentManage);
         }

         await _residentService.OffboardAsync(id, userId);

         return Ok();
      }
   }
}