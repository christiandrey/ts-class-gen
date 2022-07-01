using System;

namespace Caretaker.Models.Dtos
{
   public class ResidentInvitationDto : BaseEntityDto
   {
      public string Email { get; set; }
      public bool Accepted { get; set; }
      public DateTime? AcceptedAt { get; set; }
      public Guid ApartmentId { get; set; }
      public Guid? EstateId { get; set; }
      public string EstateName { get; set; }
      public string EstateAddress { get; set; }
      public string FacilityManagerName { get; set; }
   }
}