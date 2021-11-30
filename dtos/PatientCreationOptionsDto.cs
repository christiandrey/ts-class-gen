using System;
using System.ComponentModel.DataAnnotations;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class PatientCreationOptionsDto
   {
      [Required, DataType(DataType.EmailAddress)]
      public string Email { get; set; }
      [Required]
      public string FirstName { get; set; }
      [Required]
      public string LastName { get; set; }
      [Required]
      public DateTime DateOfBirth { get; set; }
      [Required]
      public string AddressLine1 { get; set; }
      public string AddressLine2 { get; set; }
      [Required]
      public Guid StateId { get; set; }
      [Required]
      public Guid CountryId { get; set; }
      [Required]
      public PatientBiodataCreationOptionsDto Biodata { get; set; }
      [Required]
      public PatientSocialHistoryCreationOptionsDto SocialHistory { get; set; }
   }

   public class PatientBiodataCreationOptionsDto
   {
      public string BloodGroup { get; set; }
      public string RhesusFactor { get; set; }
      public string Genotype { get; set; }
      public string Allergies { get; set; }
      public string Alerts { get; set; }
      public string Disabilities { get; set; }
      public string UnderlyingMedicalConditions { get; set; }
   }

   public class PatientSocialHistoryCreationOptionsDto
   {
      public bool Smoker { get; set; }
      public int SmokingDuration { get; set; } = 0;
      public TimeDuration SmokingDurationUnit { get; set; } = TimeDuration.None;
      public int DailySmokingFrequency { get; set; } = 0;
      public string Occupation { get; set; }
   }
}