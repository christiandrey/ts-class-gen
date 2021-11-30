using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class BillingItemCreationOptionsDto
   {
      [Required]
      public string Name { get; set; }
      public string Description { get; set; }
      [Required]
      public decimal LocalUnitPrice { get; set; }
   }
}