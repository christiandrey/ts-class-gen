using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class VerifyResetCodeDto
   {
      [Required, EmailAddress]
      public string Email { get; set; }
      [Required]
      public string Code { get; set; }
   }
}
