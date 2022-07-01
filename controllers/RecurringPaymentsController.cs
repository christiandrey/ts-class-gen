using System;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using Caretaker.Models.Dtos;
using Caretaker.Models.Entities;
using Caretaker.Models.Enums;
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Entities.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Caretaker.Controllers
{
   [Authorize]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/recurring-payments")]
   public class RecurringPaymentsController : BaseController
   {
      private readonly IRecurringPaymentService _recurringPaymentService;
      private readonly IMapper _mapper;

      public RecurringPaymentsController(IRecurringPaymentService recurringPaymentService, IMapper mapper) : base(mapper)
      {
         _recurringPaymentService = recurringPaymentService;
         _mapper = mapper;
      }

      [HttpGet("")]
      public async Task<ActionResult<PaginatedResponse<RecurringPaymentDto>>> GetRecurringPaymentsByUserAsync(int page = 1, int pageSize = 30)
      {
         var userId = GetUserId();

         var recurringPayments = await _recurringPaymentService.GetByUserAsync(userId, page, pageSize);

         return Paginated<RecurringPayment, RecurringPaymentDto>(recurringPayments);
      }

      [HttpGet("all"), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<PaginatedResponse<RecurringPaymentDto>>> GetRecurringPaymentssAsync(
          string query = null, int page = 1, int pageSize = 30, Guid? userId = null)
      {
         var recurringPayments = !userId.HasValue
             ? await _recurringPaymentService.GetAllAsync(page, pageSize)
             : await _recurringPaymentService.GetByUserAsync(userId.Value, page, pageSize);

         return Paginated<RecurringPayment, RecurringPaymentDto>(recurringPayments);
      }

      [HttpPost("{id:guid}/execute")]
      public async Task<ActionResult<Response<PaymentDto>>> ExecuteRecurringPaymentAsync(Guid id)
      {
         var userId = GetUserId();

         var payment = await _recurringPaymentService.ExecuteByUserAsync(id, userId);

         return Ok(_mapper.Map<PaymentDto>(payment));
      }

      [HttpDelete("{id:guid}")]
      public async Task<ActionResult<Response>> DeleteRecurringPaymentAsync(Guid id)
      {
         var userId = GetUserId();

         await _recurringPaymentService.DeleteByIdAsync(id, userId);

         return Ok();
      }
   }
}