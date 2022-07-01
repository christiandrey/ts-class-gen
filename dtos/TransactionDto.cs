using System;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class TransactionDto
   {
      public Guid Id { get; set; }
      public bool IsCredit { get; set; }
      public decimal Amount { get; set; }
      public string Reference { get; set; }
      public Guid? EstateId { get; set; }
      public TransactionMode Mode { get; set; }
      public string Description { get; set; }
      public DateTime CreatedAt { get; set; }
      public UserLiteDto User { get; set; }
   }
}
