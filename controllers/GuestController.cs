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
   [Route("v{version:apiVersion}/guests")]
   public class GuestController : BaseController
   {
      private readonly IGuestService _guestService;
      private readonly IMapper _mapper;

      public GuestController(
         IGuestService guestService,
         IMapper mapper) : base(mapper)
      {
         _guestService = guestService;
         _mapper = mapper;
      }

      [Authorize(Roles = nameof(UserRoleType.Guest))]
      [HttpGet("current")]
      public async Task<ActionResult<Response<GuestDto>>> GetCurrentAsync()
      {
         var userId = GetUserId();

         var guest = await _guestService.GetByUserIdAsync(userId, true);

         return Ok(_mapper.Map<GuestDto>(guest));
      }

      [Authorize(Roles = nameof(UserRoleType.Patient))]
      [HttpPatch("{id:guid}")]
      public async Task<ActionResult<Response<GuestDto>>> UpdateAsync(Guid id, GuestUpdateOptionsDto options)
      {
         var userId = GetUserId();

         var guest = await _guestService.UpdateGuestAsync(userId, id, options);

         return Ok(_mapper.Map<GuestDto>(guest));
      }

      [Authorize(Roles = nameof(UserRoleType.Patient))]
      [HttpDelete("{id:guid}")]
      public async Task<ActionResult<Response>> DeleteAsync(Guid id)
      {
         var userId = GetUserId();

         await _guestService.DeleteGuestAsync(userId, id);

         return Ok();
      }
   }
}