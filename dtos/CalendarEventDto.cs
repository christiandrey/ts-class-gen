using System;
using System.Collections.Generic;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class CalendarEventDto : BaseEntityDto
   {
      public string Title { get; set; }
      public CalendarEventType Type { get; set; }
      public DateTime StartAt { get; set; }
      public DateTime EndAt { get; set; }
      public List<UserLiteDto> Participants { get; set; }
   }
}