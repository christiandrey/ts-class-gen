using Caretaker.Models.Enums;
using System;
using System.Collections.Generic;

namespace Caretaker.Models.Dtos
{
   public class ApartmentTypeDto : BaseEntityDto
   {
      public string Name { get; set; }
      public string Code { get; set; }
      public int Quantity { get; set; }
      public string Description { get; set; }
      public decimal ServiceChargeAmount { get; set; }
      public Recurrence ServiceChargeRecurrence { get; set; }
      public int Bedrooms { get; set; }
      public decimal Size { get; set; }
      public Guid? EstateId { get; set; }
      public List<ServiceCategoryDto> Services { get; set; }
   }
}
