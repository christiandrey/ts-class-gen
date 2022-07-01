using System;
using System.Collections.Generic;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class EstateUpdateOptionsDto
   {
      public string Name { get; set; }
      public string PlaceId { get; set; }
      public string ImageUrl { get; set; }
      public ApportionmentType? ApportionmentType { get; set; }
      public bool? ConcealResidentNames { get; set; }
      public List<Guid> UnavailableServicesWhenVacant { get; set; }
   }
}