using System;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class PaymentPlanDto : BaseEntityDto
   {
      public string Name { get; set; }
      public PaymentRecurrence Recurrence { get; set; }
      public int Medics { get; set; }
      public int NonMedics { get; set; }
      public decimal Price { get; set; }
      public decimal PricePerMedic { get; set; }
      public decimal PricePerNonMedic { get; set; }
   }
}