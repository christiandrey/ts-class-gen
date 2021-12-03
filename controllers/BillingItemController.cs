using System;
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
   [Route("v{version:apiVersion}/billing-items")]
   public class BillingItemController : BaseController
   {
      private readonly IBillingItemService _billingItemService;
      private readonly IMapper _mapper;

      public BillingItemController(
         IBillingItemService billingItemService,
         IMapper mapper) : base(mapper)
      {
         _billingItemService = billingItemService;
         _mapper = mapper;
      }

      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<BillingItemDto>>> GetByIdAsync(Guid id)
      {
         var billingItem = await _billingItemService.GetByIdAsync(id, true);

         return Ok(_mapper.Map<BillingItemDto>(billingItem));
      }

      [Authorize(Roles = nameof(UserRoleType.Manager))]
      [HttpPatch("{id:guid}")]
      public async Task<ActionResult<Response<BillingItemDto>>> UpdateAsync(Guid id, BillingItemUpdateOptionsDto options)
      {
         var userId = GetUserId();

         var billingItem = await _billingItemService.UpdateBillingItemAsync(userId, id, options);

         return Ok(_mapper.Map<BillingItemDto>(billingItem));
      }

      [Authorize(Roles = nameof(UserRoleType.Manager))]
      [HttpDelete("{id:guid}")]
      public async Task<ActionResult<Response>> DeleteAsync(Guid id)
      {
         var userId = GetUserId();

         await _billingItemService.DeleteBillingItemAsync(userId, id);

         return Ok();
      }
   }
}