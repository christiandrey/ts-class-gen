using System;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class MedicationDto : BaseEntityDto
   {
      public string Name { get; set; }
      public string Instructions { get; set; }
      public string Dosage { get; set; }
      public MedicationFrequency Frequency { get; set; }
      public int FrequencyCount { get; set; }
      public string OtherFrequency { get; set; }
      public DateTime FirstDoseAt { get; set; }
      public DateTime? LastDoseAt { get; set; }
      public MedicDto Medic { get; set; }
   }
}