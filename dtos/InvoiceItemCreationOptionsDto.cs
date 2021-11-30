using System;
using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class InvoiceItemCreationOptionsDto
   {
      [Required]
      public Guid BillingItemId { get; set; }
      public int Quantity { get; set; } = 1;
   }
}