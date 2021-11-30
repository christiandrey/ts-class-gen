using System;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class ChatMessageDto : BaseEntityDto
   {
      public string Body { get; set; }
      public string Hash { get; set; }
      public MessageType Type { get; set; }
      public Guid ChatId { get; set; }
      public UserLiteDto User { get; set; }
   }
}