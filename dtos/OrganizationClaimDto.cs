using System;
using System.Collections.Generic;

namespace Caretaker.Models.Dtos
{
   public class OrganizationClaimDto : BaseEntityDto
   {
      public string Name { get; set; }
      public Guid OrganizationId { get; set; }
      public List<string> Scopes { get; set; } = new List<string> { };
   }
}