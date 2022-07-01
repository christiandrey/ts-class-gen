using System.ComponentModel.DataAnnotations;
using Caretaker.Common.Attributes;

namespace Caretaker.Models.Dtos
{
   public class RegisterDto
   {

      [Required, DataType(DataType.EmailAddress)]
      public string Email { get; set; }

      [Required]
      public string FirstName { get; set; }

      [Required]
      public string LastName { get; set; }

      [Required, PhoneNumber]
      public string PhoneNumber { get; set; }

      [Required, DataType(DataType.Password)]
      public string Password { get; set; }
   }
}
