using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class UpdatedUserDto
   {
      public Gender Gender { get; set; }
      public string LastName { get; set; }
      public string FirstName { get; set; }
      public string ImageUrl { get; set; }
   }
}