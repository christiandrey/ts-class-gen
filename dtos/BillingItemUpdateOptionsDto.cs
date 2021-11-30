using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class BillingItemUpdateOptionsDto
   {
      public string Name { get; set; }
      public string Description { get; set; }
      public decimal? LocalUnitPrice { get; set; }
   }
}