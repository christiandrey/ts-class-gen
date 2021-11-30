using System.ComponentModel.DataAnnotations;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class PaymentPlanCreationOptionsDto
   {
      [Required]
      public string Name { get; set; }
      public PaymentRecurrence Recurrence { get; set; } = PaymentRecurrence.Monthly;
      [Required]
      public int Medics { get; set; } = 0;
      [Required]
      public int NonMedics { get; set; } = 0;
      [Required]
      public decimal LocalPrice { get; set; }
      public decimal LocalPricePerMedic { get; set; } = 0m;
      public decimal LocalPricePerNonMedic { get; set; } = 0m;
   }
}