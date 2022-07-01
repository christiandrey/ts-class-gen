using System;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class RecurringPaymentDto
   {
      public Guid Id { get; set; }
      public DateTime CreatedAt { get; set; }
      public DateTime StartDate { get; set; }
      public decimal LocalAmount { get; set; }
      public string Description { get; set; }
      public string Notes { get; set; }
      public Guid? EstateId { get; set; }
      public Guid? BeneficiaryId { get; set; }
      public Guid? ServiceCategoryId { get; set; }
      public Recurrence Recurrence { get; set; }
      public PaymentMode Mode { get; set; }
      public CurrencyDto Currency { get; set; }
      public UserLiteDto Recipient { get; set; }
      public PaymentBeneficiaryDto Beneficiary { get; set; }
      public ServiceCategoryDto ServiceCategory { get; set; }
   }

   public class AdminRecurringPaymentDto : RecurringPaymentDto
   {
      public EstateLiteDto Estate { get; set; }
      public UserLiteDto User { get; set; }
   }
}