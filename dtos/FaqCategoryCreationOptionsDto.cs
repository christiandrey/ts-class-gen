using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class FaqCategoryCreationOptionsDto
   {
      [Required]
      public string Name { get; set; }
   }
}