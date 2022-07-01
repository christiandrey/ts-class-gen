using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class OrganizationClaimCreationOptionsDto
   {
      [Required]
      public string Name { get; set; }
      public List<string> Scopes { get; set; } = new List<string> { };
   }
}