using System.Collections.Generic;

namespace HealthGyro.Models.Dtos
{
   public class ChatDto : BaseEntityDto
   {
      public List<UserLiteDto> Users { get; set; }
      public ChatMessageDto LastMessage { get; set; }
      public TimeDuration TimeDuration { get; set; }
   }
}