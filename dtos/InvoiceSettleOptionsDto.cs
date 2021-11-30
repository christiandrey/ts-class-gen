using System.ComponentModel.DataAnnotations;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class InvoiceSettleOptionsDto
   {
      [Required]
      public decimal LocalAmount { get; set; }
      [Required]
      public TransactionMode Mode { get; set; }
   }
}