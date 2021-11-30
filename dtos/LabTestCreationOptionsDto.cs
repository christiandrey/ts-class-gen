using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class LabTestCreationOptionsDto
   {
      [Required, MinLength(1)]
      public List<LabTestResultCreationOptionsDto> Results { get; set; }
   }
}