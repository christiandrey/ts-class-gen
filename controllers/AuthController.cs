using Caretaker.Common.Constants;
using Caretaker.Common.Exceptions;
using Caretaker.Models.Dtos;
using Caretaker.Models.Entities;
using Caretaker.Models.Enums;
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Email;
using Caretaker.Services.Entities.Interfaces;
using Caretaker.Services.Utilities.Interfaces;
using Caretaker.Services.Utilities;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Net.Mime;
using Caretaker.Common.Extensions;
using AutoMapper;
using Caretaker.Models.BackgroundDtos;

namespace Caretaker.Controllers
{
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/auth")]
   public class AuthController : BaseController
   {
      private readonly IBackgroundService _backgroundService;
      private readonly IUserService _userService;
      private readonly OtpService _otpService;
      private readonly JwtService _jwtService;
      private readonly IMapper _mapper;

      public AuthController(
         IBackgroundService backgroundService,
         IUserService userService,
         OtpService totpService,
         JwtService jwtService,
         IMapper mapper) : base(mapper)
      {
         _backgroundService = backgroundService;
         _userService = userService;
         _otpService = totpService;
         _jwtService = jwtService;
         _mapper = mapper;
      }

      [HttpPost("register")]
      public async Task<ActionResult<Response<AuthResponseDto>>> CreateUserAsync(RegisterDto dto)
      {
         try
         {
            var existingUser = await _userService.GetByEmailAsync(dto.Email);

            if (existingUser != null)
            {
               return BadRequest(nameof(dto.Email), ResponseMessages.UserAlreadyExists);
            }

            var userToCreate = new User
            {
               FirstName = dto.FirstName.Trim().ToTitleCase(),
               LastName = dto.LastName.Trim().ToTitleCase(),
               Name = $"{dto.FirstName.Trim()} {dto.LastName.Trim()}",
               Email = dto.Email,
               PhoneNumber = dto.PhoneNumber
            };

            var user = await _userService.CreateUserAsync(userToCreate, dto.Password);

            var verifyEmailOtp = _otpService.GenerateHotp(user.Id, OtpType.VerifyEmail);

            var userBackgroundDto = _mapper.Map<UserBackgroundDto>(user);

            _backgroundService.Enqueue<IEmailService>(o => o.SendOnEmailVerificationRequestAsync(userBackgroundDto, verifyEmailOtp));

            var tokenData = await _jwtService.GenerateToken(user);

            var responseData = new AuthResponseDto(tokenData, user);

            return Ok(responseData);
         }
         catch (IdentityException bug)
         {
            var message = bug.Errors.FirstOrDefault();

            if (message.Contains("is already taken"))
            {
               return BadRequest(nameof(dto.Email), ResponseMessages.UserAlreadyExists);
            }

            return BadRequest(bug.Errors.FirstOrDefault());
         }
      }

      [HttpPost("login")]
      public async Task<ActionResult<Response<AuthResponseDto>>> AuthenticateUserAsync(AuthenticateDto dto)
      {
         var user = await _userService.AuthenticateAsync(dto.Username, dto.Password);

         if (user == null)
         {
            return BadRequest(nameof(dto.Password), ResponseMessages.InvalidLoginDetails);
         }

         var tokenData = await _jwtService.GenerateToken(user);

         var responseData = new AuthResponseDto(tokenData, user);

         return Ok(responseData);
      }

      [HttpPost("verifications/email")]
      public async Task<ActionResult<Response>> VerifyEmailAsync(VerifyEmailDto dto)
      {
         var user = await _userService.GetByEmailAsync(dto.Email);

         if (user == null)
         {
            return BadRequest(nameof(dto.Email), ResponseMessages.UserNotExist);
         }

         if (user.EmailConfirmed)
         {
            return Ok();
         }

         if (!_otpService.VerifyHotp(user.Id, OtpType.VerifyEmail, dto.Code))
         {
            return BadRequest(nameof(dto.Code), ResponseMessages.InvalidOrExpiredCode);
         }

         await _userService.VerifyEmailAsync(user.Id);

         return Ok();
      }

      [HttpPost("verifications/email/resend")]
      public async Task<ActionResult<Response>> ResendEmailAsync(string email)
      {
         var user = await _userService.GetByEmailAsync(email);

         if (user == null)
         {
            return BadRequest(nameof(email), ResponseMessages.UserNotExist);
         }

         if (user.EmailConfirmed)
         {
            return Ok();
         }

         var verifyEmailOtp = _otpService.GenerateHotp(user.Id, OtpType.VerifyEmail);

         var userBackgroundDto = _mapper.Map<UserBackgroundDto>(user);

         _backgroundService.Enqueue<IEmailService>(o => o.SendOnEmailVerificationRequestAsync(userBackgroundDto, verifyEmailOtp));

         return Ok();
      }

      [HttpPost("refresh")]
      public async Task<ActionResult<Response<AuthResponseDto>>> RefreshTokenAsync(Guid refreshToken)
      {
         var user = await _userService.GetByRefreshTokenAsync(refreshToken);

         if (user == null)
         {
            return BadRequest(nameof(refreshToken), ResponseMessages.InvalidRefreshToken);
         }

         var tokenData = await _jwtService.GenerateToken(user);

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