using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class EventDto
   {
      [Required]
      public string Title { get; set; }
      [Required]
      public string Body { get; set; }
   }
}