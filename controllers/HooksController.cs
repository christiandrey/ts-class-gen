using System.Net.Mime;
using System.Threading.Tasks;
using Caretaker.Common.Constants;
using Caretaker.Models.Enums;
using Caretaker.Models.Services.Payments.PaystackClient;
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Entities.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Caretaker.Controllers
{
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/hooks")]
   public class HooksController : BaseController
   {
      private readonly ILogger _logger;
      private readonly IWalletService _walletService;
      private readonly ICurrencyService _currencyService;
      private readonly IWithdrawalService _withdrawalService;
      private readonly ITransactionService _transactionService;

      public HooksController(
          IWalletService walletService,
          ILogger<HooksController> logger,
          IWithdrawalService withdrawalService,
          ITransactionService transactionService,
          ICurrencyService currencyService)
      {
         _logger = logger;
         _withdrawalService = withdrawalService;
         _currencyService = currencyService;
         _walletService = walletService;
         _transactionService = transactionService;
      }

      [HttpPost("paystack/transfer")]
      public async Task<ActionResult<Response>> OnPaystackTransferEventAsync(PaystackEvent<PaystackTransferEventData> transferEvent)
      {
         var transactionReference = transferEvent.Data.Transfer_Code;

         var eventType = transferEvent.Event;

         if (eventType == PaystackEvents.TransferSuccessful)
         {
            await _withdrawalService.UpdateStatusAsync(transactionReference, WithdrawalStatus.Completed);
         }

         if (eventType == PaystackEvents.TransferFailed)
         {
            await _withdrawalService.UpdateStatusAsync(transactionReference, WithdrawalStatus.Failed);
         }

         return Ok();
      }
   }
}