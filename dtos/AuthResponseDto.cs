using HealthGyro.Models.Entities;
using HealthGyro.Models.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HealthGyro.Models.Dtos
{
   public class AuthResponseDto : UserLiteDto
   {
      public string AccessToken { get; set; }
      public string RefreshToken { get; set; }
      public DateTime IssuedAt { get; set; }
      public DateTime ExpiresAt { get; set; }
      public IEnumerable<RoleDto> Roles { get; set; }

      public AuthResponseDto(JwtToken jwtToken, User user)
      {
         Id = user.Id;
         IssuedAt = jwtToken.IssuedAt;
         ExpiresAt = jwtToken.ExpiresAt;
         AccessToken = jwtToken.AccessToken;
         RefreshToken = jwtToken.RefreshToken;
         FirstName = user.FirstName;
         LastName = user.LastName;
         FullName = user.FullName;
         Gender = user.Gender;
         Email = user.Email;
         EmailConfirmed = user.EmailConfirmed;
         PhoneNumber = user.PhoneNumber;
         Roles = user.UserRoles.Select(x => new RoleDto(x.Role));
      }
   }
}
