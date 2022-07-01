using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class MailTemplateDto
   {
      public string Content { get; set; }
      public EmailTemplateType EmailTemplate { get; set; }
   }
}