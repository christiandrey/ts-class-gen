using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class ReviewOptionsDto
   {
      [Required, Range(1, 5)]
      public int Stars { get; set; }
      public string Body { get; set; }
   }
}