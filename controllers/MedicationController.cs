using System;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
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
   [Route("v{version:apiVersion}/medications")]
   public class MedicationController : BaseController
   {
      private readonly IMedicationService _medicationService;
      private readonly IMapper _mapper;

      public MedicationController(
         IMedicationService medicationService,
         IMapper mapper) : base(mapper)
      {
         _medicationService = medicationService;
         _mapper = mapper;
      }

      [Authorize(Roles = nameof(UserRoleType.Medic))]
      [HttpDelete("{id:guid}")]
      public async Task<ActionResult<Response>> DeleteAsync(Guid id)
      {
         var userId = GetUserId();

         await _medicationService.DeleteMedicationAsync(id, userId);

         return Ok();
      }
   }
}