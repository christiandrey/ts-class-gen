using System;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class MemberDto : MemberLiteDto
   {
      public MemberPermissionDto Permissions { get; set; }
      public decimal PaymentLimit { get; set; }
      public Guid OrganizationId { get; set; }
   }

   public class MemberLiteDto : BaseEntityDto
   {
      public bool IsActive { get; set; }
      public MemberRoleType Role { get; set; }
      public FacilityManagerDto FacilityManager { get; set; }
   }
}