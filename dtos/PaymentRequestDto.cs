using System;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class PaymentRequestDto : PaymentRequestLiteDto
   {
      public PaymentMode Mode { get; set; }
      public Recurrence Recurrence { get; set; }
      public DateTime? RecurrenceStartAt { get; set; }
      public EstateLiteDto Estate { get; set; }
      public UserLiteDto Recipient { get; set; }
      public ServiceCategoryDto ServiceCategory { get; set; }
      public PaymentBeneficiaryDto Beneficiary { get; set; }
      public PaymentAccountDto PaymentAccount { get; set; }
   }

   public class PaymentRequestLiteDto : BaseEntityDto
   {
      public PaymentRequestStatus Status { get; set; }
      public DateTime? StatusUpdatedAt { get; set; }
      public decimal Amount { get; set; }
      public string Description { get; set; }
      public string Notes { get; set; }
      public Guid? PaymentAccountId { get; set; }
      public EstateManagerDto EstateManager { get; set; }
   }
}