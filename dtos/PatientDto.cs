using System;

namespace HealthGyro.Models.Dtos
{
   public class PatientLiteDto : BaseEntityDto
   {
      public DateTime DateOfBirth { get; set; }
      public string AddressLine1 { get; set; }
      public string AddressLine2 { get; set; }
      public StateDto State { get; set; }
      public CountryDto Country { get; set; }
      public UserLiteDto User { get; set; }
   }

   public class PatientDto : PatientLiteDto
   {
      public PatientBiodataDto Biodata { get; set; }
      public PatientSocialHistoryDto SocialHistory { get; set; }
   }
}