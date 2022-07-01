using System;

namespace Caretaker.Models.Dtos
{
   public class PaymentSummaryDto
   {
      public decimal WalletFunding { get; set; }
      public decimal Maintenance { get; set; }
      public decimal Repairs { get; set; }
      public decimal ServiceCharge { get; set; }
      public decimal Withdrawals { get; set; }
   }
}
