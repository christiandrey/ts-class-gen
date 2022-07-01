using System;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using Caretaker.Common.Constants;
using Caretaker.Models.Dtos;
using Caretaker.Models.Entities;
using Caretaker.Models.Enums;
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Entities.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Caretaker.Controllers
{
   [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/payment-requests")]
   public class PaymentRequestController : BaseController
   {
      private readonly IPaymentRequestService _paymentRequestService;
      private readonly IRecurringPaymentService _recurringPaymentService;
      private readonly IPaymentService _paymentService;
      private readonly IMapper _mapper;

      public PaymentRequestController(
         IPaymentRequestService paymentRequestService,
         IPaymentService paymentService,
         IRecurringPaymentService recurringPaymentService,
         IMapper mapper
      ) : base(mapper)
      {
         _paymentRequestService = paymentRequestService;
         _paymentService = paymentService;
         _recurringPaymentService = recurringPaymentService;
         _mapper = mapper;
      }

      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<PaymentRequestDto>>> GetByIdAsync(Guid id)
      {
         var paymentRequest = await _paymentRequestService.GetByIdAsync(id);

         if (paymentRequest == null)
         {
            return NotFound(ResponseMessages.PaymentRequestNotExist);
         }

         return Ok(_mapper.Map<PaymentRequestDto>(paymentRequest));
      }

      [HttpPut("{id:guid}/approve")]
      public async Task<ActionResult<Response<PaymentRequestDto>>> ApprovePaymentRequestAsync(Guid id)
      {
         var userId = GetUserId();

         var paymentRequest = await _paymentRequestService.GetByIdAsync(id, true);

         await _paymentRequestService.UpdateStatusAsync(id, userId, PaymentRequestStatus.Approved);

         await _paymentService.CreateFromPaymentRequestAsync(paymentRequest);

         if (paymentRequest.Recurrence != Recurrence.None)
         {
            var recurringPayment = new RecurringPayment
            {
               LocalAmount = paymentRequest.LocalAmount,
               ServiceCategoryId = paymentRequest.ServiceCategoryId,
               BeneficiaryId = paymentRequest.BeneficiaryId,
               Description = paymentRequest.Description,
               Notes = paymentRequest.Notes,
               Mode = paymentRequest.Mode,
               CurrencyId = paymentRequest.Currency.Id,
               UserId = userId,
               EstateId = id,
               RecipientId = paymentRequest.RecipientId,
               Recurrence = paymentRequest.Recurrence,
               StartDate = paymentRequest.RecurrenceStartAt ?? DateTime.Now,
            };

            await _recurringPaymentService.CreateAsync(recurringPayment);
         }

         return Ok(_mapper.Map<PaymentRequestDto>(paymentRequest));
      }

      [HttpPut("{id:guid}/reject")]
      public async Task<ActionResult<Response<PaymentRequestDto>>> RejectPaymentRequestAsync(Guid id)
      {
         var userId = GetUserId();

         var paymentRequest = await _paymentRequestService.UpdateStatusAsync(id, userId, PaymentRequestStatus.Rejected);

         return Ok(_mapper.Map<PaymentRequestDto>(paymentRequest));
      }
   }
}