using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class VendorInvitationCreationOptionsDto
   {
      [Required, EmailAddress]
      public string Email { get; set; }
      [Required]
      public Guid EstateId { get; set; }
      [Required, MinLength(1)]
      public List<Guid> ServicesIds { get; set; }
   }
}