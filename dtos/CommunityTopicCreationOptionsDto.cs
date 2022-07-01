using System;
using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class CommunityTopicCreationOptionsDto
   {
      [Required]
      public string Name { get; set; }
      [Required]
      public string Description { get; set; }
      [Required]
      public Guid CategoryId { get; set; }
      [Required]
      public Guid EstateId { get; set; }
   }
}