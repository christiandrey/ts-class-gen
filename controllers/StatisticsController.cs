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
   [Authorize(Roles = nameof(UserRoleType.Manager))]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/statistics")]
   public class StatisticsController : BaseController
   {
      private readonly IStatisticsService _statisticsService;
      private readonly IMapper _mapper;

      public StatisticsController(
         IStatisticsService statisticsService,
         IMapper mapper) : base(mapper)
      {
         _statisticsService = statisticsService;
         _mapper = mapper;
      }

      [HttpGet("clinical-visits")]
      public async Task<ActionResult<Response<HospitalClinicalVisitsStatsDto>>> GetHospitalClinicalVisitsStatsAsync([FromQuery] HospitalStatsOptionsDto options)
      {
         var userId = GetUserId();

         var stats = await _statisticsService.GetHospitalClinicalVisitsStatsAsync(userId, options);

         return Ok(stats);
      }

      [HttpGet("patients")]
      public async Task<ActionResult<Response<HospitalPatientsStatsDto>>> GetHospitalPatientsStatsAsync([FromQuery] HospitalStatsOptionsDto options)
      {
         var userId = GetUserId();

         var stats = await _statisticsService.GetHospitalPatientsStatsAsync(userId, options);

         return Ok(stats);
      }

      [HttpGet("invoices")]
      public async Task<ActionResult<Response<HospitalInvoiceStatsDto>>> GetHospitalInvoiceStatsAsync([FromQuery] HospitalStatsOptionsDto options)
      {
         var userId = GetUserId();

         var stats = await _statisticsService.GetHospitalInvoiceStatsAsync(userId, options);

         return Ok(stats);
      }

      [HttpGet("activity")]
      public async Task<ActionResult<Response<HospitalPlottableStatsDto>>> GetHospitalActivityStatsAsync([FromQuery] HospitalStatsOptionsDto options)
      {
         var userId = GetUserId();

         var stats = await _statisticsService.GetHospitalActivityStatsAsync(userId, options);

         return Ok(stats);
      }

      [HttpGet("transactions")]
      public async Task<ActionResult<Response<HospitalPlottableStatsDto>>> GetHospitalTransactionsStatsAsync([FromQuery] HospitalStatsOptionsDto options)
      {
         var userId = GetUserId();

         var stats = await _statisticsService.GetHospitalTransactionsStatsAsync(userId, options);

         return Ok(stats);
      }
   }
}