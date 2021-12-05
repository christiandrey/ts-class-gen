using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Text;
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
   [Authorize]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/users")]
   public class UserController : BaseController
   {
      private readonly ICalendarEventService _calendarEventService;
      private readonly IUserService _userService;
      private readonly IMapper _mapper;

      public UserController(IUserService userService, ICalendarEventService calendarEventService, IMapper mapper) : base(mapper)
      {
         _calendarEventService = calendarEventService;
         _userService = userService;
         _mapper = mapper;
      }

      [HttpGet(""), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<PaginatedResponse<UserLiteDto>>> GetUsersAsync(string query = null, int page = 1, int pageSize = 30)
      {
         var users = await _userService.GetUsers(page, pageSize, query);

         return Paginated<User, UserLiteDto>(users);
      }

      [HttpGet("export"), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<FileContentResult> ExportAsync(int page, int pageSize, string query = null)
      {
         var csv = await _userService.GetUsersCsvAsync(page, pageSize, query);

         return File(new UTF8Encoding().GetBytes(csv), "text/csv", "Users.csv");
      }

      [HttpGet("export/all"), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<FileContentResult> ExportAllAsync()
      {
         var csv = await _userService.GetUsersCsvAsync();

         return File(new UTF8Encoding().GetBytes(csv), "text/csv", "Users.csv");
      }

      [HttpGet("{userId:guid}")]
      public async Task<ActionResult<Response<UserDto>>> GetUserProfileByIdAsync(Guid userId)
      {
         var user = await _userService.GetByIdAsync(userId);

         if (user == null)
         {
            return NotFound(ResponseMessages.UserNotExist);
         }

         return Ok(_mapper.Map<UserDto>(user));
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpDelete("{userId:guid}")]
      public async Task<ActionResult<Response>> DeleteUserAsync(Guid userId, DeleteMode mode = DeleteMode.Soft)
      {
         var user = await _userService.GetByIdAsync(userId);

         if (user == null)
         {
            return NotFound(ResponseMessages.UserNotExist);
         }

         await _userService.DeleteUserAsync(userId, mode);

         return Ok();
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpPut("{userId:guid}/activate")]
      public async Task<ActionResult<Response>> ActivateUserAsync(Guid userId)
      {
         var user = await _userService.GetByIdAsync(userId);

         if (user == null)
         {
            return NotFound(ResponseMessages.UserNotExist);
         }

         await _userService.ActivateAsync(userId, true);

         return Ok();
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpPut("{userId:guid}/deactivate")]
      public async Task<ActionResult<Response>> DectivateUserAsync(Guid userId)
      {
         var user = await _userService.GetByIdAsync(userId);

         if (user == null)
         {
            return NotFound(ResponseMessages.UserNotExist);
         }

         await _userService.ActivateAsync(userId, false);

         return Ok();
      }

      [HttpPut("setup/{password}")]
      public async Task<ActionResult<Response<UserDto>>> SetupUserAsync(string password)
      {
         var userId = GetUserId();

         var user = await _userService.SetupUserAsync(userId, password);

         return Ok(_mapper.Map<UserDto>(user));
      }

      [HttpGet("profile")]
      public async Task<ActionResult<Response<UserDto>>> GetCurrentUserProfileAsync()
      {
         var user = await _userService.GetByIdAsync(GetUserId());

         return Ok(_mapper.Map<UserDto>(user));
      }

      [HttpGet("current/calendar-events/{startDate:datetime}/{endDate:datetime}")]
      public async Task<ActionResult<Response<IEnumerable<CalendarEventDto>>>> GetCurrentUserCalendarEventsAsync(DateTime startDate, DateTime endDate)
      {
         var userId = GetUserId();

         var calendarEvents = await _calendarEventService.GetByParticipantAsync(userId, startDate, endDate);

         return Ok(calendarEvents.Select(o => _mapper.Map<CalendarEventDto>(o)));
      }

      [Authorize(Roles = nameof(UserRoleType.NonMedic))]
      [HttpGet("{id:guid}/calendar-events/{startDate:datetime}/{endDate:datetime}")]
      public async Task<ActionResult<Response<IEnumerable<CalendarEventDto>>>> GetCalendarEventsByUserAsync(Guid id, DateTime startDate, DateTime endDate)
      {
         var calendarEvents = await _calendarEventService.GetByParticipantAsync(id, startDate, endDate);

         return Ok(calendarEvents.Select(o => _mapper.Map<CalendarEventDto>(o)));
      }

      [HttpPatch("profile")]
      public async Task<ActionResult<Response<UserDto>>> UpdateUserProfileAsync(UpdatedUserDto dto)
      {
         var user = await _userService.UpdateUserAsync(GetUserId(), _mapper.Map<User>(dto));

         return Ok(_mapper.Map<UserDto>(user));
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpPut("{userId:guid}/roles")]
      public async Task<ActionResult<Response<IEnumerable<RoleDto>>>> UpdateRoles(Guid userId, UserRoleType[] roles)
      {
         var updatedRoles = await _userService.UpdateRolesAsync(userId, roles);

         return Ok(updatedRoles.Select(_mapper.Map<RoleDto>));
      }
   }
}