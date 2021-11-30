using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class MailingDto
   {
      [Required]
      public string Content { get; set; }
      [Required]
      public string Subject { get; set; }
      [Required]
      public IEnumerable<MailAddressDto> Addresses { get; set; }
      public string Template { get; set; }
   }
}