using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class ServiceCategoryCreationOptionsDto
   {
      [Required]
      public string Name { get; set; }
      public bool IsPaymentOnly { get; set; } = false;
   }
}