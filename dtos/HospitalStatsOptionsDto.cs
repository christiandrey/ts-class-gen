using System;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class HospitalStatsOptionsDto
   {
      public TimeDuration TimeDuration { get; set; }
      public DateTime StartDate { get; set; }
   }
}