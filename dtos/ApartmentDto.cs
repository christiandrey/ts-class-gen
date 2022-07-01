using System;

namespace Caretaker.Models.Dtos
{
   public class ApartmentDto : ApartmentLiteDto
   {
      public OwnerDto Owner { get; set; }
      public ApartmentTypeDto Type { get; set; }
      public EstateLiteDto Estate { get; set; }
      public new ResidentDto CurrentResident { get; set; }
   }

   public class ApartmentLiteDto : BaseEntityDto
   {
      public string Label { get; set; }
      public bool IsNotInUse { get; set; }
      public bool IsVacant { get; set; }
      public decimal ServiceChargeBalance { get; set; }
      public Guid? OwnerId { get; set; }
      public Guid? EstateId { get; set; }
      public Guid TypeId { get; set; }
      public ResidentLiteDto CurrentResident { get; set; }
   }
}
