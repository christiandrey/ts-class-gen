using System;
using System.Collections.Generic;
using System.Linq;
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
   [Route("v{version:apiVersion}/encounters")]
   public class EncounterController : BaseController
   {
      private readonly IEncounterService _encounterService;
      private readonly IFluidReadingService _fluidReadingService;
      private readonly ILabService _labService;
      private readonly IVitalReadingService _vitalReadingService;
      private readonly IMapper _mapper;

      public EncounterController(
         IEncounterService encounterService,
         IFluidReadingService fluidReadingService,
         ILabService labService,
         IVitalReadingService vitalReadingService,
         IMapper mapper) : base(mapper)
      {
         _encounterService = encounterService;
         _fluidReadingService = fluidReadingService;
         _labService = labService;
         _vitalReadingService = vitalReadingService;
         _mapper = mapper;
      }

      [Authorize(Roles = nameof(UserRoleType.Medic))]
      [HttpPost("{id:guid}/lab/tests")]
      public async Task<ActionResult<Response<LabTestDto>>> CreateLabTestAsync(Guid id, LabTestCreationOptionsDto options)
      {
         var userId = GetUserId();

         var labTest = await _labService.CreateLabTestAsync(id, userId, options);

         return Ok(_mapper.Map<LabTestDto>(labTest));
      }

      [Authorize(Roles = nameof(UserRoleType.NonMedic))]
      [HttpPost("{id:guid}/lab/scans")]
      public async Task<ActionResult<Response<LabScanDto>>> CreateLabScanAsync(Guid id, LabScanCreationOptionsDto options)
      {
         var userId = GetUserId();

         var labScan = await _labService.CreateLabScanAsync(id, userId, options);

         return Ok(_mapper.Map<LabScanDto>(labScan));
      }

      [Authorize(Roles =
         nameof(UserRoleType.Medic) + "," +
         nameof(UserRoleType.NonMedic))]
      [HttpPost("{id:guid}/vital-readings")]
      public async Task<ActionResult<Response<VitalReadingDto>>> CreateVitalReadingAsync(Guid id, VitalReadingCreationOptionsDto options)
      {
         var userId = GetUserId();

         var vitalReading = await _vitalReadingService.CreateVitalReadingAsync(userId, id, options);

         return Ok(_mapper.Map<VitalReadingDto>(vitalReading));
      }

      [Authorize(Roles = nameof(UserRoleType.NonMedic))]
      [HttpPost("{id:guid}/fluid-readings")]
      public async Task<ActionResult<Response<FluidReadingDto>>> CreateFluidReadingAsync(Guid id, FluidReadingCreationOptionsDto options)
      {
         var userId = GetUserId();

         var fluidReading = await _fluidReadingService.CreateFluidReadingAsync(id, options);

         return Ok(_mapper.Map<FluidReadingDto>(fluidReading));
      }

      [Authorize(Roles =
         nameof(UserRoleType.Medic) + "," +
         nameof(UserRoleType.Patient) + "," +
         nameof(UserRoleType.Guest))]
      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<EncounterDto>>> GetByIdAsync(Guid id)
      {
         var userId = GetUserId();

         var encounter = await _encounterService.GetByIdAsync(userId, true);

         return Ok(_mapper.Map<EncounterDto>(encounter));
      }

      [Authorize(Roles =
         nameof(UserRoleType.Medic) + "," +
         nameof(UserRoleType.NonMedic) + "," +
         nameof(UserRoleType.Patient) + "," +
         nameof(UserRoleType.Guest))]
      [HttpGet("{id:guid}/fluid-readings")]
      public async Task<ActionResult<Response<IEnumerable<FluidReadingDto>>>> GetFluidReadingsAsync(Guid id)
      {
         var userId = GetUserId();

         var fluidReadings = await _fluidReadingService.GetByEncounterAsync(userId, id);

         return Ok(fluidReadings.Select(o => _mapper.Map<FluidReadingDto>(o)));
      }

      [Authorize(Roles =
         nameof(UserRoleType.Medic) + "," +
         nameof(UserRoleType.NonMedic) + "," +
         nameof(UserRoleType.Patient) + "," +
         nameof(UserRoleType.Guest))]
      [HttpGet("{id:guid}/lab/scans")]
      public async Task<ActionResult<Response<IEnumerable<LabScanDto>>>> GetLabScansAsync(Guid id)
      {
         var userId = GetUserId();

         var labScans = await _labService.GetLabScansByEncounterAsync(userId, id);

         return Ok(labScans.Select(o => _mapper.Map<LabScanDto>(o)));
      }

      [Authorize(Roles = nameof(UserRoleType.Medic))]
      [HttpPatch("{id:guid}")]
      public async Task<ActionResult<Response<EncounterDto>>> UpdateAsync(Guid id, EncounterUpdateOptionsDto options)
      {
         var userId = GetUserId();

         var encounter = await _encounterService.UpdateEncounterAsync(id, userId, options);

         return Ok(_mapper.Map<EncounterDto>(encounter));
      }
   }
}