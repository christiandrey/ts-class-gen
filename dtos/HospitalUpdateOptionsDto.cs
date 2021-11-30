using System;

namespace HealthGyro.Models.Dtos
{
   public class HospitalUpdateOptionsDto
   {
      public string Name { get; set; }
      public string ImageUrl { get; set; }
      public string AddressLine1 { get; set; }
      public string AddressLine2 { get; set; }
      public Guid? StateId { get; set; }
      public Guid? CountryId { get; set; }
   }
}