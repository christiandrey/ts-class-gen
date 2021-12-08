using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using HealthGyro.Common.Constants;
using HealthGyro.Models.Dtos;
using HealthGyro.Models.Entities;
using HealthGyro.Models.Enums;
using HealthGyro.Models.Utilities.Response;
using HealthGyro.Services.Entities.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthGyro.Controllers
{
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/settings")]
   public class SettingController : BaseController
   {
      private readonly ISettingsService _settingsService;
      private readonly IMapper _mapper;

      public SettingController(
         ISettingsService settingsService,
         IMapper mapper) : base(mapper)
      {
         _settingsService = settingsService;
         _mapper = mapper;
      }

      [HttpGet("")]
      public async Task<ActionResult<Response<IEnumerable<SettingDto>>>> GetAllAsync()
      {
         var settings = await _settingsService.GetAllAsync();

         return Ok(settings.Select(_mapper.Map<SettingDto>));
      }

      [HttpGet("app-version")]
      public async Task<ActionResult<Response<string>>> GetAppVersionAsync()
      {
         var currentAppVersion = await _settingsService.GetValueByKeyAsync(SettingsVariables.CurrentAppVersion);

         return Ok(currentAppVersion, null);
      }

      [HttpPost("")]
      [Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response<SettingDto>>> AddOrUpdateAsync(Setting dto)
      {
         var updatedSetting = await _settingsService.AddOrUpdateAsync(dto);

         return Ok(_mapper.Map<SettingDto>(updatedSetting));
      }
   }
}