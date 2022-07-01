using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class PaymentUpdateOptionsDto
   {
      [Required]
      public string EvidenceUrl { get; set; }
   }
}