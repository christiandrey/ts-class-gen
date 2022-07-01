using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class MessagingDto
   {
      [Required]
      public string Content { get; set; }
      [Required]
      public IEnumerable<string> PhoneNumbers { get; set; }
   }
}