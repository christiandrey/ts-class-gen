using System.ComponentModel.DataAnnotations;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class MemberRoleTypeUpdateOptionsDto
   {
      [Required]
      public MemberRoleType Role { get; set; }
   }
}