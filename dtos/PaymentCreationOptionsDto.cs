using System;
using System.ComponentModel.DataAnnotations;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class PaymentCreationOptionsDto
   {
      [Required]
      public Guid RecipientId { get; set; }
      public Guid? BankAccountId { get; set; }
      public Guid? PaymentAccountId { get; set; }
      [Required]
      public decimal LocalAmount { get; set; }
      public string Description { get; set; }
      public string Notes { get; set; }
      [Required]
      public PaymentMode Mode { get; set; }
      public Recurrence Recurrence { get; set; } = Recurrence.None;
      public DateTime? RecurrenceStartAt { get; set; }
   }
}