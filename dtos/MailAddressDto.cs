using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class MailAddressDto
   {
      [Required, EmailAddress]
      public string Email { get; set; }
      [Required]
      public string Name { get; set; }
   }
}