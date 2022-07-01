using System;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class CardDto
   {
      public Guid Id { get; set; }
      public DateTime CreatedAt { get; set; }
      public int ExpiryMonth { get; set; }
      public int ExpiryYear { get; set; }
      public string Number { get; set; }
      public string Brand { get; set; }
      public PaymentGateway Gateway { get; set; }
      public bool CanWithdraw { get; set; }
      public CurrencyDto Currency { get; set; }
   }
}