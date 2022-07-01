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
using Caretaker.Models.Utilities;
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Entities.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Caretaker.Controllers
{
   [Authorize]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/facility-managers")]
   public class FacilityManagerController : BaseController
   {
      private readonly IFacilityManagerService _facilityManagerService;
      private readonly IInvitationService _invitationService;
      private readonly IPaymentService _paymentService;
      private readonly IPaymentBeneficiaryService _paymentBeneficiaryService;
      private readonly IProjectService _projectService;
      private readonly IMapper _mapper;

      public FacilityManagerController(
         IFacilityManagerService facilityManagerService,
         IInvitationService invitationService,
         IProjectService projectService,
         IPaymentService paymentService,
         IPaymentBeneficiaryService paymentBeneficiaryService,
         IMapper mapper) : base(mapper)
      {
         _facilityManagerService = facilityManagerService;
         _invitationService = invitationService;
         _paymentService = paymentService;
         _paymentBeneficiaryService = paymentBeneficiaryService;
         _projectService = projectService;
         _mapper = mapper;
      }

      [HttpPost("")]
      public async Task<ActionResult<Response<FacilityManagerDto>>> CreateAsync()
      {
         var userId = GetUserId();

         var facilityManager = await _facilityManagerService.CreateAsync(userId);

         return Ok(_mapper.Map<FacilityManagerDto>(facilityManager));
      }

      [HttpGet("current")]
      public async Task<ActionResult<Response<FacilityManagerDto>>> GetCurrentAsync()
      {
         var userId = GetUserId();

         var facilityManager = await _facilityManagerService.GetByUserIdAsync(userId);

         if (facilityManager == null)
         {
            return NotFound(ResponseMessages.FacilityManagerNotExist);
         }

         return Ok(_mapper.Map<FacilityManagerDto>(facilityManager));
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager) + "," + nameof(UserRoleType.Admin))]
      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<FacilityManagerDto>>> GetByIdAsync(Guid id)
      {
         var facilityManager = await _facilityManagerService.GetByIdAsync(id);

         if (facilityManager == null)
         {
            return NotFound(ResponseMessages.FacilityManagerNotExist);
         }

         return Ok(_mapper.Map<FacilityManagerDto>(facilityManager));
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpGet("")]
      public async Task<ActionResult<PaginatedResponse<FacilityManagerDto>>> GetAllAsync(string query = null, int page = 1, int pageSize = 30)
      {
         var facilityManagers = await _facilityManagerService.GetAllAsync(page, pageSize, query);

         return Paginated<FacilityManager, FacilityManagerDto>(facilityManagers);
      }

      [HttpGet("current/vendor-invitations")]
      public async Task<ActionResult<Response<IEnumerable<VendorInvitationDto>>>> GetVendorInvitationsAsync()
      {
         var userId = GetUserId();

         var facilityManager = await _facilityManagerService.GetByUserIdAsync(userId, true);

         var invitations = await _invitationService.GetAllVendorInvitationsByFacilityManagerAsync(facilityManager.Id);

         return Ok(invitations.Select(o => _mapper.Map<VendorInvitationDto>(o)));
      }

      [HttpGet("current/payments/beneficiaries")]
      public async Task<ActionResult<Response<IEnumerable<PaymentBeneficiaryDto>>>> GetPaymentBeneficiariesAsync()
      {
         var userId = GetUserId();

         var facilityManager = await _facilityManagerService.GetByUserIdAsync(userId, true);

         var beneficiaries = await _paymentBeneficiaryService.GetByFacilityManagerAsync(facilityManager.Id);

         return Ok(beneficiaries.Select(o => _mapper.Map<PaymentBeneficiaryDto>(o)));
      }

      [HttpGet("current/resident-invitations")]
      public async Task<ActionResult<Response<IEnumerable<ResidentInvitationDto>>>> GetResidentInvitationsAsync()
      {
         var userId = GetUserId();

         var facilityManager = await _facilityManagerService.GetByUserIdAsync(userId, true);

         var invitations = await _invitationService.GetAllResidentInvitationsByFacilityManagerAsync(facilityManager.Id);

         return Ok(invitations.Select(o => _mapper.Map<ResidentInvitationDto>(o)));
      }

      [HttpGet("current/projects")]
      public async Task<ActionResult<PaginatedResponse<ProjectLiteDto>>> GetProjectsAsync([FromQuery] ProjectQuery projectQuery, int page = 1, int pageSize = 30)
      {
         var userId = GetUserId();

         var facilityManager = await _facilityManagerService.GetByUserIdAsync(userId, true);

         var projects = await _projectService.GetAllByFacilityManagerAsync(facilityManager.Id, page, pageSize, projectQuery);

         return Paginated<Project, ProjectLiteDto>(projects);
      }

      [HttpGet("current/estates")]
      public async Task<ActionResult<Response<IEnumerable<EstateLiteDto>>>> GetEstatesAsync()
      {
         var userId = GetUserId();

         var facilityManager = await _facilityManagerService.GetByUserIdAsync(userId, true);

         return Ok(facilityManager.Estates.Select(o => _mapper.Map<EstateLiteDto>(o)));
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpGet("{id:guid}/estates")]
      public async Task<ActionResult<Response<IEnumerable<EstateLiteDto>>>> GetFacilityManagerEstatesAsync(Guid id)
      {
         var facilityManager = await _facilityManagerService.GetByIdAsync(id, true);

         return Ok(facilityManager.Estates.Select(o => _mapper.Map<EstateLiteDto>(o)));
      }

      [HttpGet("current/estates/wallet-balance")]
      public async Task<ActionResult<Response<decimal>>> GetWalletBalanceAsync()
      {
         var userId = GetUserId();

         var facilityManager = await _facilityManagerService.GetByUserIdAsync(userId, true);

         var walletBalance = await _paymentService.GetEstatesWalletBalanceByFacilityManagerAsync(facilityManager.Id, userId);

         return Ok(walletBalance);
      }
   }
}