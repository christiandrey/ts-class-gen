using System;

namespace Caretaker.Models.Dtos
{
   public class PaymentAccountDto
   {
      public Guid Id { get; set; }
      public DateTime CreatedAt { get; set; }
      public string Name { get; set; }
      public bool IsActive { get; set; }
      public bool IsDefault { get; set; }
      public Guid EstateId { get; set; }
      public decimal Balance { get; set; }
   }
}