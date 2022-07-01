using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class ApartmentTypeUpdateOptionsDto
   {
      public string Name { get; set; }
      public int? Quantity { get; set; }
      public string Description { get; set; }
      public decimal? ServiceChargeAmount { get; set; }
      public Recurrence? ServiceChargeRecurrence { get; set; }
      public int? Bedrooms { get; set; }
      public decimal? Size { get; set; }
   }
}