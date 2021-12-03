using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using HealthGyro.Models.Dtos;
using HealthGyro.Models.Entities;
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
   [Route("v{version:apiVersion}/preferences")]
   public class UserPreferenceController : BaseController
   {
      private readonly IUserPreferenceService _userPreferenceService;
      private readonly IMapper _mapper;

      public UserPreferenceController(IUserPreferenceService userPreferenceService, IMapper mapper) : base(mapper)
      {
         _userPreferenceService = userPreferenceService;
         _mapper = mapper;
      }

      [HttpGet("")]
      public async Task<ActionResult<Response<UserPreferenceDto>>> GetUserPreferencesAsync()
      {
         var userId = GetUserId();

         var userPreference = await _userPreferenceService.GetByUserIdAsync(userId);

         if (userPreference == null)
         {
            userPreference = await _userPreferenceService.CreateForUserAsync(userId);
         }

         return Ok(_mapper.Map<UserPreferenceDto>(userPreference));
      }

      [HttpPut("")]
      public async Task<ActionResult<Response<UserPreferenceDto>>> UpdateUserPreferencesAsync(UserPreferenceDto dto)
      {
         var userId = GetUserId();

         var reverseMappedDto = _mapper.Map<UserPreference>(dto);

         var userPreference = await _userPreferenceService.UpdateAsync(userId, reverseMappedDto);

         return Ok(_mapper.Map<UserPreferenceDto>(userPreference));
      }
   }
}