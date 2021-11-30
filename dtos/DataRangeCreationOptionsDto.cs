using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class DataRangeCreationOptionsDto
   {
      [Required]
      public string Name { get; set; }
      [Required]
      public decimal LowerValue { get; set; }
      [Required]
      public decimal UpperValue { get; set; }
      public string Unit { get; set; }
   }
}