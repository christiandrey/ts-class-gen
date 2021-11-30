using System;
using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class GuestCreationOptionsDto
   {
      [Required, DataType(DataType.EmailAddress)]
      public string Email { get; set; }
      [Required]
      public string FirstName { get; set; }
      [Required]
      public string LastName { get; set; }
      public DateTime? AccessExpiresAt { get; set; }
      public bool CanAccessFinances { get; set; }
      public bool CanAccessMedication { get; set; }
      public bool CanAccessAppointments { get; set; }
      public bool CanAccessLabResults { get; set; }
   }
}