using System;

namespace HealthGyro.Models.Dtos
{
   public class BaseEntityDto
   {
      public Guid? Id { get; set; }
      public DateTime CreatedAt { get; set; }
   }
}