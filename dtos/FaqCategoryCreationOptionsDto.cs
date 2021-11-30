using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class FaqCategoryCreationOptionsDto
   {
      [Required]
      public string Name { get; set; }
   }
}