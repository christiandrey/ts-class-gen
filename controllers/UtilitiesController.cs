﻿using System;
using System.Linq;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using Caretaker.Models.Dtos;
using Caretaker.Models.Enums;
using Caretaker.Models.Utilities.Response;
using Caretaker.Common.Extensions;
using Caretaker.Services.EventEmitter;
using Caretaker.Services.MailProvider;
using Caretaker.Services.MessagingProvider;
using Caretaker.Services.Template;
using Caretaker.Services.Utilities.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Caretaker.Controllers
{
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/utilities")]
   public class UtilitiesController : BaseController
   {
      private readonly IEventEmitter _eventEmitter;
      private readonly IDataMigrationService _dataMigrationService;
      private readonly ITemplateService _templateService;
      private readonly IMailProviderService _emailService;
      private readonly IMessagingProviderService _messagingService;

      public UtilitiesController(
          IMapper mapper,
          IMailProviderService emailService,
          IMessagingProviderService messagingService,
          ITemplateService templateService,
          IDataMigrationService dataMigrationService,
          IEventEmitter eventEmitter) : base(mapper)
      {
         _emailService = emailService;
         _dataMigrationService = dataMigrationService;
         _messagingService = messagingService;
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

      [HttpPost("message")]
      [Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response>> SendMessageAsync(MessagingDto messagingDto)
      {
         var recipients = messagingDto.PhoneNumbers.Where(o => o.IsPhoneNumber());

         if (!recipients.Any())
         {
            return BadRequest();
         }

         await _messagingService.SendAsync(recipients, messagingDto.Content);

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

      [HttpPost("migrate/payment-accounts")]
      [Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response>> MigrateToPaymentAccountsAsync()
      {
         await _dataMigrationService.MigrateToPaymentAccountsAsync();

         return Ok();
      }

      [HttpPost("migrate/claims")]
      [Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response>> MigrateToClaimsSystemAsync()
      {
         await _dataMigrationService.MigrateToClaimsSystemAsync();

         return Ok();
      }
   }
}