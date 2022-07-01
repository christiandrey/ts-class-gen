using System;
using System.Collections.Generic;

namespace Caretaker.Models.Dtos
{
   public class CommunityCategoryDto
   {
      public Guid Id { get; set; }
      public DateTime CreatedAt { get; set; }
      public string Name { get; set; }
      public string Color { get; set; }
      public List<CommunityTopicDto> Topics { get; set; }
   }
}