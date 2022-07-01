using System;

namespace Caretaker.Models.Dtos
{
   public class BaseEntityDto
   {
      public Guid Id { get; set; }
      public DateTime CreatedAt { get; set; }
   }
}