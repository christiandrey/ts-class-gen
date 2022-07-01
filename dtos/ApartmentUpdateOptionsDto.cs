using System;

namespace Caretaker.Models.Dtos
{
   public class ApartmentUpdateOptionsDto
   {
      public string Label { get; set; }
      public Guid? TypeId { get; set; }
      public bool? IsNotInUse { get; set; }
   }
}