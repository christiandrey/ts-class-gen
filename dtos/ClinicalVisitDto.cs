using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class ClinicalVisitDto : BaseEntityDto
   {
      public ClinicalVisitType Type { get; set; }
      public InvoiceLiteDto Invoice { get; set; }
      public DischargeSummaryDto DischargeSummary { get; set; }
   }
}