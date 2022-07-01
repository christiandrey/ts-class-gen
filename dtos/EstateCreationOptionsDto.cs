using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class EstateCreationOptionsDto
   {
      [Required]
      public string Name { get; set; }
      [Required]
      public string PlaceId { get; set; }
      public string ImageUrl { get; set; }
      public ApportionmentType ApportionmentType { get; set; } = ApportionmentType.Size;
      [Required, MinLength(1)]
      public List<Guid> ServicesIds { get; set; }
   }
}