using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;
using Caretaker.Common.Constants;
using Caretaker.Models.Entities;
using Caretaker.Models.Enums;
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Entities.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Caretaker.Controllers
{
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/settings")]
   public class SettingsController : BaseController
   {
      private readonly ISettingsService _settingsService;

      public SettingsController(ISettingsService settingsService)
      {
         _settingsService = settingsService;
      }

      [HttpGet("")]
      public async Task<ActionResult<Response<IEnumerable<Setting>>>> GetAllAsync()
      {
         var settings = await _settingsService.GetAllAsync();

         return Ok(settings);
      }

      [HttpGet("app-version")]
      public async Task<ActionResult<Response<string>>> GetAppVersionAsync()
      {
         var currentAppVersion = await _settingsService.GetValueByKeyAsync(SettingsVariables.CurrentAppVersion);

         return Ok(currentAppVersion, null);
      }

      [HttpPost("")]
      [Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response<Setting>>> AddOrUpdateAsync(Setting setting)
      {
         var updatedSetting = await _settingsService.AddOrUpdateAsync(setting);

         return Ok(updatedSetting);
      }
   }
}