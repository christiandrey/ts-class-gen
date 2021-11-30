using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class LabScanCreationOptionsDto
   {
      [Required]
      public string Url { get; set; }
      public string PreviewUrl { get; set; }
   }
}