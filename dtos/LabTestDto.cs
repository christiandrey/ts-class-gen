using System.Collections.Generic;

namespace HealthGyro.Models.Dtos
{
   public class LabTestDto : BaseEntityDto
   {
      public string Code { get; set; }
      public bool IsPublic { get; set; }
      public virtual List<LabTestResultDto> Results { get; set; }
   }
}