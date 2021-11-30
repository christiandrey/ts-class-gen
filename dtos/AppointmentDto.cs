using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class AppointmentDto : BaseEntityDto
   {
      public AppointmentStatus Status { get; set; }
      public CalendarEventDto CalendarEvent { get; set; }
      public PatientLiteDto Patient { get; set; }
      public MedicDto Medic { get; set; }
   }
}