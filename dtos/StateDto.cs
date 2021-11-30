using System;

namespace HealthGyro.Models.Dtos
{
   public class StateDto
   {
      public Guid Id { get; set; }
      public string Name { get; set; }
      public bool IsActive { get; set; }
      public string TwoLetterISOCountryName { get; set; }
   }
}