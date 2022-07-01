using System;
using System.Collections.Generic;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class EstateDto : EstateLiteDto
   {
      public FacilityManagerDto FacilityManager { get; set; }
      public OrganizationDto Organization { get; set; }
      public List<Guid> UnavailableServicesWhenVacant { get; set; }
      public List<ApartmentTypeDto> ApartmentTypes { get; set; }
      public List<ServiceCategoryDto> Services { get; set; }
   }

   public class EstateLiteDto : BaseEntityDto
   {
      public string FacilityManagerName { get; set; }
      public string FacilityManagerFullName { get; set; }
      public ApportionmentType ApportionmentType { get; set; }
      public CommissionType CommissionType { get; set; }
      public decimal Commission { get; set; }
      public bool ConcealResidentNames { get; set; }
      public string Name { get; set; }
      public string Code { get; set; }
      public string ImageUrl { get; set; }
      public LocationDto Address { get; set; }
      public Guid? MemberId { get; set; }
      public Guid? OrganizationId { get; set; }
   }
}