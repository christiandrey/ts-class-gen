using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class EventDto
   {
      [Required]
      public string Title { get; set; }
      [Required]
      public string Body { get; set; }
   }
}