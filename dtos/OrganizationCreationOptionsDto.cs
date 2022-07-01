using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class OrganizationCreationOptionsDto
   {
      [Required]
      public string Name { get; set; }
   }
}