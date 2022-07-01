using System.Collections.Generic;

namespace Caretaker.Models.Dtos
{
   public class OrganizationClaimUpdateOptionsDto
   {
      public string Name { get; set; }
      public List<string> Scopes { get; set; }
   }
}