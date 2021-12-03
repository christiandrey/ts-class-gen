using System;
using System.Linq;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using HealthGyro.Models.Dtos;
using HealthGyro.Models.Enums;
using HealthGyro.Models.Utilities.Response;
using HealthGyro.Services.EventEmitter;
using HealthGyro.Services.MailProvider;
using HealthGyro.Services.Template;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthGyro.Controllers
{
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/utilities")]
   public class UtilitiesController : BaseController
   {
      private readonly IEventEmitter _eventEmitter;
      private readonly ITemplateService _templateService;
      private readonly IMailProviderService _emailService;

      public UtilitiesController(
          IMapper mapper,
          IMailProviderService emailService,
          ITemplateService templateService,
          IEventEmitter eventEmitter) : base(mapper)
      {
         _emailService = emailService;
         _templateService = templateService;
         _eventEmitter = eventEmitter;
      }


      [HttpPost("notification")]
      [Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response>> DispatchEventAsync(EventDto eventDto)
      {
         await _eventEmitter.EmitGeneralEventAsync(eventDto.Title, eventDto.Body);

         return Ok();
      }

      [HttpPost("mail")]
      [Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response>> SendEmailAsync(MailingDto emailDto)
      {
         var mailAddresses = emailDto.Addresses.Select(x => new MailAddress(x.Email, x.Name)).ToList();

         if (!mailAddresses.Any())
         {
            return BadRequest();
         }

         await _emailService.SendAsync(mailAddresses, emailDto.Content, emailDto.Subject);

         return Ok();
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpGet("mail-templates"), ResponseCache(Duration = 120)]
      public async Task<ActionResult<Response<MailTemplateDto[]>>> GetEmailTemplatesAsync()
      {

         var mailTemplateTasks = Enum.GetNames(typeof(EmailTemplateType))
             .Select(async x =>
             {
                var mailTemplate = Enum.Parse<EmailTemplateType>(x);

                return new MailTemplateDto
                {
                   EmailTemplate = mailTemplate,
                   Content = await _templateService.RenderEmailContentAsync(mailTemplate)
                };
             })
             .ToList();

         var mailTemplates = await Task.WhenAll(mailTemplateTasks);

         return Ok(mailTemplates);
      }
   }
}