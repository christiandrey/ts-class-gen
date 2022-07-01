using System.ComponentModel.DataAnnotations;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class ProjectStatusUpdateDto
   {
      [Required]
      public ProjectStatus Status { get; set; }
   }
}