using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using HealthGyro.Models.Dtos;
using HealthGyro.Models.Enums;
using HealthGyro.Models.Utilities.Response;
using HealthGyro.Services.Entities.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthGyro.Controllers
{
   [Authorize]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/invoices")]
   public class InvoiceController : BaseController
   {
      private readonly IInvoiceService _invoiceService;
      private readonly IMapper _mapper;

      public InvoiceController(
         IInvoiceService invoiceService,
         IMapper mapper) : base(mapper)
      {
         _invoiceService = invoiceService;
         _mapper = mapper;
      }

      [Authorize(Roles = nameof(UserRoleType.Medic))]
      [HttpPost("{id:guid}/items")]
      public async Task<ActionResult<Response<IEnumerable<InvoiceItemDto>>>> CreateAsync(Guid id, List<InvoiceItemCreationOptionsDto> items)
      {
         var userId = GetUserId();

         var invoiceItems = await _invoiceService.CreateInvoiceItemsAsync(id, userId, items);

         return Ok(invoiceItems.Select(o => _mapper.Map<InvoiceItemDto>(o)));
      }

      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<InvoiceDto>>> GetByIdAsync(Guid id)
      {
         var invoice = await _invoiceService.GetByIdAsync(id, true);

         return Ok(_mapper.Map<InvoiceDto>(invoice));
      }

      [Authorize(Roles = nameof(UserRoleType.NonMedic))]
      [HttpPut("{id:guid}/settle")]
      public async Task<ActionResult<Response<InvoiceDto>>> SettleInvoiceAsync(Guid id, InvoiceSettleOptionsDto options)
      {
         var userId = GetUserId();

         var invoice = await _invoiceService.SettleInvoiceAsync(id, userId, options);

         return Ok(_mapper.Map<InvoiceDto>(invoice));
      }

      [Authorize(Roles = nameof(UserRoleType.Medic))]
      [HttpDelete("{id:guid}/items/{itemId:guid}")]
      public async Task<ActionResult<Response>> DeleteInvoiceItemAsync(Guid id, Guid itemId)
      {
         var userId = GetUserId();

         await _invoiceService.DeleteInvoiceItemAsync(id, itemId, userId);

         return Ok();
      }
   }
}