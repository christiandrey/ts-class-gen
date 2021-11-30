using System.Collections.Generic;

namespace HealthGyro.Models.Dtos
{
   public class MedicDto : BaseEntityDto
   {
      public string Designation { get; set; }
      public string RegistrationNumber { get; set; }
      public UserLiteDto User { get; set; }
      public HospitalDto Hospital { get; set; }
      public List<ServiceCategoryDto> Services { get; set; }
   }
}