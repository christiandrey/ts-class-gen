using System.ComponentModel.DataAnnotations;
using Caretaker.Common.Attributes;

namespace Caretaker.Models.Dtos
{
   public class VerifyPhoneDto
   {
      [Required]
      [PhoneNumber]
      public string PhoneNumber { get; set; }
      [Required]
      public string Code { get; set; }
   }
}
