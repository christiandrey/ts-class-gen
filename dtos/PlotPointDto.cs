using System;
using Caretaker.Common.Models;

namespace Caretaker.Models.Dtos
{
   public class PlotPointDto
   {
      public DateTime Label { get; set; }
      public decimal Value { get; set; }

      public PlotPointDto(PlotPoint plotPoint)
      {
         Label = plotPoint.Label;
         Value = plotPoint.Value;
      }
   }
}