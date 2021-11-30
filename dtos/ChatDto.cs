using System.Collections.Generic;

namespace HealthGyro.Models.Dtos
{
   public class ChatDto : ChatLiteDto
   {
      public List<UserLiteDto> Users { get; set; }
      public ChatMessageDto LastMessage { get; set; }
   }

   public class ChatLiteDto : BaseEntityDto
   {
      public TimeDuration TimeDuration { get; set; }
   }
}