using System;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class VitalReadingDto : BaseEntityDto
   {
      public int Pulse { get; set; }
      public int BloodPressureSystolic { get; set; }
      public int BloodPressureDiastolic { get; set; }
      public int RespiratoryRate { get; set; }
      public int OxygenSaturation { get; set; }
      public decimal TemperatureCelsius { get; set; }
      public AvpuScale Avpu { get; set; }
      public Guid EncounterId { get; set; }
   }
}