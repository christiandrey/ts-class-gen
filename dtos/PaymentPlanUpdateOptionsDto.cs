using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class PaymentPlanUpdateOptionsDto
   {
      public string Name { get; set; }
      public PaymentRecurrence? Recurrence { get; set; }
      public int? Medics { get; set; }
      public int? NonMedics { get; set; }
      public decimal? LocalPrice { get; set; }
      public decimal? LocalPricePerMedic { get; set; } = 0m;
      public decimal? LocalPricePerNonMedic { get; set; } = 0m;
   }
}