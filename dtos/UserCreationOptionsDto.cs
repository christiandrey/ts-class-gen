using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class UserCreationOptionsDto
   {
      [Required]
      public string LastName { get; set; }
      [Required]
      public string FirstName { get; set; }
      [Required, EmailAddress]
      public string Email { get; set; }
   }
}