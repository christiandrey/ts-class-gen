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
   [Route("v{version:apiVersion}/lab")]
   public class LabController : BaseController
   {
      private readonly ILabService _labService;
      private readonly IMapper _mapper;

      public LabController(
         ILabService labService,
         IMapper mapper) : base(mapper)
      {
         _labService = labService;
         _mapper = mapper;
      }

      [Authorize(Roles = nameof(UserRoleType.NonMedic))]
      [HttpGet("tests/{code}")]
      public async Task<ActionResult<Response<LabTestDto>>> GetLabTestByCode(string code)
      {
         var labTest = await _labService.GetLabTestByCodeAsync(code, true);

         return Ok(_mapper.Map<LabTestDto>(labTest));
      }

      [Authorize(Roles = nameof(UserRoleType.Medic))]
      [HttpPost("tests/{id:guid}/results")]
      public async Task<ActionResult<Response<LabTestResultDto>>> CreateLabTestResult(Guid id, LabTestResultCreationOptionsDto options)
      {
         var labTestResult = await _labService.CreateLabTestResultAsync(id, options);

         return Ok(_mapper.Map<LabTestResultDto>(labTestResult));
      }

      [Authorize(Roles = nameof(UserRoleType.Patient))]
      [HttpPut("tests/{id:guid}/share")]
      public async Task<ActionResult<Response<LabTestDto>>> ShareLabTestAsync(Guid id)
      {
         var userId = GetUserId();

         var labTest = await _labService.UpdateLabTestAsync(id, userId, true);

         return Ok(_mapper.Map<LabTestDto>(labTest));
      }

      [Authorize(Roles = nameof(UserRoleType.Patient))]
      [HttpPut("tests/{id:guid}/stop-share")]
      public async Task<ActionResult<Response<LabTestDto>>> StopShareLabTestAsync(Guid id)
      {
         var userId = GetUserId();

         var labTest = await _labService.UpdateLabTestAsync(id, userId, false);

         return Ok(_mapper.Map<LabTestDto>(labTest));
      }

      [Authorize(Roles = nameof(UserRoleType.Medic))]
      [HttpPatch("scans/{id:guid}")]
      public async Task<ActionResult<Response<LabScanDto>>> UpdateLabScanAsync(Guid id, LabScanUpdateOptionsDto options)
      {
         var userId = GetUserId();

         var labScan = await _labService.UpdateLabScanAsync(id, userId, options);

         return Ok(_mapper.Map<LabScanDto>(labScan));
      }

      [Authorize(Roles = nameof(UserRoleType.NonMedic))]
      [HttpPatch("tests/{id:guid}/results/{resultId:guid}")]
      public async Task<ActionResult<Response<LabTestResultDto>>> UpdateLabTestResultAsync(Guid id, Guid resultId, LabTestResultUpdateOptionsDto options)
      {
         var userId = GetUserId();

         var labTestResult = await _labService.UpdateLabTestResultAsync(resultId, userId, options);

         return Ok(_mapper.Map<LabTestResultDto>(labTestResult));
      }
   }
}