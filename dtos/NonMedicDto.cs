namespace HealthGyro.Models.Dtos
{
   public class NonMedicDto : BaseEntityDto
   {
      public string Designation { get; set; }
      public UserLiteDto User { get; set; }
      public HospitalDto Hospital { get; set; }
   }
}