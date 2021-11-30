using System;

namespace HealthGyro.Models.Dtos
{
   public class CountryDto
   {
      public Guid Id { get; set; }
      public string Name { get; set; }
      public bool IsActive { get; set; }
      public string TwoLetterISOName { get; set; }
      public string ThreeLetterISOName { get; set; }
   }
}