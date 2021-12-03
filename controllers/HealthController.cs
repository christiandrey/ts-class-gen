using System.Net.Mime;
using System.Threading.Tasks;
using HealthGyro.Models.Utilities.Response;
using HealthGyro.Services.Entities.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthGyro.Controllers
{
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/health")]
   public class HealthController : BaseController
   {
      private readonly IHealthService _healthService;

      public HealthController(IHealthService healthService)
      {
         _healthService = healthService;
      }

      [HttpGet("")]
      public ActionResult<Response> CheckHealthAsync()
      {
         return Ok();
      }

      [HttpGet("database")]
      public async Task<ActionResult<Response>> CheckDatabaseHealthAsync()
      {
         var canConnect = await _healthService.CanConnectToDatabaseAsync();

         if (canConnect)
         {
            return Ok();
         }

         return StatusCode(StatusCodes.Status503ServiceUnavailable);
      }
   }
}