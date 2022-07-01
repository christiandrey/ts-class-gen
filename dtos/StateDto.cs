using System;
using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class StateDto : UpdatedStateDto
   {
      public Guid Id { get; set; }
      public string Name { get; set; }
      public bool IsActive { get; set; }
      public string TwoLetterISOCountryName { get; set; }
   }

   public class UpdatedStateDto
   {
      [Required]
      public decimal KmRadius { get; set; }
      [Required]
      public decimal KmBaseDistance { get; set; }
      [Required]
      public decimal UnitPrice { get; set; }
      [Required]
      public decimal BaseUnitPrice { get; set; }
      [Required]
      public decimal IntraUnitPrice { get; set; }
      [Required]
      public decimal HalfLife { get; set; }
   }
}