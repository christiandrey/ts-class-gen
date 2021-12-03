using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using HealthGyro.Common.Constants;
using HealthGyro.Models.Dtos;
using HealthGyro.Models.Entities;
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
   [Route("v{version:apiVersion}/hospitals")]
   public class HospitalController : BaseController
   {
      private readonly IActivityLogService _activityLogService;
      private readonly IBillingItemService _billingItemService;
      private readonly IDataRangeService _dataRangeService;
      private readonly IHospitalService _hospitalService;
      private readonly IInvoiceService _invoiceService;
      private readonly ILabService _labService;
      private readonly IManagerService _managerService;
      private readonly IMedicService _medicService;
      private readonly INonMedicService _nonMedicService;
      private readonly IPatientService _patientService;
      private readonly IPlanSubscriptionService _planSubscriptionService;
      private readonly ITransactionService _transactionService;
      private readonly IMapper _mapper;

      public HospitalController(
         IActivityLogService activityLogService,
         IBillingItemService billingItemService,
         IDataRangeService dataRangeService,
         IHospitalService hospitalService,
         IInvoiceService invoiceService,
         ILabService labService,
         IManagerService managerService,
         IMedicService medicService,
         INonMedicService nonMedicService,
         IPatientService patientService,
         IPlanSubscriptionService planSubscriptionService,
         ITransactionService transactionService,
         IMapper mapper) : base(mapper)
      {
         _activityLogService = activityLogService;
         _billingItemService = billingItemService;
         _dataRangeService = dataRangeService;
         _hospitalService = hospitalService;
         _invoiceService = invoiceService;
         _labService = labService;
         _managerService = managerService;
         _medicService = medicService;
         _nonMedicService = nonMedicService;
         _patientService = patientService;
         _planSubscriptionService = planSubscriptionService;
         _transactionService = transactionService;
         _mapper = mapper;
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpPost("")]
      public async Task<ActionResult<Response<HospitalDto>>> CreateHospitalAsync(HospitalCreationOptionsDto options)
      {
         var hospital = await _hospitalService.CreateHospitalAsync(options);

         return Ok(_mapper.Map<HospitalDto>(hospital));
      }

      [Authorize(Roles = nameof(UserRoleType.Medic) + "," + nameof(UserRoleType.NonMedic) + "," + nameof(UserRoleType.Manager))]
      [HttpGet("{id:guid}/patients")]
      public async Task<ActionResult<PaginatedResponse<PatientLiteDto>>> GetPatientsAsync(Guid id, string query = null, int page = 1, int pageSize = 30)
      {
         var userId = GetUserId();

         var patients = await _patientService.GetByHospitalAsync(userId, id, page, pageSize, query);

         return Paginated<Patient, PatientLiteDto>(patients);
      }

      [Authorize(Roles = nameof(UserRoleType.Manager))]
      [HttpPost("{id:guid}/patients")]
      public async Task<ActionResult<Response<PatientDto>>> CreatePatientAsync(Guid id, PatientCreationOptionsDto options)
      {
         var userId = GetUserId();

         var patient = await _patientService.CreatePatientAsync(userId, id, options);

         return Ok(_mapper.Map<PatientDto>(patient));
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpGet("")]
      public async Task<ActionResult<PaginatedResponse<HospitalDto>>> GetHospitalsAsync(string query = null, int page = 1, int pageSize = 30)
      {
         var hospitals = await _hospitalService.GetHospitalsAsync(page, pageSize, query);

         return Paginated<Hospital, HospitalDto>(hospitals);
      }

      [Authorize(Roles = nameof(UserRoleType.Manager))]
      [HttpPatch("{id:guid}")]
      public async Task<ActionResult<Response<HospitalDto>>> UpdateHospitalAsync(Guid id, HospitalUpdateOptionsDto options)
      {
         var userId = GetUserId();

         var hospital = await _hospitalService.UpdateHospitalAsync(userId, id, options);

         return Ok(_mapper.Map<HospitalDto>(hospital));
      }

      [Authorize(Roles = nameof(UserRoleType.Manager))]
      [HttpPut("{id:guid}/services")]
      public async Task<ActionResult<Response<HospitalDto>>> UpdateHospitalServicesAsync(Guid id, List<Guid> servicesIds)
      {
         var userId = GetUserId();

         var hospital = await _hospitalService.UpdateServicesAsync(userId, id, servicesIds);

         return Ok(_mapper.Map<HospitalDto>(hospital));
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpDelete("{id:guid}")]
      public async Task<ActionResult<Response>> DeleteHospitalAsync(Guid id)
      {
         await _hospitalService.DeleteHospitalAsync(id);

         return Ok();
      }

      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<HospitalDto>>> GetHospitalAsync(Guid id)
      {

         var hospital = await _hospitalService.GetByIdAsync(id, true);

         return Ok(_mapper.Map<HospitalDto>(hospital));
      }

      [HttpGet("{id:guid}/medics")]
      public async Task<ActionResult<Response<IEnumerable<MedicDto>>>> GetMedicsAsync(Guid id)
      {
         var medics = await _medicService.GetByHospitalAsync(id);

         return Ok(medics.Select(o => _mapper.Map<MedicDto>(o)));
      }

      [Authorize(Roles = nameof(UserRoleType.Manager))]
      [HttpPost("{id:guid}/medics")]
      public async Task<ActionResult<Response<MedicDto>>> CreateMedicAsync(Guid id, MedicCreationOptionsDto options)
      {
         var medic = await _medicService.CreateMedicAsync(id, options);

         return Ok(_mapper.Map<MedicDto>(medic));
      }

      [HttpGet("{id:guid}/non-medics")]
      public async Task<ActionResult<Response<IEnumerable<NonMedicDto>>>> GetNonMedicsAsync(Guid id)
      {
         var nonMedics = await _nonMedicService.GetByHospitalAsync(id);

         return Ok(nonMedics.Select(o => _mapper.Map<NonMedicDto>(o)));
      }

      [Authorize(Roles = nameof(UserRoleType.Manager))]
      [HttpPost("{id:guid}/non-medics")]
      public async Task<ActionResult<Response<NonMedicDto>>> CreateNonMedicAsync(Guid id, NonMedicCreationOptionsDto options)
      {
         var nonMedic = await _nonMedicService.CreateNonMedicAsync(id, options);

         return Ok(_mapper.Map<NonMedicDto>(nonMedic));
      }

      [Authorize(Roles = nameof(UserRoleType.Admin) + "," + nameof(UserRoleType.Manager))]
      [HttpGet("{id:guid}/plan-subscriptions")]
      public async Task<ActionResult<PaginatedResponse<PlanSubscriptionDto>>> GetPlanSubscriptionsAsync(Guid id, int page = 1, int pageSize = 30)
      {
         var planSubscriptions = await _planSubscriptionService.GetPlanSubscriptionsByHospitalAsync(id, page, pageSize);

         return Paginated<PlanSubscription, PlanSubscriptionDto>(planSubscriptions);
      }

      [Authorize(Roles = nameof(UserRoleType.Manager))]
      [HttpPost("{id:guid}/plan-subscriptions")]
      public async Task<ActionResult<Response<PlanSubscriptionDto>>> CreatePlanSubscriptionsAsync(Guid id, PlanSubscriptionCreationOptionsDto options)
      {
         var userId = GetUserId();

         var planSubscription = await _planSubscriptionService.CreatePlanSubscriptionAsync(userId, id, options);

         return Ok(_mapper.Map<PlanSubscriptionDto>(planSubscription));
      }

      [HttpGet("{id:guid}/plan-subscriptions/active")]
      public async Task<ActionResult<Response<PlanSubscriptionDto>>> GetActivePlanSubscriptionAsync(Guid id)
      {
         var planSubscription = await _planSubscriptionService.GetActivePlanSubscriptionByHospitalAsync(id);

         if (planSubscription == null)
         {
            return NotFound(ResponseMessages.PlanSubscriptionNotExist);
         }

         return Ok(_mapper.Map<PlanSubscriptionDto>(planSubscription));
      }

      [Authorize(Roles = nameof(UserRoleType.Admin) + "," + nameof(UserRoleType.Manager))]
      [HttpGet("{id:guid}/transactions")]
      public async Task<ActionResult<PaginatedResponse<TransactionDto>>> GetTransactionsAsync(Guid id, string query = null, int page = 1, int pageSize = 30)
      {
         var transactions = await _transactionService.GetByHospitalAsync(id, page, pageSize, query);

         return Paginated<Transaction, TransactionDto>(transactions);
      }

      [Authorize(Roles = nameof(UserRoleType.Manager))]
      [HttpPost("{id:guid}/data-ranges")]
      public async Task<ActionResult<Response<DataRangeDto>>> CreateDataRangeAsync(Guid id, DataRangeCreationOptionsDto options)
      {
         var userId = GetUserId();

         var dataRange = await _dataRangeService.CreateDataRangeAsync(userId, id, options);

         return Ok(_mapper.Map<DataRangeDto>(dataRange));
      }

      [HttpGet("{id:guid}/data-ranges")]
      public async Task<ActionResult<Response<IEnumerable<DataRangeDto>>>> GetDataRangesAsync(Guid id)
      {
         var dataRanges = await _dataRangeService.GetByHospitalAsync(id);

         return Ok(dataRanges.Select(o => _mapper.Map<DataRangeDto>(o)));
      }

      [HttpGet("{id:guid}/billing-items")]
      public async Task<ActionResult<PaginatedResponse<BillingItemDto>>> GetBillingItemsAsync(Guid id, string query = null, int page = 1, int pageSize = 30)
      {
         var billingItems = await _billingItemService.GetByHospitalAsync(id, page, pageSize, query);

         return Paginated<BillingItem, BillingItemDto>(billingItems);
      }

      [Authorize(Roles = nameof(UserRoleType.NonMedic))]
      [HttpGet("{id:guid}/lab/tests")]
      public async Task<ActionResult<PaginatedResponse<LabTestDto>>> GetLabTestsAsync(Guid id, string query = null, int page = 1, int pageSize = 30)
      {
         var labTests = await _labService.GetLabTestsByHospitalAsync(id, page, pageSize, query);

         return Paginated<LabTest, LabTestDto>(labTests);
      }

      [Authorize(Roles = nameof(UserRoleType.Manager))]
      [HttpPost("{id:guid}/billing-items")]
      public async Task<ActionResult<Response<BillingItemDto>>> CreateBillingItemAsync(Guid id, BillingItemCreationOptionsDto options)
      {
         var userId = GetUserId();

         var billingItem = await _billingItemService.CreateBillingItemAsync(userId, id, options);

         return Ok(_mapper.Map<BillingItemDto>(billingItem));
      }

      [Authorize(Roles = nameof(UserRoleType.Manager))]
      [HttpGet("{id:guid}/activity")]
      public async Task<ActionResult<PaginatedResponse<ActivityLogDto>>> GetActivityLogsAsync(Guid id, string query = null, int page = 1, int pageSize = 30)
      {
         var activityLogs = await _activityLogService.GetByHospitalIdAsync(id, page, pageSize);

         return Paginated<ActivityLog, ActivityLogDto>(activityLogs);
      }

      [Authorize(Roles = nameof(UserRoleType.Manager))]
      [HttpGet("{id:guid}/invoices")]
      public async Task<ActionResult<PaginatedResponse<InvoiceLiteDto>>> GetInvoicesAsync(Guid id, string query = null, int page = 1, int pageSize = 30)
      {
         var userId = GetUserId();

         var invoices = await _invoiceService.GetByHospitalAsync(id, userId, page, pageSize, query);

         return Paginated<Invoice, InvoiceLiteDto>(invoices);
      }
   }
}