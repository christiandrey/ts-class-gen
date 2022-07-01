using System;
using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class CountryDto : UpdatedCountryDto
   {
      public Guid Id { get; set; }
      public string Name { get; set; }
      public bool IsActive { get; set; }
      public string TwoLetterISOName { get; set; }
      public string ThreeLetterISOName { get; set; }
   }

   public class UpdatedCountryDto
   {
      [Required]
      public decimal KmRadius { get; set; }
      [Required]
      public decimal UnitPrice { get; set; }
      [Required]
      public decimal HalfLife { get; set; }
   }
}