using System.Collections.Generic;

namespace Caretaker.Models.Dtos
{
   public class VendorDto : VendorLiteDto
   {
      public List<EstateLiteDto> Estates { get; set; }
   }

   public class VendorLiteDto : BaseEntityDto
   {
      public double AverageStars { get; set; }
      public UserLiteDto User { get; set; }
      public List<ServiceCategoryDto> Services { get; set; }
   }
}