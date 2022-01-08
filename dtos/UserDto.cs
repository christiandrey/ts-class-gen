using HealthGyro.Models.Enums;
using System;
using System.Collections.Generic;

namespace HealthGyro.Models.Dtos
{
   public class UserDto : UserLiteDto
   {
      public DateTime DateOfBirth { get; set; }
      public IEnumerable<RoleDto> Roles { get; set; }
   }

   public class UserLiteDto
   {
      public Guid Id { get; set; }
      public DateTime CreatedAt { get; set; }
      public string Email { get; set; }
      public string FirstName { get; set; }
      public string LastName { get; set; }
      public string FullName { get; set; }
      public string ImageUrl { get; set; }
      public Gender Gender { get; set; }
      public string PhoneNumber { get; set; }
      public bool IsActive { get; set; }
      public bool EmailConfirmed { get; set; }
      public bool AccountSetup { get; set; }
      public List<string> RoleNames { get; set; }
   }
}
