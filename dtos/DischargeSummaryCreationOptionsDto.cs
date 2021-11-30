using System;

namespace HealthGyro.Models.Dtos
{
   public class DischargeSummaryCreationOptionsDto
   {
      public DateTime? DischargedAt { get; set; }
      public string PresentingComplaints { get; set; }
      public string ComplaintHistory { get; set; }
      public string Investigations { get; set; }
      public string Diagnoses { get; set; }
      public string Management { get; set; }
      public string Complications { get; set; }
      public string Operations { get; set; }
      public string FutureManagement { get; set; }
   }
}