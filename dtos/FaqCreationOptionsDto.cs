using System;
using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class FaqCreationOptionsDto
   {
      [Required]
      public string Title { get; set; }
      [Required]
      public string Description { get; set; }
      public string ImageUrl { get; set; }
      [Required]
      public Guid FaqCategoryId { get; set; }
   }
}