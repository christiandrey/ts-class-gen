using System;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class LogLiteDto
   {
      public Guid Id { get; set; }
      public string Message { get; set; }
      public LogLevel Level { get; set; }
      public DateTime Timestamp { get; set; }
   }

   public class LogDto : LogLiteDto
   {
      public string LogEvent { get; set; }
      public string MessageTemplate { get; set; }
      public string Exception { get; set; }
   }
}