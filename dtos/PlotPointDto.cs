using HealthGyro.Common.Models;

namespace HealthGyro.Models.Dtos
{
   public class PlotPointDto
   {
      public int Label { get; set; }
      public decimal Value { get; set; }

      public PlotPointDto(PlotPoint plotPoint)
      {
         Label = plotPoint.Label;
         Value = plotPoint.Value;
      }
   }
}