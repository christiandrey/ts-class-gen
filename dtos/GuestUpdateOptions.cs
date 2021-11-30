using System;

namespace HealthGyro.Models.Dtos
{
   public class GuestUpdateOptionsDto
   {
      public DateTime? AccessExpiresAt { get; set; }
      public bool? CanAccessAppointments { get; set; }
      public bool? CanAccessFinances { get; set; }
      public bool? CanAccessLabResults { get; set; }
      public bool? CanAccessMedication { get; set; }
   }
}