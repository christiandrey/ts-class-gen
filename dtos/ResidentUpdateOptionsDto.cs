using System;

namespace Caretaker.Models.Dtos
{
   public class ResidentUpdateOptionsDto
   {
      public string HouseNumber { get; set; }
      public DateTime? ServiceChargeDueDate { get; set; }
   }
}