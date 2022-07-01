using System;

namespace Caretaker.Models.Dtos
{
   public class ServiceChargeLogDto : BaseEntityDto
   {
      public Guid ResidentId { get; set; }
      public Guid? ApartmentId { get; set; }
      public bool IsCredit { get; set; }
      public bool IsOpeningBalance { get; set; }
      public decimal Amount { get; set; }
      public string Description { get; set; }
   }
}