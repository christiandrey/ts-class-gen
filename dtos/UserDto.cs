using Caretaker.Models.Enums;
using System;
using System.Collections.Generic;

namespace Caretaker.Models.Dtos
{
   public class UserDto : UserLiteDto
   {
      public DateTime DateOfBirth { get; set; }
      public IEnumerable<RoleDto> Roles { get; set; }
   }

   public class UserLiteDto : UserSummaryDto
   {
      public string Name { get; set; }
      [Obsolete]
      public string FirstName { get; set; }
      [Obsolete]
      public string LastName { get; set; }
      public string UserName { get; set; }
      [Obsolete]
      public string FullName { get; set; }
      public string ImageUrl { get; set; }
      public string Address { get; set; }
      public Gender Gender { get; set; }
      public bool IsActive { get; set; }
   }
}

public class UserSummaryDto
{
   public Guid Id { get; set; }
   public DateTime CreatedAt { get; set; }
   public string Email { get; set; }
   public string PhoneNumber { get; set; }
   public bool EmailConfirmed { get; set; }
   public bool PhoneNumberConfirmed { get; set; }
   public UserStatus Status { get; set; }
   public List<string> RoleNames { get; set; } = new List<string> { };
}