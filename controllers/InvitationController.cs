using System;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using Caretaker.Models.Dtos;
using Caretaker.Models.Services.Management;
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Entities.Interfaces;
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
      private readonly IResidentService _residentService;
      private readonly IMapper _mapper;

      public InvitationController(
         IEstateService estateService,
         IInvitationService invitationService,
         IResidentService residentService,
         IMapper mapper) : base(mapper)
      {
         _estateService = estateService;
         _invitationService = invitationService;
         _residentService = residentService;
         _mapper = mapper;
      }

      [Authorize]
      [HttpPost("vendors")]
      public async Task<ActionResult<Response<VendorInvitationDto>>> CreateVendorInvitationAsync(VendorInvitationCreationOptionsDto dto)
      {
         var userId = GetUserId();

         var estate = await _estateService.GetByIdAsync(dto.EstateId, true);

         if (estate.FacilityManager.UserId != userId)
         {
            return Forbid();
         }

         var invitation = await _invitationService.CreateVendorInvitationAsync(_mapper.Map<VendorInvitationCreationOptions>(dto), estate.FacilityManagerId);

         return Ok(_mapper.Map<VendorInvitationDto>(invitation));
      }

      [Authorize]
      [HttpPost("residents")]
      public async Task<ActionResult<Response<ResidentInvitationDto>>> CreateResidentInvitationAsync(ResidentInvitationCreationOptionsDto dto)
      {
         var userId = GetUserId();

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

      [Authorize]
      [HttpPost("vendors/{id:guid}/resend")]
      public async Task<ActionResult<Response>> ResendVendorInvitationAsync(Guid id)
      {
         var userId = GetUserId();

         await _invitationService.SendVendorInvitationAsync(id, userId);

         return Ok();
      }

      [Authorize]
      [HttpPost("residents/{id:guid}/resend")]
      public async Task<ActionResult<Response>> ResendResidentInvitationAsync(Guid id)
      {
         var userId = GetUserId();

         await _invitationService.SendResidentInvitationAsync(id, userId);

         return Ok();
      }

      [Authorize]
      [HttpDelete("vendors/{id:guid}")]
      public async Task<ActionResult<Response>> DeleteVendorInvitationAsync(Guid id)
      {
         var userId = GetUserId();

         await _invitationService.DeleteVendorInvitationAsync(id, userId);

         return Ok();
      }

      [Authorize]
      [HttpDelete("residents/{id:guid}")]
      public async Task<ActionResult<Response>> DeleteResidentInvitationAsync(Guid id)
      {
         var userId = GetUserId();

         await _invitationService.DeleteResidentInvitationAsync(id, userId);

         return Ok();
      }
   }
}