using System.ComponentModel.DataAnnotations;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class CommissionUpdateOptionsDto
   {
      [Required]
      public CommissionType CommissionType { get; set; }
      [Required]
      public decimal Commission { get; set; }
   }
}