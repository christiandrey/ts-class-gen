using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class AppleUserDto
   {
      [Required]
      public string AccessToken { get; set; }

      public string FirstName { get; set; }

      public string LastName { get; set; }
   }
}