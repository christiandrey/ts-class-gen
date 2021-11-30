namespace HealthGyro.Models.Dtos
{
   public class LabScanDto : BaseEntityDto
   {
      public string Url { get; set; }
      public string PreviewUrl { get; set; }
      public string Notes { get; set; }
      public MedicDto Medic { get; set; }
      public NonMedicDto NonMedic { get; set; }
   }
}