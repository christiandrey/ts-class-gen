using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class InvoiceCreationOptionsDto
   {
      [Required, MinLength(1)]
      public List<InvoiceItemCreationOptionsDto> Items { get; set; }
   }
}