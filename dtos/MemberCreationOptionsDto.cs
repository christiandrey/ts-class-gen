using System.ComponentModel.DataAnnotations;
using Caretaker.Common.Attributes;

namespace Caretaker.Models.Dtos
{
   public class MemberCreationOptionsDto
   {
      [Required]
      [PhoneNumberOrEmailAddress]
      public string Username { get; set; }
      [Required]
      public string Name { get; set; }
      public bool IsAdmin { get; set; } = false;
      public bool CanOffboardResident { get; set; } = true;
      public bool CanOnboardResident { get; set; } = true;
      public bool CanAddNewApartment { get; set; } = true;
   }
}