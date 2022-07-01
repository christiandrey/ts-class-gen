using System;
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
using Microsoft.AspNetCore.Mvc;

namespace Caretaker.Controllers
{
   [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/members")]
   public class MemberController : BaseController
   {
      private readonly IMemberService _memberService;
      private readonly IPaymentRequestService _paymentRequestService;
      private readonly IMapper _mapper;

      public MemberController(
         IMemberService memberService,
         IPaymentRequestService paymentRequestService,
         IMapper mapper
      ) : base(mapper)
      {
         _memberService = memberService;
         _paymentRequestService = paymentRequestService;
         _mapper = mapper;
      }

      [HttpGet("current")]
      public async Task<ActionResult<Response<MemberDto>>> GetCurrentAsync()
      {
         var userId = GetUserId();

         var member = await _memberService.GetByUserIdAsync(userId);

         if (member == null)
         {
            return NotFound(ResponseMessages.MemberNotExist);
         }

         return Ok(_mapper.Map<MemberDto>(member));
      }

      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<MemberDto>>> GetByIdAsync(Guid id)
      {
         var member = await _memberService.GetByIdAsync(id);

         if (member == null)
         {
            return NotFound(ResponseMessages.MemberNotExist);
         }

         return Ok(_mapper.Map<MemberDto>(member));
      }

      [HttpGet("{id:guid}/payment-requests")]
      public async Task<ActionResult<PaginatedResponse<PaymentRequestLiteDto>>> GetPaymentRequestsAsync(Guid id, string query = null, int page = 1, int pageSize = 30)
      {
         var paymentRequests = await _paymentRequestService.GetByMemberAsync(id, page, pageSize, query);

         return Paginated<PaymentRequest, PaymentRequestLiteDto>(paymentRequests);
      }

      [HttpPut("{id:guid}/role")]
      public async Task<ActionResult<Response<MemberDto>>> UpdateRoleAsync(Guid id, MemberRoleTypeUpdateOptionsDto dto)
      {
         var userId = GetUserId();

         var member = await _memberService.UpdateRoleAsync(id, userId, dto.Role);

         return Ok(_mapper.Map<MemberDto>(member));
      }

      [HttpPut("{id:guid}/payment-limit/{paymentLimit:decimal}")]
      public async Task<ActionResult<Response<MemberDto>>> UpdatePaymentLimitAsync(Guid id, decimal paymentLimit)
      {
         var userId = GetUserId();

         var member = await _memberService.UpdatePaymentLimitAsync(id, userId, paymentLimit);

         return Ok(_mapper.Map<MemberDto>(member));
      }

      [HttpPatch("{id:guid}/permissions")]
      public async Task<ActionResult<Response<MemberDto>>> UpdatePermissionsAsync(Guid id, MemberPermissionUpdateOptionsDto dto)
      {
         var userId = GetUserId();

         var member = await _memberService.UpdatePermissionsAsync(_mapper.Map<MemberPermissionUpdateOptions>(dto), id, userId);

         return Ok(_mapper.Map<MemberDto>(member));
      }

      [HttpDelete("{id:guid}")]
      public async Task<ActionResult<Response>> DeleteAsync(Guid id)
      {
         await _memberService.DeleteAsync(id);

         return Ok();
      }
   }
}