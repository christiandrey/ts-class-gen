using System;
using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class ApartmentCreationOptionsDto
   {
      [Required]
      public string Label { get; set; }
      public Guid? OwnerId { get; set; }
      public Guid? EstateId { get; set; }
      [Required]
      public Guid TypeId { get; set; }
   }
}