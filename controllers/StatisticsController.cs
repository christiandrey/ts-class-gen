using System;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using Caretaker.Models.Dtos;
using Caretaker.Models.Enums;
using Caretaker.Models.Utilities.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Caretaker.Services.Statistics;

namespace Caretaker.Controllers
{
   [Authorize(Roles = nameof(UserRoleType.Admin))]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/stats")]
   public class StatisticsController : BaseController
   {
      private readonly IStatisticsService _statisticsService;

      public StatisticsController(
          IMapper mapper,
          IStatisticsService statisticsService) : base(mapper)
      {
         _statisticsService = statisticsService;
      }


      [HttpGet("units")]
      public async Task<ActionResult<Response<StatDto>>> GetNumberOfUnitsStatsAsync(DateTime? startDate = null, DateTime? endDate = null)
      {
         var data = await _statisticsService.GetNumberOfUnitsStatsAsync(startDate, endDate);

         return Ok(data);
      }

      [HttpGet("facility-managers")]
      public async Task<ActionResult<Response<StatDto>>> GetNumberOfFacilityManagersStatsAsync(DateTime? startDate = null, DateTime? endDate = null)
      {
         var data = await _statisticsService.GetNumberOfFacilityManagersStatsAsync(startDate, endDate);

         return Ok(data);
      }

      [HttpGet("payments")]
      public async Task<ActionResult<Response<StatDto>>> GetPaymentsProcessedStatsAsync(DateTime? startDate = null, DateTime? endDate = null)
      {
         var data = await _statisticsService.GetPaymentsProcessedStatsAsync(startDate, endDate);

         return Ok(data);
      }

      [HttpGet("revenue")]
      public async Task<ActionResult<Response<StatDto>>> GetRevenueStatsAsync(DateTime? startDate = null, DateTime? endDate = null)
      {
         var data = await _statisticsService.GetRevenueStatsAsync(startDate, endDate);

         return Ok(data);
      }

      [HttpGet("units/active")]
      public async Task<ActionResult<Response<int>>> GetActiveUnitsCountAsync()
      {
         var count = await _statisticsService.GetActiveUnitsCountAsync();

         return Ok(count);
      }

      [HttpGet("facility-managers/active")]
      public async Task<ActionResult<Response<int>>> GetActiveFacilityManagersCountAsync()
      {
         var count = await _statisticsService.GetActiveFacilityManagersCountAsync();

         return Ok(count);
      }

      [HttpGet("revenue/total")]
      public async Task<ActionResult<Response<decimal>>> GetTotalRevenueAsync()
      {
         var total = await _statisticsService.GetTotalRevenueAsync();

         return Ok(total);
      }

      [HttpGet("units/total")]
      public async Task<ActionResult<Response<int>>> GetTotalNumberOfUnitsAsync()
      {
         var count = await _statisticsService.GetTotalNumberOfUnitsAsync();

         return Ok(count);
      }

      [HttpGet("payments/total")]
      public async Task<ActionResult<Response<decimal>>> GetTotalPaymentsProcessedAsync()
      {
         var total = await _statisticsService.GetTotalPaymentsProcessedAsync();

         return Ok(total);
      }
   }
}