using System.ComponentModel.DataAnnotations;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class ProjectResourceCreationOptionsDto
   {
      public string Notes { get; set; }
      [Required]
      public string Url { get; set; }
      public ResourceType Type { get; set; } = ResourceType.Photo;
   }
}