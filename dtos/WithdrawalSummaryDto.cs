using System.Collections.Generic;

namespace Caretaker.Models.Dtos
{
   public class WithdrawalSummaryDto
   {
      public Dictionary<string, decimal> StripeBalance { get; set; }
      public Dictionary<string, decimal> PaystackBalance { get; set; }
      public decimal TotalPendingAmount { get; set; }
   }
}