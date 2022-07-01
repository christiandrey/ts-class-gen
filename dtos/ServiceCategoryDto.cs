using System;

namespace Caretaker.Models.Dtos
{
   public class ServiceCategoryDto
   {
      public Guid Id { get; set; }
      public string Name { get; set; }
      public bool IsPaymentOnly { get; set; }
   }
}