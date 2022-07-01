using System;

namespace Caretaker.Models.Dtos
{
   public class CommunityCommentDto
   {
      public Guid Id { get; set; }
      public DateTime CreatedAt { get; set; }
      public string Body { get; set; }
      public string Hash { get; set; }
      public UserLiteDto User { get; set; }
      public Guid TopicId { get; set; }
      public Guid UserId { get; set; }
   }
}