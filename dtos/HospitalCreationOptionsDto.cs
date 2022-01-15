using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class HospitalCreationOptionsDto
   {
      [Required]
      public string Name { get; set; }
      public string ImageUrl { get; set; }
      [Required]
      public string AddressLine1 { get; set; }
      public string AddressLine2 { get; set; }
      [Required]
      public Guid StateId { get; set; }
      [Required]
      public Guid CountryId { get; set; }
      [Required, DataType(DataType.EmailAddress)]
      public string ManagerEmail { get; set; }
      [Required]
      public string ManagerFirstName { get; set; }
      [Required]
      public string ManagerLastName { get; set; }
      [Required, MinLength(1)]
      public List<Guid> ServicesIds { get; set; }
   }
}