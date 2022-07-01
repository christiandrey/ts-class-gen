using System;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using Caretaker.Common.Constants;
using Caretaker.Models.Dtos;
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
   [Route("v{version:apiVersion}/wallets")]
   public class WalletController : BaseController
   {
      private readonly ITransactionService _transactionService;
      private readonly IUserService _userService;
      private readonly IWalletService _walletService;
      private readonly IMapper _mapper;

      public WalletController(
         ITransactionService transactionService,
         IUserService userService,
         IWalletService walletService,
         IMapper mapper) : base(mapper)
      {
         _transactionService = transactionService;
         _userService = userService;
         _walletService = walletService;
         _mapper = mapper;
      }

      [HttpGet("")]
      public async Task<ActionResult<Response<WalletDto>>> GetWalletAsync()
      {
         var userId = GetUserId();

         var wallet = await _userService.GetWalletAsync(userId);

         return Ok(_mapper.Map<WalletDto>(wallet));
      }

      [HttpGet("{userId:guid}")]
      [Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response<WalletDto>>> GetUserWalletAsync(Guid userId)
      {
         var wallet = await _userService.GetWalletAsync(userId);

         return Ok(_mapper.Map<WalletDto>(wallet));
      }

      [HttpPut("{userId:guid}/credit")]
      [Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response<WalletDto>>> CreditUserWalletAsync(Guid userId, decimal amount)
      {
         var wallet = await _userService.GetWalletAsync(userId);

         wallet = await _walletService.CreditAsync(wallet, amount);

         await _transactionService.CreateAsync(userId, amount, TransactionDescriptions.Topup, true);

         return Ok(_mapper.Map<WalletDto>(wallet));
      }

      [HttpPut("{userId:guid}/debit")]
      [Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response<WalletDto>>> DebitUserWalletAsync(Guid userId, decimal amount)
      {
         var wallet = await _userService.GetWalletAsync(userId);

         wallet = await _walletService.DebitAsync(wallet, amount);

         await _transactionService.CreateAsync(userId, amount, TransactionDescriptions.Withdrawal);

         return Ok(_mapper.Map<WalletDto>(wallet));
      }

      [HttpPut("{userId:guid}/lock")]
      [Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response<WalletDto>>> LockUserWalletAsync(Guid userId, decimal amount)
      {
         var wallet = await _userService.GetWalletAsync(userId);

         await _walletService.TransferFromWalletToLockedWalletAsync(wallet, amount);

         await _transactionService.CreateAsync(userId, amount, TransactionDescriptions.Debit);

         return Ok(_mapper.Map<WalletDto>(wallet));
      }

      [HttpPut("{userId:guid}/unlock")]
      [Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response<WalletDto>>> UnlockUserWalletAsync(Guid userId, decimal amount)
      {
         var wallet = await _userService.GetWalletAsync(userId);

         await _walletService.TransferFromWalletToLockedWalletAsync(wallet, amount);

         await _transactionService.CreateAsync(userId, amount, TransactionDescriptions.DebitReversal, true);

         return Ok(_mapper.Map<WalletDto>(wallet));
      }
   }
}