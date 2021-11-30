using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class MailAddressDto
   {
      [Required, EmailAddress]
      public string Email { get; set; }
      [Required]
      public string Name { get; set; }
   }
}