using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using HealthGyro.Models.Dtos;
using HealthGyro.Models.Enums;
using HealthGyro.Models.Utilities.Response;
using HealthGyro.Services.Entities.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthGyro.Controllers
{
   [Authorize]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/payment-plans")]
   public class PaymentPlanController : BaseController
   {
      private readonly IPaymentPlanService _paymentPlanService;
      private readonly IMapper _mapper;

      public PaymentPlanController(
         IPaymentPlanService paymentPlanService,
         IMapper mapper) : base(mapper)
      {
         _paymentPlanService = paymentPlanService;
         _mapper = mapper;
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpPost("")]
      public async Task<ActionResult<Response<PaymentPlanDto>>> CreateAsync(PaymentPlanCreationOptionsDto options)
      {
         var paymentPlan = await _paymentPlanService.CreatePaymentPlanAsync(options);

         return Ok(_mapper.Map<PaymentPlanDto>(paymentPlan));
      }

      [HttpGet("")]
      public async Task<ActionResult<Response<IEnumerable<PaymentPlanDto>>>> GetPaymentPlansAsync()
      {
         var paymentPlans = await _paymentPlanService.GetPaymentPlansAsync();

         return Ok(paymentPlans.Select(o => _mapper.Map<PaymentPlanDto>(o)));
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<IEnumerable<PlanSubscriptionDto>>>> GetPaymentPlanSubscriptionsAsync(Guid id)
      {
         var paymentPlan = await _paymentPlanService.GetByIdAsync(id, true);

         return Ok(paymentPlan.Subscriptions.Select(o => _mapper.Map<PlanSubscriptionDto>(o)));
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpPatch("{id:guid}")]
      public async Task<ActionResult<Response<PaymentPlanDto>>> UpdateAsync(Guid id, PaymentPlanUpdateOptionsDto options)
      {
         var paymentPlan = await _paymentPlanService.UpdatePaymentPlanAsync(id, options);

         return Ok(_mapper.Map<PaymentPlanDto>(paymentPlan));
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpDelete("{id:guid}")]
      public async Task<ActionResult<Response>> DeleteAsync(Guid id)
      {
         await _paymentPlanService.DeletePaymentPlanAsync(id);

         return Ok();
      }
   }
}