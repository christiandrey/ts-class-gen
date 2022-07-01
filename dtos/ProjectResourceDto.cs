using System;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class ProjectResourceDto : BaseEntityDto
   {
      public string Notes { get; set; }
      public string Url { get; set; }
      public ResourceType Type { get; set; }
      public Guid ProjectId { get; set; }
   }
}