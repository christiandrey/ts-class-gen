namespace Caretaker.Models.Dtos
{
   public class MemberPermissionUpdateOptionsDto
   {
      public bool? CanOffboardResident { get; set; }
      public bool? CanOnboardResident { get; set; }
      public bool? CanAddNewApartment { get; set; }
   }
}