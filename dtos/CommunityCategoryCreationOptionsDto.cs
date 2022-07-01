using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class CommunityCategoryCreationOptionsDto
   {
      [Required]
      public string Name { get; set; }
      [Required]
      public string Color { get; set; }
   }
}