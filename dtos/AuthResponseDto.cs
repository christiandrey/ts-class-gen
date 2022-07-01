using Caretaker.Models.Entities;
using Caretaker.Models.Enums;
using Caretaker.Models.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Caretaker.Models.Dtos
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
         Name = user.Name;
         UserName = user.UserName;
         FullName = user.FullName;
         Address = user.Address;
         Gender = user.Gender;
         Email = user.Email;
         EmailConfirmed = user.EmailConfirmed;
         PhoneNumber = user.PhoneNumber;
         Roles = user.UserRoles.Select(x => new RoleDto(x.Role));
         RoleNames = user.UserRoles.Select(x => x.Role.Name).ToList();
         Status = GetUserStatus(user);
      }

      private UserStatus GetUserStatus(User user)
      {
         //TODO: Remove this method completely. Should now be done on FE.
         if (user.CurrentAccountType.HasValue)
         {
            switch (user.CurrentAccountType.Value)
            {
               case UserAccountType.FacilityManager:
                  return UserStatus.FacilityManager;
               case UserAccountType.Resident:
                  return UserStatus.Resident;
               case UserAccountType.Vendor:
                  return UserStatus.Vendor;
               case UserAccountType.Ghost:
                  return UserStatus.Ghost;
               case UserAccountType.Owner:
                  return UserStatus.Owner;
               default:
                  break;
            }
         }

         return UserStatus.Verified;
      }
   }
}
