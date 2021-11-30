using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class DataRangeUpdateOptionsDto
   {
      public string Name { get; set; }
      public decimal? LowerValue { get; set; }
      [Required]
      public decimal? UpperValue { get; set; }
      public string Unit { get; set; }
   }
}