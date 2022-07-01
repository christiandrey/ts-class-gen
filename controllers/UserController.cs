using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Caretaker.Common.Constants;
using Caretaker.Models.Dtos;
using Caretaker.Models.Entities;
using Caretaker.Models.Enums;
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Entities.Interfaces;
using Caretaker.Services.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Caretaker.Controllers
{
   [Authorize]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/users")]
   public class UserController : BaseController
   {
      private readonly JwtService _jwtService;
      private readonly IUserService _userService;
      private readonly IMapper _mapper;

      public UserController(IUserService userService, JwtService jwtService, IMapper mapper) : base(mapper)
      {
         _jwtService = jwtService;
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
      public async Task<FileContentResult> ExportAsync()
      {
         var csv = await _userService.GetUsersCsvAsync();

         return File(new UTF8Encoding().GetBytes(csv), "text/csv", "Users.csv");
      }

      [HttpGet("{userId:guid}")]
      public async Task<ActionResult<Response<UserDto>>> GetUserProfileAsync(Guid userId)
      {
         var user = await _userService.GetByIdAsync(userId);

         if (user == null)
         {
            return NotFound(ResponseMessages.UserNotExist);
         }

         return Ok(_mapper.Map<UserDto>(user));
      }

      [HttpGet("{userId:guid}/accounts")]
      public async Task<ActionResult<Response<UserAccountsDto>>> GetUserAccountsAsync(Guid userId)
      {
         var user = await _userService.GetByIdAsync(userId);

         var userAccounts = new UserAccountsDto
         {
            Residents = user.Residents.Select(o => _mapper.Map<ResidentDto>(o)).ToList(),
         };

         if (user.FacilityManager != null)
         {
            userAccounts.FacilityManager = _mapper.Map<FacilityManagerDto>(user.FacilityManager);
         }

         if (user.Vendor != null)
         {
            userAccounts.Vendor = _mapper.Map<VendorDto>(user.Vendor);
         }

         if (user.Ghost != null)
         {
            userAccounts.Ghost = _mapper.Map<GhostDto>(user.Ghost);
         }

         if (user.Owner != null)
         {
            userAccounts.Owner = _mapper.Map<OwnerDto>(user.Owner);
         }

         return Ok(userAccounts);
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpDelete("{userId:guid}")]
      public async Task<ActionResult<Response>> DeleteUserAsync(Guid userId)
      {
         var user = await _userService.GetByIdAsync(userId);

         if (user == null)
         {
            return NotFound(ResponseMessages.UserNotExist);
         }

         await _userService.DeleteUserAsync(userId);

         return Ok();
      }

      [HttpDelete("")]
      public async Task<ActionResult<Response>> DeleteCurrentUserAsync()
      {
         var userId = GetUserId();
         
         var user = await _userService.GetByIdAsync(userId);

         if (user == null)
         {
            return NotFound(ResponseMessages.UserNotExist);
         }

         await _userService.DeleteUserAsync(userId);

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
      public async Task<ActionResult<Response>> DeactivateUserAsync(Guid userId)
      {
         var user = await _userService.GetByIdAsync(userId);

         if (user == null)
         {
            return NotFound(ResponseMessages.UserNotExist);
         }

         await _userService.ActivateAsync(userId, false);

         return Ok();
      }

      [HttpGet("profile")]
      public async Task<ActionResult<Response<UserDto>>> GetUserProfileAsync()
      {
         var user = await _userService.GetByIdAsync(GetUserId());

         return Ok(_mapper.Map<UserDto>(user));
      }

      [HttpPatch("profile")]
      public async Task<ActionResult<Response<UserDto>>> UpdateUserProfileAsync(UpdatedUserDto dto)
      {
         var userId = GetUserId();

         var user = await _userService.UpdateUserAsync(userId, _mapper.Map<User>(dto));

         return Ok(_mapper.Map<UserDto>(user));
      }

      [HttpPatch("current/accounts/active")]
      public async Task<ActionResult<Response<UserDto>>> UpdateUserActiveAccountAsync(UserCurrentAccountDto dto)
      {
         var userId = GetUserId();

         var user = await _userService.UpdateCurrentAccountAsync(userId, dto.CurrentAccountId, dto.CurrentAccountType, false);

         return Ok(_mapper.Map<UserDto>(user));
      }

      [HttpGet("current/accounts")]
      public async Task<ActionResult<Response<UserAccountsDto>>> GetUserAccountsAsync()
      {
         var user = await _userService.GetByIdAsync(GetUserId());

         var userAccounts = new UserAccountsDto
         {
            Residents = user.Residents.Select(o => _mapper.Map<ResidentDto>(o)).ToList(),
         };

         if (user.FacilityManager != null)
         {
            userAccounts.FacilityManager = _mapper.Map<FacilityManagerDto>(user.FacilityManager);
         }

         if (user.Vendor != null)
         {
            userAccounts.Vendor = _mapper.Map<VendorDto>(user.Vendor);
         }

         if (user.Ghost != null)
         {
            userAccounts.Ghost = _mapper.Map<GhostDto>(user.Ghost);
         }

         if (user.Owner != null)
         {
            userAccounts.Owner = _mapper.Map<OwnerDto>(user.Owner);
         }

         return Ok(userAccounts);
      }

      [HttpPut("profile/password")]
      public async Task<ActionResult<Response<AuthResponseDto>>> UpdateUserPasswordAsync(string password)
      {
         var userId = GetUserId();

         var user = await _userService.ResetPasswordAsync(userId, password);

         var tokenData = await _jwtService.GenerateToken(user);

         var responseData = new AuthResponseDto(tokenData, user);

         return Ok(responseData);
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