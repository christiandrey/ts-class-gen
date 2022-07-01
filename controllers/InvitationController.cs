using System;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using Caretaker.Common.Constants;
using Caretaker.Models.Dtos;
using Caretaker.Models.Enums;
using Caretaker.Models.Services.Management;
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Entities.Interfaces;
using Caretaker.Services.Permissions.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Caretaker.Controllers
{
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/invitations")]
   public class InvitationController : BaseController
   {
      private readonly IEstateService _estateService;
      private readonly IInvitationService _invitationService;
      private readonly IPermissionsService _permissionsService;
      private readonly IResidentService _residentService;
      private readonly IMapper _mapper;

      public InvitationController(
         IEstateService estateService,
         IInvitationService invitationService,
         IPermissionsService permissionsService,
         IResidentService residentService,
         IMapper mapper) : base(mapper)
      {
         _estateService = estateService;
         _invitationService = invitationService;
         _permissionsService = permissionsService;
         _residentService = residentService;
         _mapper = mapper;
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpPost("vendors")]
      public async Task<ActionResult<Response<VendorInvitationDto>>> CreateVendorInvitationAsync(VendorInvitationCreationOptionsDto dto)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationScopeAsync(dto.EstateId, userId, OrganizationScopes.VendorManage);

         var estate = await _estateService.GetByIdAsync(dto.EstateId, true);

         var invitation = await _invitationService.CreateVendorInvitationAsync(_mapper.Map<VendorInvitationCreationOptions>(dto), estate.FacilityManagerId);

         return Ok(_mapper.Map<VendorInvitationDto>(invitation));
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpPost("residents")]
      public async Task<ActionResult<Response<ResidentInvitationDto>>> CreateResidentInvitationAsync(ResidentInvitationCreationOptionsDto dto)
      {
         var userId = GetUserId();

         if (dto.ApartmentId.HasValue)
         {
            await _permissionsService.AssertOrganizationApartmentScopeAsync(dto.ApartmentId.Value, userId, OrganizationScopes.ApartmentManage);
         }

         if (dto.ApartmentTypeId.HasValue)
         {
            await _permissionsService.AssertOrganizationApartmentTypeScopeAsync(dto.ApartmentTypeId.Value, userId, OrganizationScopes.ApartmentManage);
         }

         var invitation = await _invitationService.CreateResidentInvitationAsync(_mapper.Map<ResidentInvitationCreationOptions>(dto), userId);

         return Ok(_mapper.Map<ResidentInvitationDto>(invitation));
      }

      [HttpPost("check")]
      public async Task<ActionResult<Response<InvitationDto>>> CheckEmailAsync(string email)
      {
         var vendorInvitation = await _invitationService.GetVendorInvitationByEmailAsync(email, false);

         var residentInvitations = await _invitationService.GetResidentInvitationsByEmailAsync(email, false);

         var invitation = new InvitationDto
         {
            Residents = residentInvitations.Select(o => _mapper.Map<ResidentInvitationDto>(o)).ToList(),
         };

         if (vendorInvitation != null)
         {
            invitation.Vendor = _mapper.Map<VendorInvitationDto>(vendorInvitation);
         }

         return Ok(_mapper.Map<InvitationDto>(invitation));
      }

      [Authorize]
      [HttpPost("residents/{id:guid}/accept")]
      public async Task<ActionResult<Response<ResidentDto>>> AcceptResidentInvitationAsync(Guid id)
      {
         var userId = GetUserId();

         var resident = await _residentService.CreateFromInvitationAsync(userId, id);

         return Ok(_mapper.Map<ResidentDto>(resident));
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpPost("vendors/{id:guid}/resend")]
      public async Task<ActionResult<Response>> ResendVendorInvitationAsync(Guid id)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationVendorInvitationAsync(id, userId, OrganizationScopes.VendorManage);

         await _invitationService.SendVendorInvitationAsync(id, userId);

         return Ok();
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpPost("residents/{id:guid}/resend")]
      public async Task<ActionResult<Response>> ResendResidentInvitationAsync(Guid id)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationResidentInvitationAsync(id, userId, OrganizationScopes.ApartmentManage);

         await _invitationService.SendResidentInvitationAsync(id, userId);

         return Ok();
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpDelete("vendors/{id:guid}")]
      public async Task<ActionResult<Response>> DeleteVendorInvitationAsync(Guid id)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationVendorInvitationAsync(id, userId, OrganizationScopes.VendorManage);

         await _invitationService.DeleteVendorInvitationAsync(id, userId);

         return Ok();
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpDelete("residents/{id:guid}")]
      public async Task<ActionResult<Response>> DeleteResidentInvitationAsync(Guid id)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationResidentInvitationAsync(id, userId, OrganizationScopes.ApartmentManage);

         await _invitationService.DeleteResidentInvitationAsync(id, userId);

         return Ok();
      }
   }
}