using System;
using System.ComponentModel.DataAnnotations;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class MedicationCreationOptionsDto
   {
      [Required]
      public string Name { get; set; }
      public string Instructions { get; set; }
      [Required]
      public string Dosage { get; set; }
      [Required]
      public MedicationFrequency Frequency { get; set; }
      public int FrequencyCount { get; set; }
      public string OtherFrequency { get; set; }
      [Required]
      public DateTime FirstDoseAt { get; set; }
      public DateTime? LastDoseAt { get; set; }
   }
}