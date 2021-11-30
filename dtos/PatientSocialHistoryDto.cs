using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class PatientSocialHistoryDto : BaseEntityDto
   {
      public bool Smoker { get; set; }
      public int SmokingDuration { get; set; }
      public TimeDuration SmokingDurationUnit { get; set; }
      public int DailySmokingFrequency { get; set; }
      public string Occupation { get; set; }
   }
}