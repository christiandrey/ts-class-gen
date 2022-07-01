using System;
using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class MemberInvitationOptionsDto
   {
      [Required]
      public Guid FacilityManagerId { get; set; }
      public bool IsAdmin { get; set; } = false;
      public bool CanOffboardResident { get; set; } = true;
      public bool CanOnboardResident { get; set; } = true;
      public bool CanAddNewApartment { get; set; } = true;
   }
}