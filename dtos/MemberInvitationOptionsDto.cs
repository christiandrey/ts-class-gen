using System;
using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class MemberInvitationOptionsDto
   {
      [Required]
      public Guid FacilityManagerId { get; set; }
      public bool IsAdmin { get; set; } = false;
   }
}