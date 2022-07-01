using System.ComponentModel.DataAnnotations;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class BankAccountCreationOptionsDto
   {
      [Required]
      public string AccountName { get; set; }
      [Required]
      public string AccountNumber { get; set; }
      public BankAccountType Type { get; set; } = BankAccountType.Individual;
      [Required]
      public string BankName { get; set; }
      [Required]
      public string BankCode { get; set; }
   }
}