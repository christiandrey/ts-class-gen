using System;

namespace Caretaker.Models.Dtos
{
   public class CommunityTopicDto
   {
      public Guid Id { get; set; }
      public DateTime CreatedAt { get; set; }
      public string Name { get; set; }
      public string Description { get; set; }
      public UserLiteDto User { get; set; }
      public Guid CategoryId { get; set; }
      public int CommentsCount { get; set; }
   }
}