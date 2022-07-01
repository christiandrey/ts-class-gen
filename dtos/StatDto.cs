using System;
using System.Collections.Generic;

namespace Caretaker.Models.Dtos
{
   public class StatDto
   {
      public DateTime StartDate { get; set; }
      public DateTime EndDate { get; set; }
      public List<PlotPointDto> Points { get; set; }
   }
}