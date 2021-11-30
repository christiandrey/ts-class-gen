using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class ManagerCreationOptionsDto
   {
      [Required, DataType(DataType.EmailAddress)]
      public string Email { get; set; }
      [Required]
      public string FirstName { get; set; }
      [Required]
      public string LastName { get; set; }
   }
}