using System.ComponentModel.DataAnnotations;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class LabTestResultCreationOptionsDto
   {
      [Required]
      public LabTestType Type { get; set; }
      public string Description { get; set; }
   }
}