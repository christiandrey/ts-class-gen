using System;
using System.Collections.Generic;

namespace Caretaker.Models.Dtos
{
   public class OrganizationDto : BaseEntityDto
   {
      public string Name { get; set; }
      public bool ManageFundsOffline { get; set; }
      public bool IsOnTrial { get; set; }
      public DateTime? TrialEndsOn { get; set; }
      public List<MemberLiteDto> Members { get; set; }
      public List<OrganizationClaimDto> Claims { get; set; }
   }
}