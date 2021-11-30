using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class UserSetupOptionsDto
   {
      [Required, DataType(DataType.Password)]
      public string Password { get; set; }
   }
}