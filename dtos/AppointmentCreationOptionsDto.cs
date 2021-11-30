using System;
using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class AppointmentCreationOptionsDto
   {
      [Required]
      public Guid MedicId { get; set; }
      [Required]
      public DateTime StartAt { get; set; }
      [Required]
      public DateTime EndAt { get; set; }
   }
}