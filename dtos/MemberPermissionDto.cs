using System;

namespace Caretaker.Models.Dtos
{
   public class MemberPermissionDto : BaseEntityDto
   {
      public bool CanOffboardResident { get; set; }
      public bool CanOnboardResident { get; set; }
      public bool CanAddNewApartment { get; set; }
   }
}