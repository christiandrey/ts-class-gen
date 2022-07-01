using System.Collections.Generic;

namespace Caretaker.Models.Dtos
{
   public class UserAccountsDto
   {
      public List<ResidentDto> Residents { get; set; } = new List<ResidentDto> { };
      public FacilityManagerDto FacilityManager { get; set; }
      public GhostDto Ghost { get; set; }
      public OwnerDto Owner { get; set; }
      public VendorDto Vendor { get; set; }
   }
}