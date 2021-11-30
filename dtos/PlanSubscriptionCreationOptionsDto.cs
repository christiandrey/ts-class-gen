using System;
using System.ComponentModel.DataAnnotations;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class PlanSubscriptionCreationOptionsDto
   {
      [Required]
      public Guid PaymentPlanId { get; set; }
      [Required]
      public string TransactionReference { get; set; }
      public PaymentGateway Gateway { get; set; } = PaymentGateway.Paystack;
   }
}