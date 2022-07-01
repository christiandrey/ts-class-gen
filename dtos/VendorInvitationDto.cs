using System;
using System.Collections.Generic;

namespace Caretaker.Models.Dtos
{
   public class VendorInvitationDto : BaseEntityDto
   {
      public string Email { get; set; }
      public bool Accepted { get; set; }
      public DateTime? AcceptedAt { get; set; }
      public Guid EstateId { get; set; }
      public List<Guid> ServicesIds { get; set; }
      public string EstateName { get; set; }
      public string EstateAddress { get; set; }
      public string FacilityManagerName { get; set; }
   }
}