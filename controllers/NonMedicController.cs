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
   [Route("v{version:apiVersion}/non-medics")]
   public class NonMedicController : BaseController
   {
      private readonly INonMedicService _nonMedicService;
      private readonly IMapper _mapper;

      public NonMedicController(
         INonMedicService nonMedicService,
         IMapper mapper) : base(mapper)
      {
         _nonMedicService = nonMedicService;
         _mapper = mapper;
      }

      [Authorize(Roles = nameof(UserRoleType.NonMedic))]
      [HttpGet("current")]
      public async Task<ActionResult<Response<NonMedicDto>>> GetCurrentAsync()
      {
         var userId = GetUserId();

         var nonMedic = await _nonMedicService.GetByUserIdAsync(userId, true);

         return Ok(_mapper.Map<NonMedicDto>(nonMedic));
      }

      [Authorize(Roles = nameof(UserRoleType.NonMedic))]
      [HttpPatch("current")]
      public async Task<ActionResult<Response<NonMedicDto>>> UpdateCurrentAsync(NonMedicUpdateOptionsDto options)
      {
         var userId = GetUserId();

         var nonMedic = await _nonMedicService.UpdateNonMedicAsync(userId, options);

         return Ok(_mapper.Map<NonMedicDto>(nonMedic));
      }

      [Authorize(Roles = nameof(UserRoleType.Manager))]
      [HttpDelete("{id:guid}")]
      public async Task<ActionResult<Response>> DeleteAsync(Guid id)
      {
         await _nonMedicService.DeleteNonMedicAsync(id);

         return Ok();
      }
   }
}