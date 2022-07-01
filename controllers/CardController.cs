using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using Caretaker.Common.Constants;
using Caretaker.Models.Dtos;
using Caretaker.Models.Enums;
using Caretaker.Models.Services.Payments.Others;
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Entities.Interfaces;
using Caretaker.Services.Messaging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Caretaker.Controllers
{
   [Authorize]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/cards")]
   public class CardController : BaseController
   {
      private readonly ICardService _cardService;
      private readonly ICurrencyService _currencyService;
      private readonly IMessagingService _messagingService;
      private readonly ITransactionService _transactionService;
      private readonly IUserService _userService;
      private readonly IWalletService _walletService;
      private readonly IMapper _mapper;

      public CardController(
         ICardService cardService,
         ICurrencyService currencyService,
         IMessagingService messagingService,
         ITransactionService transactionService,
         IUserService userService,
         IWalletService walletService,
         IMapper mapper) : base(mapper)
      {
         _cardService = cardService;
         _currencyService = currencyService;
         _messagingService = messagingService;
         _transactionService = transactionService;
         _userService = userService;
         _walletService = walletService;
         _mapper = mapper;
      }

      [HttpGet("")]
      public async Task<ActionResult<Response<IEnumerable<CardDto>>>> GetCardsAsync()
      {
         var userId = GetUserId();

         var cards = await _cardService.GetByUserAsync(userId);

         return Ok(cards.Select(o => _mapper.Map<CardDto>(o)));
      }

      [HttpGet("resolve/{bin}")]
      public async Task<ActionResult<Response<ResolvedCardDto>>> ResolveCardAsync(string bin)
      {
         var resolvedCard = await _cardService.ResolveCardAsync(bin);

         return Ok(_mapper.Map<ResolvedCardDto>(resolvedCard));
      }

      [HttpPost("")]
      public async Task<ActionResult<Response<CardDto>>> CreateCardAsync(CardCreationOptionsDto dto)
      {
         var userId = GetUserId();

         var card = await _cardService.CreateCardAsync(_mapper.Map<CardCreationOptions>(dto), userId);

         return Ok(_mapper.Map<CardDto>(card));
      }

      [HttpPost("{cardId:guid}/fund/{localAmount:decimal}")]
      public async Task<ActionResult<Response<TransactionDto>>> FundWalletFromCardAsync(Guid cardId, decimal localAmount)
      {
         var userId = GetUserId();

         var user = await _userService.GetByIdAsync(userId, true);

         var card = await _cardService.GetByIdAsnc(cardId);

         if (card == null)
         {
            return NotFound(ResponseMessages.CardNotExist);
         }

         var currency = await _currencyService.GetByRegionCodeOrDefaultAsync();

         var baseToCurrencyExchangeRate = _currencyService.GetBaseToCurrencyExchangeRate(currency);

         var currencyToBaseExchangeRate = _currencyService.GetCurrencyToBaseExchangeRate(currency);

         var amount = localAmount * currencyToBaseExchangeRate;

         var wallet = await _userService.GetWalletAsync(userId);

         var reference = await _cardService.ChargeCardAsync(card, userId, amount);

         var transaction = await _transactionService.CreateAsync(userId, amount, TransactionDescriptions.Topup, reference, TransactionMode.Card, true);

         await _walletService.CreditAsync(wallet, amount);

         await _messagingService.SendOnTopupSuccessfulAsync(user.PhoneNumber, currency.Symbol, localAmount, wallet.ActualBalance * baseToCurrencyExchangeRate);

         return Ok(_mapper.Map<TransactionDto>(transaction));
      }

      [HttpPost("{cardId:guid}/withdraw/{localAmount:decimal}")]
      public async Task<ActionResult<Response<TransactionDto>>> WithdrawToCardAsync(Guid cardId, decimal localAmount)
      {
         var userId = GetUserId();

         var currency = await _currencyService.GetByRegionCodeOrDefaultAsync();

         var currencyToBaseExchangeRate = _currencyService.GetCurrencyToBaseExchangeRate(currency);

         var amount = localAmount * currencyToBaseExchangeRate;

         var wallet = await _userService.GetWalletAsync(userId);

         _walletService.AssertSufficientBalance(wallet, amount);

         var reference = await _cardService.CreditCardAsync(userId, amount, cardId);

         var transaction = await _transactionService.CreateAsync(userId, amount, TransactionDescriptions.Withdrawal, reference, TransactionMode.Card);

         await _walletService.TransferFromWalletToLockedWalletAsync(wallet, amount);

         return Ok(_mapper.Map<TransactionDto>(transaction));
      }

      [HttpDelete("{cardId:guid}")]
      public async Task<ActionResult<Response>> DeleteCardAsync(Guid cardId)
      {
         await _cardService.DeleteAsync(cardId);

         return Ok();
      }
   }
}