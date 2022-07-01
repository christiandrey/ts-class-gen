using System;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class UpdatedUserDto
   {
      public Gender Gender { get; set; }
      [Obsolete]
      public string LastName { get; set; }
      [Obsolete]
      public string FirstName { get; set; }
      public string Name { get; set; }
      public string UserName { get; set; }
      public string ImageUrl { get; set; }
   }
}