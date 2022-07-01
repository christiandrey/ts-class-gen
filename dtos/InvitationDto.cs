using System.Collections.Generic;

namespace Caretaker.Models.Dtos
{
   public class InvitationDto
   {
      public VendorInvitationDto Vendor { get; set; }
      public List<ResidentInvitationDto> Residents { get; set; } = new List<ResidentInvitationDto> { };
   }
}