using System;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using HealthGyro.Models.Dtos;
using HealthGyro.Models.Entities;
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
   [Route("v{version:apiVersion}/plan-subscriptions")]
   public class PlanSubscriptionController : BaseController
   {
      private readonly IPlanSubscriptionService _planSubscriptionService;
      private readonly IMapper _mapper;

      public PlanSubscriptionController(
         IPlanSubscriptionService planSubscriptionService,
         IMapper mapper) : base(mapper)
      {
         _planSubscriptionService = planSubscriptionService;
         _mapper = mapper;
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpGet("")]
      public async Task<ActionResult<PaginatedResponse<PlanSubscriptionDto>>> GetPlanSubscriptionsAsync(int page = 1, int pageSize = 30)
      {
         var planSubscriptions = await _planSubscriptionService.GetPlanSubscriptionsAsync(page, pageSize);

         return Paginated<PlanSubscription, PlanSubscriptionDto>(planSubscriptions);
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpGet("active")]
      public async Task<ActionResult<PaginatedResponse<PlanSubscriptionDto>>> GetActivePlanSubscriptionsAsync(int page = 1, int pageSize = 30)
      {
         var planSubscriptions = await _planSubscriptionService.GetActivePlanSubscriptionsAsync(page, pageSize);

         return Paginated<PlanSubscription, PlanSubscriptionDto>(planSubscriptions);
      }

      [Authorize(Roles = nameof(UserRoleType.Manager))]
      [HttpPut("{id:guid}/cancel")]
      public async Task<ActionResult<Response<PlanSubscriptionDto>>> CancelAsync(Guid id)
      {
         var userId = GetUserId();

         var planSubscription = await _planSubscriptionService.CancelByIdAsync(userId, id);

         return Ok(_mapper.Map<PlanSubscriptionDto>(planSubscription));
      }
   }
}