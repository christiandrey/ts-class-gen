using System;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class FluidReadingDto : BaseEntityDto
   {
      public DateTime RecordedAt { get; set; }
      public FluidReadingType Type { get; set; }
      public FluidReadingRoute Route { get; set; }
      public FluidReadingUnit Unit { get; set; }
      public decimal Quantity { get; set; }

   }
}