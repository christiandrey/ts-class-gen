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
   [Route("v{version:apiVersion}/transactions")]
   public class TransactionController : BaseController
   {
      private readonly ITransactionService _transactionService;
      private readonly IMapper _mapper;

      public TransactionController(ITransactionService transactionService, IMapper mapper) : base(mapper)
      {
         _transactionService = transactionService;
         _mapper = mapper;
      }

      [HttpGet("")]
      public async Task<ActionResult<PaginatedResponse<TransactionDto>>> GetTransactionsByUserAsync(int page = 1, int pageSize = 30, string query = null, DateTime? startDate = null, DateTime? endDate = null)
      {
         var userId = GetUserId();

         var transactions = await _transactionService.GetByUserAsync(userId, page, pageSize, query, startDate, endDate);

         return Paginated<Transaction, TransactionDto>(transactions);
      }

      [HttpGet("all"), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<PaginatedResponse<TransactionDto>>> GetTransactionsAsync(
          string query = null, int page = 1, int pageSize = 30, Guid? userId = null)
      {
         var transactions = !userId.HasValue
             ? await _transactionService.GetTransactionsAsync(page, pageSize, query)
             : await _transactionService.GetByUserAsync(userId.Value, page, pageSize, query);

         return Paginated<Transaction, TransactionDto>(transactions);
      }
   }
}