using System;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class NotificationDto
   {
      public Guid Id { get; set; }
      public DateTime CreatedAt { get; set; }
      public string Title { get; set; }
      public string Body { get; set; }
      public NotificationType Type { get; set; }
      public Guid? DataId { get; set; }
      public Guid? DataParentId { get; set; }
      public string DataImageUrl { get; set; }
      public Guid UserId { get; set; }
   }
}