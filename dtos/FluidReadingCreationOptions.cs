using System;
using System.ComponentModel.DataAnnotations;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class FluidReadingCreationOptionsDto
   {
      public DateTime? RecordedAt { get; set; }
      [Required]
      public FluidReadingType Type { get; set; }
      [Required]
      public FluidReadingRoute Route { get; set; }
      [Required]
      public FluidReadingUnit Unit { get; set; }
      [Required]
      public decimal Quantity { get; set; }
   }
}