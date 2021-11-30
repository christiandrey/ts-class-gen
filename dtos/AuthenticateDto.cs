using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class AuthenticateDto
   {
      [Required, DataType(DataType.EmailAddress)]
      public string Username { get; set; }
      [Required]
      public string Password { get; set; }
   }
}
