namespace HealthGyro.Models.Dtos
{
   public class ManagerDto : BaseEntityDto
   {
      public string Designation { get; set; }
      public UserLiteDto User { get; set; }
      public HospitalDto Hospital { get; set; }
   }
}