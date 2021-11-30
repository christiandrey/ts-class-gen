using System.ComponentModel.DataAnnotations;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class AppointmentStatusUpdateOptionsDto
   {
      [Required]
      public AppointmentStatus Status { get; set; }
   }
}