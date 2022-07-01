using System;

namespace Caretaker.Models.Dtos
{
   public class OnboardedUserDto
   {
      public Guid UserId { get; set; }
      public string Email { get; set; }
      public string Password { get; set; }
   }
}