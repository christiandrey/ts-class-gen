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
using Caretaker.Models.Services.Management;
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Entities.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Caretaker.Controllers
{
   [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/organizations")]
   public class OrganizationController : BaseController
   {
      private readonly ICurrencyService _currencyService;
      private readonly IEstateService _estateService;
      private readonly IFacilityManagerService _facilityManagerService;
      private readonly IMemberService _memberService;
      private readonly IOrganizationService _organizationService;
      private readonly IPaymentRequestService _paymentRequestService;
      private readonly ITransactionService _transactionService;
      private readonly IUserService _userService;
      private readonly IWalletService _walletService;
      private readonly IMapper _mapper;

      public OrganizationController(
         ICurrencyService currencyService,
         IEstateService estateService,
         IFacilityManagerService facilityManagerService,
         IMemberService memberService,
         IOrganizationService organizationService,
         IPaymentRequestService paymentRequestService,
         ITransactionService transactionService,
         IUserService userService,
         IWalletService walletService,
         IMapper mapper
      ) : base(mapper)
      {
         _currencyService = currencyService;
         _estateService = estateService;
         _facilityManagerService = facilityManagerService;
         _memberService = memberService;
         _organizationService = organizationService;
         _paymentRequestService = paymentRequestService;
         _transactionService = transactionService;
         _userService = userService;
         _walletService = walletService;
         _mapper = mapper;
      }

      [HttpPost("")]
      public async Task<ActionResult<Response<OrganizationDto>>> CreateAsync(OrganizationCreationOptionsDto dto)
      {
         var userId = GetUserId();

         var facilityManager = await _facilityManagerService.GetByUserIdAsync(userId, true);

         var estates = facilityManager.Estates;

         var organization = await _organizationService.CreateAsync(_mapper.Map<OrganizationCreationOptions>(dto), userId);

         if (estates.Any())
         {
            foreach (var estate in estates)
            {
               estate.OrganizationId = organization.Id;
               estate.MemberId = organization.Members.FirstOrDefault().Id;
            }

            await _estateService.UpdateManyAsync(estates);
         }

         return Ok(_mapper.Map<OrganizationDto>(organization));
      }

      [HttpGet("current")]
      public async Task<ActionResult<Response<OrganizationDto>>> GetCurrentOrganizationAsync()
      {
         var userId = GetUserId();

         var organization = await _organizationService.GetByUserIdAsync(userId);

         if (organization == null)
         {
            return NotFound(ResponseMessages.OrganizationNotExist);
         }

         return Ok(_mapper.Map<OrganizationDto>(organization));
      }

      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<OrganizationDto>>> GetByIdAsync(Guid id)
      {
         var organization = await _organizationService.GetByIdAsync(id);

         if (organization == null)
         {
            return NotFound(ResponseMessages.OrganizationNotExist);
         }

         return Ok(_mapper.Map<OrganizationDto>(organization));
      }

      [HttpPatch("{id:guid}")]
      public async Task<ActionResult<Response<OrganizationDto>>> UpdateAsync(Guid id, OrganizationUpdateOptionsDto dto)
      {
         var userId = GetUserId();

         var organization = await _organizationService.UpdateAsync(_mapper.Map<OrganizationUpdateOptions>(dto), id, userId);

         return Ok(_mapper.Map<OrganizationDto>(organization));
      }

      [HttpGet("{id:guid}/payment-requests")]
      public async Task<ActionResult<PaginatedResponse<PaymentRequestLiteDto>>> GetPaymentRequestsAsync(Guid id, string query = null, int page = 1, int pageSize = 30)
      {
         var paymentRequests = await _paymentRequestService.GetByOrganizationAsync(id, page, pageSize, query);

         return Paginated<PaymentRequest, PaymentRequestLiteDto>(paymentRequests);
      }

      [HttpGet("{id:guid}/estates")]
      public async Task<ActionResult<Response<IEnumerable<EstateLiteDto>>>> GetEstatesAsync(Guid id)
      {
         var organization = await _organizationService.GetByIdAsync(id);

         if (organization == null)
         {
            return NotFound(ResponseMessages.OrganizationNotExist);
         }

         return Ok(organization.Estates.OrderByDescending(o => o.CreatedAt).Select(_mapper.Map<EstateLiteDto>));
      }

      [HttpGet("{id:guid}/wallet-balance")]
      [HttpGet("{id:guid}/wallet/balance")]
      public async Task<ActionResult<Response<decimal>>> GetWalletBalanceAsync(Guid id)
      {
         var organization = await _organizationService.GetByIdAsync(id, true);

         var wallet = await _organizationService.GetWalletAsync(organization);

         return Ok(wallet.Balance);
      }

      [HttpPost("{id:guid}/wallet/fund/{localAmount:decimal}")]
      public async Task<ActionResult<Response<TransactionDto>>> FundOrganizationWalletAsync(Guid id, decimal localAmount)
      {
         var organization = await _organizationService.GetByIdAsync(id, true);

         var userId = GetUserId();

         var user = await _userService.GetByIdAsync(userId, true);

         if (!_organizationService.GetIsOwnerOrAdmin(organization, userId))
         {
            return Forbid();
         }

         var currency = await _currencyService.GetByRegionCodeOrDefaultAsync();

         var currencyToBaseExchangeRate = _currencyService.GetCurrencyToBaseExchangeRate(currency);

         var amount = localAmount * currencyToBaseExchangeRate;

         await _walletService.TransferFromWalletToWalletAsync(user.Wallet.Id, organization.Wallet.Id, amount);

         await _transactionService.CreateAsync(userId, amount, TransactionDescriptions.Debit, TransactionMode.Wallet);

         var creditTransaction = await _transactionService.CreateAsync(userId, amount, TransactionDescriptions.OrganizationWalletTopup, TransactionMode.Wallet, true);

         return Ok(_mapper.Map<TransactionDto>(creditTransaction));
      }

      [HttpPost("{id:guid}/members")]
      public async Task<ActionResult<Response<MemberDto>>> CreateMemberAsync(Guid id, MemberCreationOptionsDto dto)
      {
         var userId = GetUserId();

         var member = await _memberService.CreateAsync(_mapper.Map<MemberCreationOptions>(dto), id, userId);

         return Ok(_mapper.Map<MemberDto>(member));
      }

      [HttpPost("{id:guid}/members/invite")]
      public async Task<ActionResult<Response<MemberDto>>> InviteMemberAsync(Guid id, MemberInvitationOptionsDto dto)
      {
         var userId = GetUserId();

         var member = await _memberService.InviteAsync(_mapper.Map<MemberInvitationOptions>(dto), id, userId);

         return Ok(_mapper.Map<MemberDto>(member));
      }
   }
}