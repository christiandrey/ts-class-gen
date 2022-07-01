using System;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class PaymentDto : PaymentLiteDto
   {
      public EstateLiteDto Estate { get; set; }
   }

   public class PaymentLiteDto : BaseEntityDto
   {
      public PaymentMode Mode { get; set; }
      public string Reference { get; set; }
      public string EvidenceUrl { get; set; }
      public string Notes { get; set; }
      public Guid UserId { get; set; }
      public Guid RecipientId { get; set; }
      public Guid? EstateId { get; set; }
      public Guid? ServiceCategoryId { get; set; }
      public Guid? BeneficiaryId { get; set; }
      public ServiceCategoryDto ServiceCategory { get; set; }
      public PaymentBeneficiaryDto Beneficiary { get; set; }
      public UserLiteDto User { get; set; }
      public UserLiteDto Recipient { get; set; }
      public TransactionDto DebitTransaction { get; set; }
   }
}