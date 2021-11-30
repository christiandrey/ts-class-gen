using System;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class LabTestResultDto : BaseEntityDto
   {
      public Guid LabTestId { get; set; }
      public LabTestType Type { get; set; }
      public string Description { get; set; }
      public string Data { get; set; }
      public NonMedicDto NonMedic { get; set; }
   }
}