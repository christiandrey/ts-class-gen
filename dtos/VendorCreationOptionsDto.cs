using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class VendorCreationOptionsDto
   {
      [Required, MinLength(1)]
      public List<Guid> ServicesIds { get; set; }
   }
}