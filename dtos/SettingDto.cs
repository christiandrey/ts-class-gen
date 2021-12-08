using System;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class SettingDto : BaseEntityDto
   {
      public string Key { get; set; }
      public string Value { get; set; }
      public string Description { get; set; }
   }
}