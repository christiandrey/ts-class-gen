using System;
using System.Collections.Generic;

namespace Caretaker.Models.Dtos
{
   public class ResidentDto : ResidentLiteDto
   {
      public DateTime? ServiceChargeDueDate { get; set; }
      public decimal ServiceChargeBalance { get; set; }
      public List<ServiceChargeLogDto> ServiceChargeLogs { get; set; }
   }

   public class ResidentLiteDto : BaseEntityDto
   {
      public bool IsOffboarded { get; set; }
      public DateTime? OffboardedAt { get; set; }
      public string EstateName { get; set; }
      public UserLiteDto User { get; set; }
      public Guid ApartmentId { get; set; }
   }
}