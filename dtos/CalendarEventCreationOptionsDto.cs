using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class CalendarEventCreationOptionsDto
   {
      [Required]
      public string Title { get; set; }
      public CalendarEventType Type { get; set; } = CalendarEventType.Personal;
      [Required]
      public DateTime StartAt { get; set; }
      [Required]
      public DateTime EndAt { get; set; }
      public List<Guid> ParticipantsIds { get; set; } = new List<Guid> { };
   }
}