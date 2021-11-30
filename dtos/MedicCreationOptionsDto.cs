using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class MedicCreationOptionsDto
   {
      [Required, DataType(DataType.EmailAddress)]
      public string Email { get; set; }
      [Required]
      public string FirstName { get; set; }
      [Required]
      public string LastName { get; set; }
      [Required]
      public string Designation { get; set; }
      public string RegistrationNumber { get; set; }
      [Required, MinLength(1)]
      public List<Guid> ServicesIds { get; set; }
   }
}