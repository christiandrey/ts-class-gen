using HealthGyro.Common.Constants;
using HealthGyro.Models.Dtos;
using HealthGyro.Models.Enums;
using HealthGyro.Models.Utilities.Response;
using HealthGyro.Services.Email;
using HealthGyro.Services.Entities.Interfaces;
using HealthGyro.Services.Utilities.Interfaces;
using HealthGyro.Services.Utilities;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using System.Net.Mime;
using AutoMapper;
using HealthGyro.Models.BackgroundDtos;
using HealthGyro.Models.Entities;

namespace HealthGyro.Controllers
{
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/auth")]
   public class AuthController : BaseController
   {
      private readonly IBackgroundService _backgroundService;
      private readonly IGuestService _guestService;
      private readonly IUserService _userService;
      private readonly OtpService _otpService;
      private readonly JwtService _jwtService;
      private readonly IMapper _mapper;

      public AuthController(
         IBackgroundService backgroundService,
         IGuestService guestService,
         IUserService userService,
         OtpService totpService,
         JwtService jwtService,
         IMapper mapper) : base(mapper)
      {
         _backgroundService = backgroundService;
         _guestService = guestService;
         _userService = userService;
         _otpService = totpService;
         _jwtService = jwtService;
         _mapper = mapper;
      }

      [HttpPost("token")]
      public async Task<ActionResult<Response<AuthResponseDto>>> AuthenticateUserAsync(AuthenticateDto dto)
      {
         var user = await _userService.AuthenticateAsync(dto.Username, dto.Password);

         if (user == null)
         {
            return BadRequest(nameof(dto.Password), ResponseMessages.InvalidLoginDetails);
         }

         Guest guest = null;

         if (await _userService.IsInRoleAsync(user, UserRoleType.Guest))
         {
            guest = await _guestService.GetByUserIdAsync(user.Id);

            if (guest.AccessExpiresAt.HasValue)
            {
               if (guest.AccessExpiresAt.Value < DateTime.Now)
               {
                  return BadRequest(nameof(dto.Username), ResponseMessages.GuestAccessExpired);
               }
            }
         }

         var tokenData = await _jwtService.GenerateToken(user, guest?.AccessExpiresAt);

         var responseData = new AuthResponseDto(tokenData, user);

         return Ok(responseData);
      }

      [HttpPost("refresh")]
      public async Task<ActionResult<Response<AuthResponseDto>>> RefreshTokenAsync(Guid refreshToken)
      {
         var user = await _userService.GetByRefreshTokenAsync(refreshToken);

         if (user == null)
         {
            return BadRequest(nameof(refreshToken), ResponseMessages.InvalidRefreshToken);
         }

         Guest guest = null;

         if (await _userService.IsInRoleAsync(user, UserRoleType.Guest))
         {
            guest = await _guestService.GetByUserIdAsync(user.Id);

            if (guest.AccessExpiresAt.HasValue)
            {
               if (guest.AccessExpiresAt.Value < DateTime.Now)
               {
                  return BadRequest(nameof(refreshToken), ResponseMessages.InvalidRefreshToken);
               }
            }
         }

         var tokenData = await _jwtService.GenerateToken(user, guest?.AccessExpiresAt);

         var responseData = new AuthResponseDto(tokenData, user);

         await _userService.InvalidateRefreshTokenAsync(user.Id, refreshToken);

         return Ok(responseData);
      }

      [HttpPost("passwords/forgot")]
      public async Task<ActionResult<Response>> ForgotPasswordAsync(string email)
      {
         var user = await _userService.GetByEmailAsync(email);

         if (user == null)
         {
            return BadRequest(nameof(email), ResponseMessages.UserNotExist);
         }

         if (await _userService.IsInRoleAsync(user, UserRoleType.Guest))
         {
            var guest = await _guestService.GetByUserIdAsync(user.Id);

            if (guest.AccessExpiresAt.HasValue)
            {
               if (guest.AccessExpiresAt.Value < DateTime.Now)
               {
                  return BadRequest(nameof(email), ResponseMessages.GuestAccessExpired);
               }
            }
         }

         var totp = _otpService.GenerateTotp(user.Id, OtpType.ResetPassword);

         var userBackgroundDto = _mapper.Map<UserBackgroundDto>(user);

         _backgroundService.Enqueue<IEmailService>(o => o.SendOnForgotPasswordRequestAsync(userBackgroundDto, totp));

         return base.Ok();
      }

      [HttpPost("passwords/reset")]
      public async Task<ActionResult<Response<AuthResponseDto>>> ResetPasswordAsync(ResetPasswordDto dto)
      {
         var user = await _userService.GetByEmailAsync(dto.Email);

         if (user == null)
         {
            return BadRequest(nameof(dto.Email), ResponseMessages.UserNotExist);
         }

         if (!_otpService.VerifyTotp(user.Id, OtpType.ResetPassword, dto.Code))
         {
            return BadRequest(nameof(dto.Code), ResponseMessages.InvalidOrExpiredCode);
         }

         await _userService.ResetPasswordAsync(user.Id, dto.Password);

         var tokenData = await _jwtService.GenerateToken(user);

         var responseData = new AuthResponseDto(tokenData, user);

         return Ok(responseData);
      }

      [HttpPost("passwords/reset/verify")]
      public async Task<ActionResult<Response>> VerifyResetPasswordCodeAsync(VerifyResetCodeDto dto)
      {
         var user = await _userService.GetByEmailAsync(dto.Email);

         if (user == null)
         {
            return BadRequest(nameof(dto.Email), ResponseMessages.UserNotExist);
         }

         if (!_otpService.VerifyTotp(user.Id, OtpType.ResetPassword, dto.Code))
         {
            return BadRequest(nameof(dto.Code), ResponseMessages.InvalidOrExpiredCode);
         }

         return base.Ok();
      }
   }
}