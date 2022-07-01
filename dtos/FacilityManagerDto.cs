using System;

namespace Caretaker.Models.Dtos
{
   public class FacilityManagerDto : BaseEntityDto
   {
      public Guid? MemberId { get; set; }
      public UserLiteDto User { get; set; }
   }
}