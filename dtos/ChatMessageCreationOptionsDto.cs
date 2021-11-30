using System.ComponentModel.DataAnnotations;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class ChatMessageCreationOptionsDto
   {
      [Required]
      public string Body { get; set; }
      [Required]
      public string Hash { get; set; }
      public MessageType Type { get; set; } = MessageType.Text;
   }
}