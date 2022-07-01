using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class ApartmentTypeCreationOptionsDto
   {
      [Required]
      public string Name { get; set; }
      public int Quantity { get; set; } = 0;
      public string Description { get; set; }
      public decimal ServiceChargeAmount { get; set; } = 0m;
      public Recurrence ServiceChargeRecurrence { get; set; }
      [Required]
      public int Bedrooms { get; set; } = 0;
      [Required]
      public decimal Size { get; set; }
      public Guid? EstateId { get; set; }
      public List<Guid> ServicesIds { get; set; } = new List<Guid>();
   }
}