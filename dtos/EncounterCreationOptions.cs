namespace HealthGyro.Models.Dtos
{
   public class EncounterCreationOptionsDto
   {
      public string PresentingComplaint { get; set; }
      public string ComplaintHistory { get; set; }
      public decimal WeightInKg { get; set; } = 0m;
      public decimal HeightInCm { get; set; } = 0m;
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