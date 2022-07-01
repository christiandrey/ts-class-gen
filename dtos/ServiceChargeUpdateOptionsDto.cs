using System;
using System.ComponentModel.DataAnnotations;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class ServiceChargeUpdateOptionsDto
   {
      [Required]
      public decimal ServiceChargeAmount { get; set; }
      public Recurrence? ServiceChargeRecurrence { get; set; }
      public DateTime? ServiceChargeDueDate { get; set; }
   }
}