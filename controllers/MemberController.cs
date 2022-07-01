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
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Entities.Interfaces;
using Caretaker.Services.Permissions.Interfaces;
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
      private readonly IEstateManagerService _estateManagerService;
      private readonly IMemberService _memberService;
      private readonly IPaymentRequestService _paymentRequestService;
      private readonly IPermissionsService _permissionsService;
      private readonly IMapper _mapper;

      public MemberController(
         IEstateManagerService estateManagerService,
         IMemberService memberService,
         IPaymentRequestService paymentRequestService,
         IPermissionsService permissionsService,
         IMapper mapper
      ) : base(mapper)
      {
         _estateManagerService = estateManagerService;
         _memberService = memberService;
         _paymentRequestService = paymentRequestService;
         _permissionsService = permissionsService;
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

      [HttpGet("{id:guid}/estate-managers")]
      public async Task<ActionResult<Response<IEnumerable<EstateManagerDto>>>> GetEstateManagersAsync(Guid id)
      {
         var estateManagers = await _estateManagerService.GetByMemberAsync(id);

         return Ok(estateManagers.Select(_mapper.Map<EstateManagerDto>));
      }

      [HttpGet("{id:guid}/payment-requests")]
      [HttpGet("{id:guid}/payments/requests")]
      public async Task<ActionResult<PaginatedResponse<PaymentRequestLiteDto>>> GetPaymentRequestsAsync(Guid id, string query = null, int page = 1, int pageSize = 30)
      {
         var paymentRequests = await _paymentRequestService.GetByMemberAsync(id, page, pageSize, query);

         return Paginated<PaymentRequest, PaymentRequestLiteDto>(paymentRequests);
      }

      [HttpPut("{id:guid}/role")]
      public async Task<ActionResult<Response<MemberDto>>> UpdateRoleAsync(Guid id, MemberRoleTypeUpdateOptionsDto dto)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationRootScopeAsync(userId, OrganizationRootScopes.MemberManage);

         var member = await _memberService.UpdateRoleAsync(id, userId, dto.Role);

         return Ok(_mapper.Map<MemberDto>(member));
      }

      [HttpDelete("{id:guid}")]
      public async Task<ActionResult<Response>> DeleteAsync(Guid id)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationRootScopeAsync(userId, OrganizationRootScopes.MemberManage);

         await _memberService.DeleteAsync(id);

         return Ok();
      }
   }
}