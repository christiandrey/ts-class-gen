using System.ComponentModel.DataAnnotations;
using Caretaker.Common.Attributes;

namespace Caretaker.Models.Dtos
{
   public class AuthenticateDto
   {
      [Required]
      [PhoneNumberOrEmailAddress]
      public string Username { get; set; }
      [Required]
      public string Password { get; set; }
   }
}
