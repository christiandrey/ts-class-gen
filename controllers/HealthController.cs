using System.Net.Mime;
using System.Threading.Tasks;
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Entities.Interfaces;
using Caretaker.Services.MailProvider;
using Caretaker.Services.MessagingProvider;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Caretaker.Controllers
{
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/health")]
   public class HealthController : BaseController
   {
      private readonly IHealthService _healthService;
      private readonly IMessagingProviderService _messagingProviderService;
      private readonly IMailProviderService _mailProviderService;

      public HealthController(IHealthService healthService, IMessagingProviderService messagingProviderService, IMailProviderService mailProviderService)
      {
         _healthService = healthService;
         _messagingProviderService = messagingProviderService;
         _mailProviderService = mailProviderService;
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

      [HttpGet("emails")]
      public async Task<ActionResult<Response>> CheckMailProviderHealthAsync()
      {
         var canConnect = await _mailProviderService.CanConnectAsync();

         if (canConnect)
         {
            return Ok();
         }

         return StatusCode(StatusCodes.Status503ServiceUnavailable);
      }

      [HttpGet("messaging")]
      public async Task<ActionResult<Response>> CheckMessagingProviderHealthAsync()
      {
         var canConnect = await _messagingProviderService.CanConnectAsync();

         if (canConnect)
         {
            return Ok();
         }

         return StatusCode(StatusCodes.Status503ServiceUnavailable);
      }
   }
}