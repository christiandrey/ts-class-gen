using System;

namespace HealthGyro.Models.Dtos
{
   public class CalendarEventUpdateOptionsDto
   {
      public string Title { get; set; }
      public DateTime? StartAt { get; set; }
      public DateTime? EndAt { get; set; }
   }
}