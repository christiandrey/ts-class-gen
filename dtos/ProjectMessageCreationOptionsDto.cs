using System.ComponentModel.DataAnnotations;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class ProjectMessageCreationOptionsDto
   {
      [Required]
      public string Body { get; set; }
      [Required]
      public string Hash { get; set; }
      public MessageType Type { get; set; } = MessageType.Text;
   }
}