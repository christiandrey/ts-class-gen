using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class PaymentAccountCreationOptionsDto
   {
      [Required]
      public string Name { get; set; }
   }
}