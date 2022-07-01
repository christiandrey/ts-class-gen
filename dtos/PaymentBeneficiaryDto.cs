using System;

namespace Caretaker.Models.Dtos
{
   public class PaymentBeneficiaryDto
   {
      public Guid Id { get; set; }
      public DateTime CreatedAt { get; set; }
      public string AccountName { get; set; }
      public string AccountNumber { get; set; }
      public string BankName { get; set; }
      public string BankCode { get; set; }
      public string TwoLetterISOCountryName { get; set; }
      public int EstatesCount { get; set; }
   }
}