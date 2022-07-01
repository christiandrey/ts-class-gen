using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class ProjectCreationOptionsDto
   {
      [Required]
      public string Title { get; set; }
      [Required]
      public string Description { get; set; }
      public bool IsMaintenance { get; set; }
      public bool IsPublic { get; set; }
      public DateTime? DueDate { get; set; }
      public Guid? VendorId { get; set; }
      [Required]
      public Guid CategoryId { get; set; }
      public List<ProjectResourceCreationOptionsDto> Resources { get; set; } = new List<ProjectResourceCreationOptionsDto>();
   }
}