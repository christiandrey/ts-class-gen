using System;
using System.Collections.Generic;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class ProjectDto : ProjectLiteDto
   {
      public DateTime? DueDate { get; set; }
      public bool IsRated { get; set; }
      public VendorLiteDto Vendor { get; set; }
      public ResidentLiteDto Resident { get; set; }
      public PaymentLiteDto Payment { get; set; }
      public List<ProjectResourceDto> Resources { get; set; }
   }

   public class ProjectLiteDto : BaseEntityDto
   {
      public string Title { get; set; }
      public string Description { get; set; }
      public bool IsFacilityManagerRequest { get; set; }
      public bool IsMaintenance { get; set; }
      public bool IsPublic { get; set; }
      public ServiceCategoryDto Category { get; set; }
      public ProjectStatus Status { get; set; }
      public EstateLiteDto Estate { get; set; }
      public Guid? VendorId { get; set; }
      public Guid CategoryId { get; set; }
      public Guid ResidentId { get; set; }
      public Guid? PaymentId { get; set; }
      public Guid EstateId { get; set; }
   }
}