using System;
using System.Collections.Generic;
using System.Linq;
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
   [Route("v{version:apiVersion}/bank-accounts")]
   public class BankAccountController : BaseController
   {
      private readonly IBankAccountService _bankAccountService;
      private readonly ICurrencyService _currencyService;
      private readonly ITransactionService _transactionService;
      private readonly IUserService _userService;
      private readonly IWalletService _walletService;
      private readonly IMapper _mapper;

      public BankAccountController(
         IBankAccountService bankAccountService,
         ICurrencyService currencyService,
         ITransactionService transactionService,
         IUserService userService,
         IWalletService walletService,
         IMapper mapper) : base(mapper)
      {
         _bankAccountService = bankAccountService;
         _currencyService = currencyService;
         _transactionService = transactionService;
         _userService = userService;
         _walletService = walletService;
         _mapper = mapper;
      }

      [HttpGet("")]
      public async Task<ActionResult<Response<IEnumerable<BankAccountDto>>>> GetBankAccountsAsync()
      {
         var userId = GetUserId();

         var bankAccounts = await _bankAccountService.GetByUserAsync(userId);

         return Ok(bankAccounts.Select(o => _mapper.Map<BankAccountDto>(o)));
      }

      [HttpPost("")]
      public async Task<ActionResult<Response<BankAccountDto>>> CreateBankAccountAsync(BankAccountCreationOptionsDto dto)
      {
         var userId = GetUserId();

         var bankAccount = await _bankAccountService.CreateBankAccountAsync(_mapper.Map<BankAccount>(dto), userId);

         return Ok(_mapper.Map<BankAccountDto>(bankAccount));
      }

      [HttpPost("{bankAccountId:guid}/withdraw/{localAmount:decimal}")]
      public async Task<ActionResult<Response<TransactionDto>>> WithdrawToBankAccountAsync(Guid bankAccountId, decimal localAmount)
      {
         var userId = GetUserId();

         var currency = await _currencyService.GetByRegionCodeOrDefaultAsync();

         var currencyToBaseExchangeRate = _currencyService.GetCurrencyToBaseExchangeRate(currency);

         var amount = localAmount * currencyToBaseExchangeRate;

         var wallet = await _userService.GetWalletAsync(userId);

         _walletService.AssertSufficientBalance(wallet, amount);

         var reference = await _bankAccountService.CreditBankAccountAsync(userId, amount, bankAccountId);

         var transaction = await _transactionService.CreateAsync(userId, amount, TransactionDescriptions.Withdrawal, reference, TransactionMode.BankTransfer, true);

         await _walletService.TransferFromWalletToLockedWalletAsync(wallet, amount);

         return Ok(_mapper.Map<TransactionDto>(transaction));
      }

      [HttpDelete("{bankAccountId:guid}")]
      public async Task<ActionResult<Response>> DeleteBankAccountAsync(Guid bankAccountId)
      {
         await _bankAccountService.DeleteAsync(bankAccountId);

         return Ok();
      }
   }
}