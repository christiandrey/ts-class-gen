namespace HealthGyro.Models.Dtos
{
   public class EncounterUpdateOptionsDto
   {
      public string PresentingComplaint { get; set; }
      public string ComplaintHistory { get; set; }
      public decimal? WeightInKg { get; set; }
      public decimal? HeightInCm { get; set; }
      public string CardiovascularSystem { get; set; }
      public string RespiratorySystem { get; set; }
      public string GastrointestinalSystem { get; set; }
      public string GenitounirarySystem { get; set; }
      public string NeurologicalSystem { get; set; }
      public string Diagnosis { get; set; }
      public string Management { get; set; }
      public string Notes { get; set; }
   }
}