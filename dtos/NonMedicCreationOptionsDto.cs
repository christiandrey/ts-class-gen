using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class NonMedicCreationOptionsDto
   {
      [Required, DataType(DataType.EmailAddress)]
      public string Email { get; set; }
      [Required]
      public string FirstName { get; set; }
      [Required]
      public string LastName { get; set; }
      [Required]
      public string Designation { get; set; }
   }
}