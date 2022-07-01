using System;

namespace Caretaker.Models.Dtos
{
   public class FacilityManagerLogDto : BaseEntityDto
   {
      public Guid FacilityManagerId { get; set; }
      public Guid EstateId { get; set; }
      public Guid UserId { get; set; }
   }
}