using System;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class PatientUpdateOptionsDto
   {
      public DateTime? DateOfBirth { get; set; }
      public string AddressLine1 { get; set; }
      public string AddressLine2 { get; set; }
      public Guid? StateId { get; set; }
      public Guid? CountryId { get; set; }
   }

   public class PatientBiodataUpdateOptionsDto
   {
      public string BloodGroup { get; set; }
      public string RhesusFactor { get; set; }
      public string Genotype { get; set; }
      public string Allergies { get; set; }
      public string Alerts { get; set; }
      public string Disabilities { get; set; }
      public string UnderlyingMedicalConditions { get; set; }
   }

   public class PatientSocialHistoryUpdateOptionsDto
   {
      public bool? Smoker { get; set; }
      public int? SmokingDuration { get; set; }
      public TimeDuration? SmokingDurationUnit { get; set; }
      public int? DailySmokingFrequency { get; set; }
      public string Occupation { get; set; }
   }
}