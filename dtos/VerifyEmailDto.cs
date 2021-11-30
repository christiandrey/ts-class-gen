using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class VerifyEmailDto
   {
      [Required]
      public string Email { get; set; }
      [Required]
      public string Code { get; set; }
   }
}
