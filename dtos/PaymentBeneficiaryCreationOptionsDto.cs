using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class PaymentBeneficiaryCreationOptionsDto
   {
      [Required]
      public string AccountName { get; set; }
      [Required]
      public string AccountNumber { get; set; }
      [Required]
      public string BankName { get; set; }
      [Required]
      public string BankCode { get; set; }
   }
}