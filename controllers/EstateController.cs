using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Caretaker.Common.Constants;
using Caretaker.Models.Dtos;
using Caretaker.Models.Entities;
using Caretaker.Models.Enums;
using Caretaker.Models.Services.Management;
using Caretaker.Models.Services.Payments.Others;
using Caretaker.Models.Utilities;
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Entities.Interfaces;
using Caretaker.Services.Permissions.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Caretaker.Controllers
{
   [Authorize]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/estates")]
   public class EstateController : BaseController
   {
      private readonly IApartmentService _apartmentService;
      private readonly IEstateService _estateService;
      private readonly IEstateManagerService _estateManagerService;
      private readonly ICommunityService _communityService;
      private readonly ICurrencyService _currencyService;
      private readonly IPaymentService _paymentService;
      private readonly IPaymentAccountService _paymentAccountService;
      private readonly IPaymentRequestService _paymentRequestService;
      private readonly IPaymentBeneficiaryService _paymentBeneficiaryService;
      private readonly IPermissionsService _permissionsService;
      private readonly IVendorService _vendorService;
      private readonly IRecurringPaymentService _recurringPaymentService;
      private readonly IResidentService _residentService;
      private readonly IFacilityManagerService _facilityManagerService;
      private readonly IFacilityManagerLogService _facilityManagerLogService;
      private readonly IProjectService _projectService;
      private readonly IMapper _mapper;

      public EstateController(
         IApartmentService apartmentService,
         IEstateService estateService,
         IEstateManagerService estateManagerService,
         ICommunityService communityService,
         ICurrencyService currencyService,
         IPaymentService paymentService,
         IPaymentAccountService paymentAccountService,
         IPaymentRequestService paymentRequestService,
         IPaymentBeneficiaryService paymentBeneficiaryService,
         IPermissionsService permissionsService,
         IVendorService vendorService,
         IRecurringPaymentService recurringPaymentService,
         IResidentService residentService,
         IFacilityManagerService facilityManagerService,
         IFacilityManagerLogService facilityManagerLogService,
         IProjectService projectService,
         IMapper mapper) : base(mapper)
      {
         _apartmentService = apartmentService;
         _estateService = estateService;
         _estateManagerService = estateManagerService;
         _communityService = communityService;
         _currencyService = currencyService;
         _paymentAccountService = paymentAccountService;
         _paymentBeneficiaryService = paymentBeneficiaryService;
         _paymentService = paymentService;
         _paymentRequestService = paymentRequestService;
         _permissionsService = permissionsService;
         _vendorService = vendorService;
         _recurringPaymentService = recurringPaymentService;
         _residentService = residentService;
         _facilityManagerService = facilityManagerService;
         _facilityManagerLogService = facilityManagerLogService;
         _projectService = projectService;
         _mapper = mapper;
      }

      [HttpPost("")]
      public async Task<ActionResult<Response<EstateDto>>> CreateAsync(EstateCreationOptionsDto dto)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationRootScopeAsync(userId, OrganizationRootScopes.EstateCreate);

         var estate = await _estateService.CreateAsync(_mapper.Map<EstateCreationOptions>(dto), userId);

         return Ok(_mapper.Map<EstateDto>(estate));
      }

      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<EstateDto>>> GetByIdAsync(Guid id)
      {
         var estate = await _estateService.GetByIdAsync(id);

         if (estate == null)
         {
            return NotFound(ResponseMessages.EstateNotExist);
         }

         return Ok(_mapper.Map<EstateDto>(estate));
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpGet("")]
      public async Task<ActionResult<PaginatedResponse<EstateLiteDto>>> GetAllAsync(string query = null, int page = 1, int pageSize = 30)
      {
         var estates = await _estateService.GetAllAsync(page, pageSize, query);

         return Paginated<Estate, EstateLiteDto>(estates);
      }

      [HttpGet("{id:guid}/community/categories")]
      public async Task<ActionResult<Response<IEnumerable<CommunityCategoryDto>>>> GetCommunityCategoriesAsync(Guid id)
      {
         var categories = await _communityService.GetCategoriesByEstateAsync(id);

         return Ok(categories.Select(o => _mapper.Map<CommunityCategory, CommunityCategoryDto>(o)));
      }

      [HttpGet("{id:guid}/vendors")]
      public async Task<ActionResult<Response<IEnumerable<VendorLiteDto>>>> GetVendorsAsync(Guid id)
      {
         var vendors = await _vendorService.GetAllByEstateIdAsync(id);

         return Ok(vendors.Select(o => _mapper.Map<Vendor, VendorLiteDto>(o)));
      }

      [HttpGet("{id:guid}/wallet-balance")]
      [HttpGet("{id:guid}/wallet/balance")]
      public async Task<ActionResult<Response<decimal>>> GetWalletBalanceAsync(Guid id)
      {
         var walletBalance = await _paymentService.GetEstateWalletBalanceAsync(id);

         return Ok(walletBalance);
      }

      [HttpGet("{id:guid}/managers")]
      public async Task<ActionResult<Response<IEnumerable<EstateManagerDto>>>> GetEstateManagersAsync(Guid id)
      {
         var estateManagers = await _estateManagerService.GetByEstateAsync(id);

         return Ok(estateManagers.Select(_mapper.Map<EstateManagerDto>));
      }

      [HttpPost("{id:guid}/managers")]
      public async Task<ActionResult<Response<EstateManagerDto>>> CreateEstateManagerAsync(Guid id, EstateManagerCreationOptionsDto dto)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationEstateRootScopeAsync(id, userId, OrganizationRootScopes.MemberManage);

         var estateManager = await _estateManagerService.CreateAsync(dto.MemberId, id, dto.OrganizationClaimId);

         return Ok(_mapper.Map<EstateManagerDto>(estateManager));
      }

      [HttpPut("{id:guid}/managers/{estateManagerId:guid}/claims/{claimId:guid}")]
      public async Task<ActionResult<Response<EstateManagerDto>>> UpdateEstateManagerClaimAsync(Guid id, Guid estateManagerId, Guid claimId)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationEstateRootScopeAsync(id, userId, OrganizationRootScopes.MemberManage);

         var estateManager = await _estateManagerService.UpdateClaimAsync(estateManagerId, claimId);

         return Ok(_mapper.Map<EstateManagerDto>(estateManager));
      }

      [HttpPut("{id:guid}/managers/{estateManagerId:guid}/claims/{localAmount:decimal}")]
      public async Task<ActionResult<Response<EstateManagerDto>>> UpdateEstateManagerPaymentLimitAsync(Guid id, Guid estateManagerId, decimal localAmount)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationEstateRootScopeAsync(id, userId, OrganizationRootScopes.MemberManage);

         var currencyToBaseExchangeRate = await _currencyService.GetCurrencyToBaseExchangeRateAsync();

         var amount = localAmount * currencyToBaseExchangeRate;

         var estateManager = await _estateManagerService.UpdatePaymentLimitAsync(estateManagerId, amount);

         return Ok(_mapper.Map<EstateManagerDto>(estateManager));
      }

      [HttpPut("{id:guid}/managers/{estateManagerId:guid}/activate")]
      public async Task<ActionResult<Response<EstateManagerDto>>> ActivateEstateManagerAsync(Guid id, Guid estateManagerId)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationEstateRootScopeAsync(id, userId, OrganizationRootScopes.MemberManage);

         var estateManager = await _estateManagerService.ActivateAsync(estateManagerId);

         return Ok(_mapper.Map<EstateManagerDto>(estateManager));
      }

      [HttpPut("{id:guid}/managers/{estateManagerId:guid}/deactivate")]
      public async Task<ActionResult<Response<EstateManagerDto>>> DeactivateEstateManagerAsync(Guid id, Guid estateManagerId)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationEstateRootScopeAsync(id, userId, OrganizationRootScopes.MemberManage);

         var estateManager = await _estateManagerService.DeactivateAsync(estateManagerId);

         return Ok(_mapper.Map<EstateManagerDto>(estateManager));
      }

      [HttpGet("{id:guid}/payments")]
      public async Task<ActionResult<PaginatedResponse<PaymentLiteDto>>> GetPaymentsAsync(Guid id, string query = null, int page = 1, int pageSize = 30)
      {
         var payments = await _paymentService.GetByEstateAsync(id, page, pageSize, query);

         return Paginated<Payment, PaymentLiteDto>(payments);
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpGet("{id:guid}/payments/requests")]
      [HttpGet("{id:guid}/payment-requests")]
      public async Task<ActionResult<PaginatedResponse<PaymentRequestLiteDto>>> GetPaymentRequestsAsync(Guid id, string query = null, int page = 1, int pageSize = 30)
      {
         var paymentRequests = await _paymentRequestService.GetByEstateAsync(id, page, pageSize, query);

         return Paginated<PaymentRequest, PaymentRequestLiteDto>(paymentRequests);
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpGet("{id:guid}/payments/recurring")]
      public async Task<ActionResult<PaginatedResponse<RecurringPaymentDto>>> GetRecurringPaymentsAsync(Guid id, int page = 1, int pageSize = 30)
      {
         var estate = await _estateService.GetByIdAsync(id, true);

         var recurringPayments = await _recurringPaymentService.GetByEstateAsync(estate, page, pageSize);

         return Paginated<RecurringPayment, RecurringPaymentDto>(recurringPayments);
      }

      [HttpGet("{id:guid}/payments/accounts")]
      public async Task<ActionResult<Response<IEnumerable<PaymentAccountDto>>>> GetPaymentAccountsAsync(Guid id)
      {
         var userId = GetUserId();

         var paymentAccounts = await _paymentAccountService.GetByEstateAsync(id);

         return Ok(paymentAccounts.Select(_mapper.Map<PaymentAccountDto>));
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpPost("{id:guid}/payments/accounts")]
      public async Task<ActionResult<Response<PaymentAccountDto>>> CreatePaymentAccountAsync(Guid id, PaymentAccountCreationOptionsDto dto)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationScopeAsync(id, userId, OrganizationScopes.PaymentAccountsManage);

         var paymentAccount = await _paymentAccountService.CreateAsync(new PaymentAccountCreationOptions
         {
            Name = dto.Name
         }, id, userId);

         return Ok(_mapper.Map<PaymentAccountDto>(paymentAccount));
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpPatch("{id:guid}/payments/accounts/{paymentAccountId:guid}")]
      public async Task<ActionResult<Response<PaymentAccountDto>>> UpdatePaymentAccountAsync(Guid id, Guid paymentAccountId, PaymentAccountUpdateOptionsDto dto)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationScopeAsync(id, userId, OrganizationScopes.PaymentAccountsManage);

         var paymentAccount = await _paymentAccountService.UpdateAsync(paymentAccountId, userId, new PaymentAccountUpdateOptions
         {
            Name = dto.Name
         });

         return Ok(_mapper.Map<PaymentAccountDto>(paymentAccount));
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpPut("{id:guid}/payments/accounts/{paymentAccountId:guid}/activate")]
      public async Task<ActionResult<Response<PaymentAccountDto>>> ActivatePaymentAccountAsync(Guid id, Guid paymentAccountId)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationScopeAsync(id, userId, OrganizationScopes.PaymentAccountsManage);

         var paymentAccount = await _paymentAccountService.ActivateAsync(paymentAccountId, userId);

         return Ok(_mapper.Map<PaymentAccountDto>(paymentAccount));
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpPut("{id:guid}/payments/accounts/{paymentAccountId:guid}/deactivate")]
      public async Task<ActionResult<Response<PaymentAccountDto>>> DeactivatePaymentAccountAsync(Guid id, Guid paymentAccountId)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationScopeAsync(id, userId, OrganizationScopes.PaymentAccountsManage);

         var paymentAccount = await _paymentAccountService.DeactivateAsync(paymentAccountId, userId);

         return Ok(_mapper.Map<PaymentAccountDto>(paymentAccount));
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpGet("{id:guid}/payments/beneficiaries")]
      public async Task<ActionResult<Response<IEnumerable<PaymentBeneficiaryDto>>>> GetPaymentBeneficiariesAsync(Guid id)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationScopeAsync(id, userId, OrganizationScopes.PaymentBeneficiariesManage);

         var beneficiaries = await _paymentBeneficiaryService.GetByEstateAsync(id, userId);

         return Ok(beneficiaries.Select(_mapper.Map<PaymentBeneficiaryDto>));
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpPost("{id:guid}/payments/beneficiaries")]
      public async Task<ActionResult<Response<PaymentBeneficiaryDto>>> CreatePaymentBeneficiaryAsync(Guid id, PaymentBeneficiaryCreationOptionsDto dto)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationScopeAsync(id, userId, OrganizationScopes.PaymentBeneficiariesManage);

         var beneficiary = await _paymentBeneficiaryService.CreateAsync(_mapper.Map<PaymentBeneficiaryCreationOptions>(dto), id, userId);

         return Ok(_mapper.Map<PaymentBeneficiaryDto>(beneficiary));
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpPut("{id:guid}/payments/beneficiaries/{beneficiaryId:guid}")]
      public async Task<ActionResult<Response<PaymentBeneficiaryDto>>> AddPaymentBeneficiaryAsync(Guid id, Guid beneficiaryId)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationScopeAsync(id, userId, OrganizationScopes.PaymentBeneficiariesManage);

         var beneficiary = await _paymentBeneficiaryService.AddToEstateAsync(beneficiaryId, id, userId);

         return Ok(_mapper.Map<PaymentBeneficiaryDto>(beneficiary));
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpDelete("{id:guid}/payments/beneficiaries/{beneficiaryId:guid}")]
      public async Task<ActionResult<Response<PaymentBeneficiaryDto>>> RemovePaymentBeneficiaryAsync(Guid id, Guid beneficiaryId)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationScopeAsync(id, userId, OrganizationScopes.PaymentBeneficiariesManage);

         var beneficiary = await _paymentBeneficiaryService.RemoveFromEstateAsync(beneficiaryId, id, userId);

         return Ok(_mapper.Map<PaymentBeneficiaryDto>(beneficiary));
      }

      [HttpPost("{id:guid}/payments")]
      public async Task<ActionResult<Response<PaymentDto>>> CreatePaymentAsync(Guid id, PaymentCreationOptionsDto dto, [FromQuery] Guid? serviceCategoryId, [FromQuery] Guid? beneficiaryId)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationScopeAsync(id, userId, OrganizationScopes.PaymentCreate);

         var localAmount = dto.LocalAmount;

         var currency = await _currencyService.GetByRegionCodeOrDefaultAsync();

         var currencyToBaseExchangeRate = _currencyService.GetCurrencyToBaseExchangeRate(currency);

         var amount = localAmount * currencyToBaseExchangeRate;

         var paymentCreationOptions = new PaymentCreationOptions
         {
            RecipientId = dto.RecipientId,
            EstateId = id,
            BankAccountId = dto.BankAccountId,
            ServiceCategoryId = serviceCategoryId,
            PaymentAccountId = dto.PaymentAccountId,
            BeneficiaryId = beneficiaryId,
            LocalAmount = dto.LocalAmount,
            Description = dto.Description,
            Notes = dto.Notes,
            Mode = dto.Mode,
            Recurrence = dto.Recurrence,
         };

         await _permissionsService.AssertValidEstatePaymentAsync(id, paymentCreationOptions);

         var payment = await _paymentService.CreateAsync(paymentCreationOptions, userId, amount);

         if (dto.Recurrence != Recurrence.None)
         {
            var recurringPayment = new RecurringPayment
            {
               LocalAmount = localAmount,
               ServiceCategoryId = serviceCategoryId,
               BeneficiaryId = beneficiaryId,
               PaymentAccountId = dto.PaymentAccountId,
               Description = dto.Description,
               Notes = dto.Notes,
               Mode = dto.Mode,
               CurrencyId = currency.Id,
               UserId = userId,
               EstateId = id,
               RecipientId = dto.RecipientId,
               Recurrence = dto.Recurrence,
               StartDate = dto.RecurrenceStartAt ?? DateTime.Now,
            };

            await _recurringPaymentService.CreateAsync(recurringPayment);
         }

         return Ok(_mapper.Map<PaymentDto>(payment));
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpPost("{id:guid}/payments/requests")]
      [HttpPost("{id:guid}/payment-requests")]
      public async Task<ActionResult<Response<PaymentRequestDto>>> CreatePaymentRequestAsync(Guid id, PaymentCreationOptionsDto dto, [FromQuery] Guid? serviceCategoryId, [FromQuery] Guid? beneficiaryId)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationScopeAsync(id, userId, OrganizationScopes.PaymentCreate);

         var localAmount = dto.LocalAmount;

         var currency = await _currencyService.GetByRegionCodeOrDefaultAsync();

         var currencyToBaseExchangeRate = _currencyService.GetCurrencyToBaseExchangeRate(currency);

         var amount = localAmount * currencyToBaseExchangeRate;

         var paymentCreationOptions = new PaymentCreationOptions
         {
            RecipientId = dto.RecipientId,
            EstateId = id,
            BankAccountId = dto.BankAccountId,
            ServiceCategoryId = serviceCategoryId,
            BeneficiaryId = beneficiaryId,
            PaymentAccountId = dto.PaymentAccountId,
            LocalAmount = dto.LocalAmount,
            Description = dto.Description,
            Notes = dto.Notes,
            Mode = dto.Mode,
            Recurrence = dto.Recurrence,
         };

         await _permissionsService.AssertValidEstatePaymentAsync(id, paymentCreationOptions);

         var paymentRequest = await _paymentRequestService.CreateAsync(paymentCreationOptions, userId, amount);

         return Ok(_mapper.Map<PaymentRequestDto>(paymentRequest));
      }

      [HttpGet("{id:guid}/facility-manager")]
      public async Task<ActionResult<Response<FacilityManagerDto>>> GetFacilityManagerAsync(Guid id)
      {
         var facilityManager = await _facilityManagerService.GetByEstateIdAsync(id, true);

         return Ok(_mapper.Map<FacilityManager, FacilityManagerDto>(facilityManager));
      }

      [HttpGet("{id:guid}/facility-manager/logs")]
      public async Task<ActionResult<Response<IEnumerable<FacilityManagerLogDto>>>> GetFacilityManagerLogsAsync(Guid id)
      {
         var logs = await _facilityManagerLogService.GetByEstateAsync(id);

         return Ok(logs.Select(_mapper.Map<FacilityManagerLogDto>));
      }

      [HttpDelete("{id:guid}")]
      public async Task<ActionResult<Response>> DeleteAsync(Guid id)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationEstateRootScopeAsync(id, userId, OrganizationRootScopes.EstateDelete);

         await _estateService.DeleteAsync(id);

         return Ok();
      }

      [HttpPatch("{id:guid}")]
      public async Task<ActionResult<Response<EstateDto>>> UpdateAsync(Guid id, EstateUpdateOptionsDto dto)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationScopeAsync(id, userId, OrganizationScopes.EstateEdit);

         var estate = await _estateService.UpdateAsync(id, _mapper.Map<EstateUpdateOptions>(dto));

         return Ok(_mapper.Map<EstateDto>(estate));
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpPut("{id:guid}/facility-manager/{facilityManagerId:guid}")]
      public async Task<ActionResult<Response<EstateDto>>> UpdateFacilityManagerAsync(Guid id, Guid facilityManagerId)
      {
         var userId = GetUserId();

         var estate = await _estateService.UpdateFacilityManagerAsync(id, facilityManagerId, userId);

         return Ok(_mapper.Map<EstateDto>(estate));
      }

      [HttpPut("{id:guid}/vendors")]
      public async Task<ActionResult<Response<EstateDto>>> UpdateVendorsAsync(Guid id, List<Guid> vendorIds)
      {
         var userId = GetUserId();

         var vendors = await _vendorService.GetByIdsAsync(vendorIds);

         await _permissionsService.AssertOrganizationScopeAsync(id, userId, OrganizationScopes.VendorManage);

         var estate = await _estateService.UpdateVendorsAsync(id, vendors);

         return Ok(_mapper.Map<EstateDto>(estate));
      }

      [HttpPut("{id:guid}/services")]
      public async Task<ActionResult<Response<EstateDto>>> UpdateServicesAsync(Guid id, List<Guid> servicesIds)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationScopeAsync(id, userId, OrganizationScopes.EstateEdit);

         var estate = await _estateService.UpdateServicesAsync(id, servicesIds);

         return Ok(_mapper.Map<EstateDto>(estate));
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpPatch("{id:guid}/commission")]
      public async Task<ActionResult<Response<EstateDto>>> UpdateCommissionAsync(Guid id, CommissionUpdateOptionsDto dto)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationScopeAsync(id, userId, OrganizationScopes.PaymentFeesManage);

         var estate = await _estateService.UpdateCommissionAsync(id, _mapper.Map<CommissionUpdateOptions>(dto), userId);

         return Ok(_mapper.Map<EstateDto>(estate));
      }

      [HttpGet("{id:guid}/residents")]
      public async Task<ActionResult<Response<IEnumerable<ResidentLiteDto>>>> GetResidentsAsync(Guid id)
      {
         var residents = await _residentService.GetAllByEstateAsync(id);

         return Ok(residents.Select(o => _mapper.Map<ResidentLiteDto>(o)));
      }

      [HttpGet("{id:guid}/apartments")]
      public async Task<ActionResult<Response<IEnumerable<ApartmentLiteDto>>>> GetApartmentsAsync(Guid id)
      {
         var apartments = await _apartmentService.GetAllByEstateIdAsync(id);

         return Ok(apartments.Select(_mapper.Map<ApartmentLiteDto>));
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager))]
      [HttpGet("{id:guid}/projects")]
      public async Task<ActionResult<PaginatedResponse<ProjectLiteDto>>> GetProjectsAsync(Guid id, [FromQuery] ProjectQuery projectQuery, int page = 1, int pageSize = 30)
      {
         var projects = await _projectService.GetAllByEstateAsync(id, page, pageSize, projectQuery);

         return Paginated<Project, ProjectLiteDto>(projects);
      }

      [HttpGet("{id:guid}/projects/public")]
      public async Task<ActionResult<PaginatedResponse<ProjectLiteDto>>> GetPublicProjectsAsync(Guid id, [FromQuery] ProjectQuery projectQuery, int page = 1, int pageSize = 30)
      {
         var projects = await _projectService.GetPublicByEstateAsync(id, page, pageSize, projectQuery);

         return Paginated<Project, ProjectLiteDto>(projects);
      }

      [HttpGet("{id:guid}/payments/export"), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<FileContentResult> ExportPaymentsAsync(Guid id, DateTime? startDate = null, DateTime? endDate = null)
      {
         var csv = await _paymentService.GetCsvByEstateAsync(id, startDate, endDate);

         return File(new UTF8Encoding().GetBytes(csv), "text/csv", $"payments-export-{DateTime.Now.ToString("yyyyMMddHHmmss")}.csv");
      }
   }
}