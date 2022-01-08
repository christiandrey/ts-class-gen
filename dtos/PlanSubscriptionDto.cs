using System;

namespace HealthGyro.Models.Dtos
{
   public class PlanSubscriptionDto : BaseEntityDto
   {
      public Guid HospitalId { get; set; }
      public Guid PaymentPlanId { get; set; }
      public DateTime ExpiresAt { get; set; }
      public int Medics { get; set; }
      public int NonMedics { get; set; }
      public int ExtraMedics { get; set; }
      public int ExtraNonMedics { get; set; }
   }
}