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
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Entities.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Caretaker.Controllers
{
   [Authorize]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/apartment-types")]
   public class ApartmentTypeController : BaseController
   {
      private readonly IApartmentTypeService _apartmentTypeService;
      private readonly ICurrencyService _currencyService;
      private readonly IRecurringPaymentService _recurringPaymentService;
      private readonly IResidentService _residentService;
      private readonly IMapper _mapper;

      public ApartmentTypeController(
         IApartmentTypeService apartmentTypeService,
         ICurrencyService currencyService,
         IRecurringPaymentService recurringPaymentService,
         IResidentService residentService,
         IMapper mapper) : base(mapper)
      {
         _apartmentTypeService = apartmentTypeService;
         _currencyService = currencyService;
         _recurringPaymentService = recurringPaymentService;
         _residentService = residentService;
         _mapper = mapper;
      }

      [HttpPost("")]
      public async Task<ActionResult<Response<ApartmentTypeDto>>> CreateAsync(ApartmentTypeCreationOptionsDto dto)
      {
         var userId = GetUserId();

         var apartmentType = await _apartmentTypeService.CreateAsync(_mapper.Map<ApartmentTypeCreationOptions>(dto), userId);

         return Ok(_mapper.Map<ApartmentTypeDto>(apartmentType));
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<ApartmentTypeDto>>> GetByIdAsync(Guid id)
      {
         var apartmentType = await _apartmentTypeService.GetByIdAsync(id);

         if (apartmentType == null)
         {
            return NotFound(ResponseMessages.ApartmentTypeNotExist);
         }

         return Ok(_mapper.Map<ApartmentTypeDto>(apartmentType));
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpGet("")]
      public async Task<ActionResult<PaginatedResponse<ApartmentTypeDto>>> GetAllAsync(string query = null, int page = 1, int pageSize = 30)
      {
         var apartmentTypes = await _apartmentTypeService.GetAllAsync(page, pageSize, query);

         return Paginated<ApartmentType, ApartmentTypeDto>(apartmentTypes);
      }

      [HttpPatch("{id:guid}")]
      public async Task<ActionResult<Response<ApartmentTypeDto>>> UpdateAsync(Guid id, ApartmentTypeUpdateOptionsDto dto)
      {
         var apartmentType = await _apartmentTypeService.UpdateAsync(id, _mapper.Map<ApartmentTypeUpdateOptions>(dto));

         return Ok(_mapper.Map<ApartmentTypeDto>(apartmentType));
      }

      [HttpPut("{id:guid}/services")]
      public async Task<ActionResult<Response<ApartmentTypeDto>>> UpdateServicesAsync(Guid id, List<Guid> servicesIds)
      {
         var apartmentType = await _apartmentTypeService.UpdateServicesAsync(id, servicesIds);

         return Ok(_mapper.Map<ApartmentTypeDto>(apartmentType));
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpPost("{id:guid}/onboard")]
      public async Task<ActionResult<Response<IEnumerable<OnboardedUserDto>>>> OnboardFromCsvAsync(Guid id, IFormFile resource)
      {
         var userId = GetUserId();

         var apartmentType = await _apartmentTypeService.GetByIdAsync(id, true);

         if (!apartmentType.EstateId.HasValue)
         {
            return BadRequest();
         }

         var onboardedUsers = await _residentService.OnboardFromCsvAsync(apartmentType, resource, userId);

         return Ok(onboardedUsers.Select(o => _mapper.Map<OnboardedUserDto>(o)));
      }

      [HttpPut("{id:guid}/service-charge")]
      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      public async Task<ActionResult<Response<ApartmentTypeDto>>> UpdateServiceChargeAsync(Guid id, ServiceChargeUpdateOptionsDto dto)
      {
         var userId = GetUserId();

         var apartmentType = await _apartmentTypeService.UpdateServiceChargeAsync(id, userId, _mapper.Map<ServiceChargeUpdateOptions>(dto));

         var currency = await _currencyService.GetByRegionCodeOrDefaultAsync();

         var baseToCurrencyExchangeRate = _currencyService.GetBaseToCurrencyExchangeRate(currency);

         var localAmount = apartmentType.ServiceChargeAmount * baseToCurrencyExchangeRate;

         var estateId = apartmentType.EstateId;

         var residents = await _residentService.GetAllByApartmentTypeAsync(apartmentType.Id);

         var recurringPayments = await _recurringPaymentService.GetAllByUsersAsync(
            residents.Select(o => o.UserId), o => o.EstateId == estateId && o.Description == TransactionDescriptions.ServiceCharge
         );

         if (apartmentType.ServiceChargeRecurrence == Recurrence.None)
         {
            await _recurringPaymentService.DeleteManyAsync(recurringPayments);
         }
         else
         {
            var recurringPaymentsToAdd = new List<RecurringPayment> { };

            var recurringPaymentsToUpdate = new List<RecurringPayment> { };

            foreach (var resident in residents)
            {
               var recurringPayment = recurringPayments.FirstOrDefault(o => o.UserId == resident.UserId);

               if (recurringPayment == null)
               {
                  recurringPaymentsToAdd.Add(new RecurringPayment
                  {
                     LocalAmount = apartmentType.ServiceChargeAmount * baseToCurrencyExchangeRate,
                     Description = TransactionDescriptions.ServiceCharge,
                     StartDate = dto.ServiceChargeDueDate ?? DateTime.UtcNow,
                     Mode = PaymentMode.Wallet,
                     CurrencyId = currency.Id,
                     UserId = resident.UserId,
                     RecipientId = userId,
                     EstateId = estateId,
                     Recurrence = apartmentType.ServiceChargeRecurrence,
                  });
               }
               else
               {
                  recurringPayment.Recurrence = apartmentType.ServiceChargeRecurrence;

                  recurringPayment.LocalAmount = localAmount;

                  recurringPayment.StartDate = dto.ServiceChargeDueDate ?? recurringPayment.StartDate;

                  recurringPaymentsToUpdate.Add(recurringPayment);
               }
            }

            await _recurringPaymentService.CreateManyAsync(recurringPaymentsToAdd);

            await _recurringPaymentService.UpdateManyAsync(recurringPaymentsToUpdate);
         }

         return Ok(_mapper.Map<ApartmentTypeDto>(apartmentType));
      }

      [HttpDelete("{id:guid}")]
      public async Task<ActionResult<Response>> DeleteAsync(Guid id)
      {
         await _apartmentTypeService.DeleteAsync(id);

         return Ok();
      }
   }
}