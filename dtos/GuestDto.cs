using System;

namespace HealthGyro.Models.Dtos
{
   public class GuestDto : BaseEntityDto
   {
      public bool IsActive { get; set; }
      public Guid PatientId { get; set; }
      public DateTime? AccessExpiresAt { get; set; }
      public bool CanAccessFinances { get; set; }
      public bool CanAccessMedication { get; set; }
      public bool CanAccessAppointments { get; set; }
      public bool CanAccessLabResults { get; set; }
      public UserLiteDto User { get; set; }
   }
}