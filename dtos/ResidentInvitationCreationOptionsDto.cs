using System;
using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class ResidentInvitationCreationOptionsDto
   {
      [Required, EmailAddress]
      public string Email { get; set; }
      public string HouseNumber { get; set; }
      public DateTime? ServiceChargeDueDate { get; set; }
      public Guid? ApartmentTypeId { get; set; }
      public Guid? ApartmentId { get; set; }
   }
}