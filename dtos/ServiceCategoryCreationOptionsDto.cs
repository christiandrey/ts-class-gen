using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class ServiceCategoryCreationOptionsDto
   {
      [Required]
      public string Name { get; set; }
   }
}