using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class MailTemplateDto
   {
      public string Content { get; set; }
      public EmailTemplateType EmailTemplate { get; set; }
   }
}