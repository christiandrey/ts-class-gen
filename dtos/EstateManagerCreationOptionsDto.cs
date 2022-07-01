using System;
using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Services.Management
{
   public class EstateManagerCreationOptionsDto
   {
      [Required]
      public Guid MemberId { get; set; }
      [Required]
      public Guid OrganizationClaimId { get; set; }
   }
}