using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class UpdatedCurrencyDto
   {
      [Required]
      public decimal ExchangeRate { get; set; }
      public bool IsActive { get; set; }
      public bool Override { get; set; }
      public bool IsDefault { get; set; }
   }
}