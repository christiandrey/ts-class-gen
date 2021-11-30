using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class VitalReadingCreationOptionsDto
   {
      public int Pulse { get; set; } = 0;
      public int BloodPressureSystolic { get; set; } = 0;
      public int BloodPressureDiastolic { get; set; } = 0;
      public int RespiratoryRate { get; set; } = 0;
      public int OxygenSaturation { get; set; } = 0;
      public decimal TemperatureCelsius { get; set; } = 0;
      public AvpuScale Avpu { get; set; }
   }
}