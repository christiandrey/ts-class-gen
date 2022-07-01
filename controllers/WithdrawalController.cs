using System;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using Caretaker.Common.Constants;
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
   [Route("v{version:apiVersion}/withdrawals")]
   public class WithdrawalController : BaseController
   {
      private readonly IWithdrawalService _withdrawalService;
      private readonly IPaymentService _paymentService;
      private readonly ITransactionService _transactionService;
      private readonly IMapper _mapper;

      public WithdrawalController(
         IWithdrawalService withdrawalService,
         IPaymentService paymentService,
         ITransactionService transactionService,
         IMapper mapper) : base(mapper)
      {
         _withdrawalService = withdrawalService;
         _paymentService = paymentService;
         _transactionService = transactionService;
         _mapper = mapper;
      }

      [HttpGet("")]
      public async Task<ActionResult<PaginatedResponse<WithdrawalDto>>> GetWithdrawalsByUserAsync(int page = 1, int pageSize = 30)
      {
         var userId = GetUserId();

         var withdrawals = await _withdrawalService.GetByUserAsync(userId, page, pageSize);

         return Paginated<Withdrawal, WithdrawalDto>(withdrawals);
      }

      [HttpGet("all"), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<PaginatedResponse<AdminWithdrawalDto>>> GetWithdrawalsAsync(
          string query = null,
          int page = 1,
          int pageSize = 30)
      {
         var withdrawals = await _withdrawalService.GetWithdrawalsAsync(page, pageSize, query);

         return Paginated<Withdrawal, AdminWithdrawalDto>(withdrawals);
      }

      [HttpPut("fix-estates"), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response>> FixEstatesAsync()
      {
         var withdrawals = await _withdrawalService.GetWithdrawalsAsync();
         var withdrawalsToUpdate = new List<Withdrawal> { };

         foreach (var withdrawal in withdrawals)
         {
            var transaction = await _transactionService.GetByReferenceAsync(withdrawal.Reference);

            if (transaction != null)
            {
               var payment = await _paymentService.GetByTransactionAsync(transaction.Id);

               if (payment != null)
               {
                  withdrawal.EstateId = payment.EstateId;

                  withdrawalsToUpdate.Add(withdrawal);
               }
            }
         }

         await _withdrawalService.UpdateRangeAsync(withdrawalsToUpdate);

         return Ok();
      }

      [HttpGet("summary"), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response<WithdrawalSummaryDto>>> GetWithdrawalSummaryAsync()
      {
         var pendingAmount = await _withdrawalService.GetPendingAmountAsync();
         var paystackBalances = await _withdrawalService.GetPaystackBalanceAsync();
         var stripeBalances = await _withdrawalService.GetStripeBalanceAsync();

         return Ok(new WithdrawalSummaryDto
         {
            TotalPendingAmount = pendingAmount,
            PaystackBalance = paystackBalances,
            StripeBalance = stripeBalances
         });
      }

      [HttpPut("{id:guid}/cancel")]
      public async Task<ActionResult<Response<WithdrawalDto>>> CancelWithdrawalAsync(Guid id)
      {
         var userId = GetUserId();

         var withdrawal = await _withdrawalService.GetByIdAsync(id);

         if (withdrawal == null || withdrawal.UserId != userId || withdrawal.Status != WithdrawalStatus.Pending)
         {
            return NotFound(ResponseMessages.WithdrawalNotExist);
         }

         var payment = await _paymentService.GetByReferenceAsync(withdrawal.Reference);

         var cancelledWithdrawal = await _withdrawalService.CancelAsync(withdrawal, payment);

         return Ok(_mapper.Map<WithdrawalDto>(cancelledWithdrawal));
      }
   }
}