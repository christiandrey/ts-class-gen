using System;

namespace HealthGyro.Models.Dtos
{
   public class HospitalDto : BaseEntityDto
   {
      public string Name { get; set; }
      public string Code { get; set; }
      public string ImageUrl { get; set; }
      public Guid ManagerId { get; set; }
      public string AddressLine1 { get; set; }
      public string AddressLine2 { get; set; }
      public StateDto State { get; set; }
      public CountryDto Country { get; set; }
   }
}