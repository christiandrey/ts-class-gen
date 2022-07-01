using System;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class ProjectMessageDto : BaseEntityDto
   {
      public string Body { get; set; }
      public string Hash { get; set; }
      public MessageType Type { get; set; } = MessageType.Text;
      public Guid ProjectId { get; set; }
      public Guid UserId { get; set; }
   }
}