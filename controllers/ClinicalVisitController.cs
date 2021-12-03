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
   [Route("v{version:apiVersion}/clinical-visits")]
   public class ClinicalVisitController : BaseController
   {
      private readonly IClinicalVisitService _clinicalVisitService;
      private readonly IEncounterService _encounterService;
      private readonly IFluidReadingService _fluidReadingService;
      private readonly IDischargeSummaryService _dischargeSummaryService;
      private readonly IInvoiceService _invoiceService;
      private readonly IMapper _mapper;

      public ClinicalVisitController(
         IClinicalVisitService clinicalVisitService,
         IEncounterService encounterService,
         IFluidReadingService fluidReadingService,
         IDischargeSummaryService dischargeSummaryService,
         IInvoiceService invoiceService,
         IMapper mapper) : base(mapper)
      {
         _clinicalVisitService = clinicalVisitService;
         _dischargeSummaryService = dischargeSummaryService;
         _encounterService = encounterService;
         _fluidReadingService = fluidReadingService;
         _invoiceService = invoiceService;
         _mapper = mapper;
      }

      [Authorize(Roles = nameof(UserRoleType.Medic))]
      [HttpPost("{id:guid}/encounters")]
      public async Task<ActionResult<Response<EncounterDto>>> CreateEncounterAsync(Guid id, EncounterCreationOptionsDto options)
      {
         var userId = GetUserId();

         var encounter = await _encounterService.CreateEncounterAsync(userId, id, options);

         return Ok(_mapper.Map<EncounterDto>(encounter));
      }

      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<ClinicalVisitDto>>> GetByIdAsync(Guid id)
      {
         var clinicalVisit = await _clinicalVisitService.GetByIdAsync(id);

         return Ok(_mapper.Map<ClinicalVisitDto>(clinicalVisit));
      }

      [Authorize(Roles =
         nameof(UserRoleType.Medic) + "," +
         nameof(UserRoleType.Patient) + "," +
         nameof(UserRoleType.Guest))]
      [HttpGet("{id:guid}/encounters")]
      public async Task<ActionResult<Response<IEnumerable<EncounterLiteDto>>>> GetEncountersAsync(Guid id)
      {
         var userId = GetUserId();

         var encounters = await _encounterService.GetByClinicalVisitAsync(id, userId);

         return Ok(encounters.Select(o => _mapper.Map<EncounterLiteDto>(o)));
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

         var fliudReadings = await _fluidReadingService.GetByClinicalVisitAsync(userId, id);

         return Ok(fliudReadings.Select(o => _mapper.Map<FluidReadingDto>(o)));
      }

      [Authorize(Roles = nameof(UserRoleType.Medic))]
      [HttpPost("{id:guid}/discharge-summary")]
      public async Task<ActionResult<Response<DischargeSummaryDto>>> CreateDischargeSummaryAsync(Guid id, DischargeSummaryCreationOptionsDto options)
      {
         var userId = GetUserId();

         var dischargeSummary = await _dischargeSummaryService.CreateDischargeSummaryAsync(id, userId, options);

         return Ok(_mapper.Map<DischargeSummaryDto>(dischargeSummary));
      }

      [Authorize(Roles = nameof(UserRoleType.Medic))]
      [HttpPost("{id:guid}/invoice")]
      public async Task<ActionResult<Response<InvoiceDto>>> CreateInvoiceAsync(Guid id, InvoiceCreationOptionsDto options)
      {
         var userId = GetUserId();

         var invoice = await _invoiceService.CreateInvoiceAsync(id, userId, options);

         return Ok(_mapper.Map<InvoiceDto>(invoice));
      }
   }
}