using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class CheckEmailDto
   {
      [Required, EmailAddress]
      public string Email { get; set; }
   }
}
