namespace HealthGyro.Models.Dtos
{
   public class PatientBiodataDto : BaseEntityDto
   {
      public string BloodGroup { get; set; }
      public string RhesusFactor { get; set; }
      public string Genotype { get; set; }
      public string Allergies { get; set; }
      public string Alerts { get; set; }
      public string Disabilities { get; set; }
      public string UnderlyingMedicalConditions { get; set; }
   }
}