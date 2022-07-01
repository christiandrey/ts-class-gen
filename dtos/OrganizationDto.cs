using System;
using System.Collections.Generic;

namespace Caretaker.Models.Dtos
{
   public class OrganizationDto : BaseEntityDto
   {
      public string Name { get; set; }
      public List<MemberLiteDto> Members { get; set; }
   }
}