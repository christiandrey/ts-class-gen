using System;

namespace Caretaker.Models.Dtos
{
   public class EstateManagerDto : BaseEntityDto
   {
      public bool IsActive { get; set; }
      public decimal PaymentLimit { get; set; }
      public Guid EstateId { get; set; }
      public Guid MemberId { get; set; }
      public Guid OrganizationClaimId { get; set; }
      public MemberLiteDto Member { get; set; }
   }
}