using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class LabTestResultUpdateOptionsDto
   {
      [Required]
      public string Data { get; set; }
   }
}