using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
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
   [Route("v{version:apiVersion}/patients")]
   public class PatientController : BaseController
   {
      private readonly IAppointmentService _appointmentService;
      private readonly ICalendarEventService _calendarEventService;
      private readonly IClinicalVisitService _clinicalVisitService;
      private readonly IInvoiceService _invoiceService;
      private readonly ILabService _labService;
      private readonly IMedicService _medicService;
      private readonly IMedicationService _medicationService;
      private readonly ITransactionService _transactionService;
      private readonly IGuestService _guestService;
      private readonly IPatientService _patientService;
      private readonly IVitalReadingService _vitalReadingService;
      private readonly IMapper _mapper;

      public PatientController(
         IAppointmentService appointmentService,
         ICalendarEventService calendarEventService,
         IClinicalVisitService clinicalVisitService,
         ILabService labService,
         IInvoiceService invoiceService,
         IMedicService medicService,
         IMedicationService medicationService,
         ITransactionService transactionService,
         IGuestService guestService,
         IPatientService patientService,
         IVitalReadingService vitalReadingService,
         IMapper mapper) : base(mapper)
      {
         _appointmentService = appointmentService;
         _calendarEventService = calendarEventService;
         _clinicalVisitService = clinicalVisitService;
         _labService = labService;
         _invoiceService = invoiceService;
         _medicService = medicService;
         _medicationService = medicationService;
         _transactionService = transactionService;
         _guestService = guestService;
         _patientService = patientService;
         _vitalReadingService = vitalReadingService;
         _mapper = mapper;
      }

      [Authorize(Roles = nameof(UserRoleType.Patient))]
      [HttpGet("current")]
      public async Task<ActionResult<Response<PatientDto>>> GetCurrentAsync()
      {
         var userId = GetUserId();

         var patient = await _patientService.GetByUserIdAsync(userId, true);

         return Ok(_mapper.Map<PatientDto>(patient));
      }

      [Authorize(Roles = nameof(UserRoleType.Patient))]
      [HttpGet("current/guests")]
      public async Task<ActionResult<Response<IEnumerable<GuestDto>>>> GetGuestsForCurrentAsync()
      {
         var userId = GetUserId();

         var patient = await _patientService.GetByUserIdAsync(userId, true);

         var guests = await _guestService.GetByPatientAsync(patient.Id);

         return Ok(guests.Select(o => _mapper.Map<GuestDto>(o)));
      }

      [Authorize(Roles = nameof(UserRoleType.Patient))]
      [HttpPost("current/guests")]
      public async Task<ActionResult<Response<GuestDto>>> CreateGuestAsync(GuestCreationOptionsDto options)
      {
         var userId = GetUserId();

         var patient = await _patientService.GetByUserIdAsync(userId, true);

         var guest = await _guestService.CreateGuestAsync(userId, patient.Id, options);

         return Ok(_mapper.Map<GuestDto>(guest));
      }

      [Authorize(Roles = nameof(UserRoleType.Patient) + "," + nameof(UserRoleType.Guest))]
      [HttpPost("current/appointments")]
      public async Task<ActionResult<Response<AppointmentDto>>> CreateAppointmentAsync(AppointmentCreationOptionsDto options)
      {
         var userId = GetUserId();

         var patient = await _patientService.GetByUserIdAsync(userId, true);

         var medic = await _medicService.GetByIdAsync(options.MedicId, true);

         var calendarEvent = await _calendarEventService.CreateCalendarEventAsync(new CalendarEventCreationOptionsDto
         {
            Title = CalendarEventType.Appointment.ToString(),
            Type = CalendarEventType.Appointment,
            StartAt = options.StartAt,
            EndAt = options.EndAt,
            ParticipantsIds = new List<Guid> { userId, medic.UserId }
         });

         var appointment = await _appointmentService.CreateAppointmentAsync(patient.Id, options.MedicId, calendarEvent.Id);

         return Ok(_mapper.Map<AppointmentDto>(appointment));
      }

      [Authorize(Roles = nameof(UserRoleType.Patient))]
      [HttpGet("current/appointments")]
      public async Task<ActionResult<Response<IEnumerable<AppointmentDto>>>> GetAppointmentsForCurrentAsync(AppointmentStatus? status = null)
      {
         var userId = GetUserId();

         var patient = await _patientService.GetByUserIdAsync(userId, true);

         var appointments = await _appointmentService.GetByPatientAsync(patient.Id, userId, status);

         return Ok(appointments.Select(o => _mapper.Map<AppointmentDto>(o)));
      }

      [Authorize(Roles =
         nameof(UserRoleType.Medic) + "," +
         nameof(UserRoleType.NonMedic) + "," +
         nameof(UserRoleType.Patient) + "," +
         nameof(UserRoleType.Guest))]
      [HttpGet("{id:guid}/appointments")]
      public async Task<ActionResult<Response<IEnumerable<AppointmentDto>>>> GetAppointmentsForPatientAsync(Guid id, AppointmentStatus? status = null)
      {
         var userId = GetUserId();

         var appointments = await _appointmentService.GetByPatientAsync(id, userId, status);

         return Ok(appointments.Select(o => _mapper.Map<AppointmentDto>(o)));
      }

      [Authorize(Roles = nameof(UserRoleType.Medic))]
      [HttpPost("{id:guid}/clinical-visits")]
      public async Task<ActionResult<Response<ClinicalVisitDto>>> CreateClinicalVisitAsync(Guid id, ClinicalVisitType type = ClinicalVisitType.InPatient)
      {
         var userId = GetUserId();

         var clinicalVisit = await _clinicalVisitService.CreateClinicalVisitAsync(userId, id, type);

         return Ok(_mapper.Map<ClinicalVisitDto>(clinicalVisit));
      }

      [Authorize(Roles = nameof(UserRoleType.Patient))]
      [HttpGet("current/clinical-visits")]
      public async Task<ActionResult<Response<IEnumerable<ClinicalVisitDto>>>> GetClinicalVisitsForCurrentAsync()
      {
         var userId = GetUserId();

         var patient = await _patientService.GetByUserIdAsync(userId, true);

         var clinicalVisits = await _clinicalVisitService.GetByPatientAsync(userId, patient.Id);

         return Ok(clinicalVisits.Select(o => _mapper.Map<ClinicalVisitDto>(o)));
      }

      [Authorize(Roles =
         nameof(UserRoleType.Medic) + "," +
         nameof(UserRoleType.Patient) + "," +
         nameof(UserRoleType.Guest))]
      [HttpGet("{id:guid}/clinical-visits")]
      public async Task<ActionResult<Response<IEnumerable<ClinicalVisitDto>>>> GetClinicalVisitsForPatientAsync(Guid id)
      {
         var userId = GetUserId();

         var clinicalVisits = await _clinicalVisitService.GetByPatientAsync(userId, id);

         return Ok(clinicalVisits.Select(o => _mapper.Map<ClinicalVisitDto>(o)));
      }

      [Authorize(Roles = nameof(UserRoleType.Medic))]
      [HttpPost("{id:guid}/medications")]
      public async Task<ActionResult<Response<MedicationDto>>> CreateMedicationAsync(Guid id, MedicationCreationOptionsDto options)
      {
         var userId = GetUserId();

         var medication = await _medicationService.CreateMedicationAsync(id, userId, options);

         return Ok(_mapper.Map<MedicationDto>(medication));
      }

      [Authorize(Roles = nameof(UserRoleType.Patient))]
      [HttpGet("current/medications")]
      public async Task<ActionResult<Response<IEnumerable<MedicationDto>>>> GetMedicationsForCurrentAsync()
      {
         var userId = GetUserId();

         var patient = await _patientService.GetByUserIdAsync(userId, true);

         var medications = await _medicationService.GetByPatientAsync(patient.Id, userId);

         return Ok(medications.Select(o => _mapper.Map<MedicationDto>(o)));
      }

      [Authorize(Roles =
         nameof(UserRoleType.Manager) + "," +
         nameof(UserRoleType.Medic) + "," +
         nameof(UserRoleType.NonMedic) + "," +
         nameof(UserRoleType.Patient) + "," +
         nameof(UserRoleType.Guest))]
      [HttpGet("{id:guid}/medications")]
      public async Task<ActionResult<Response<IEnumerable<MedicationDto>>>> GetMedicationsForPatientAsync(Guid id)
      {
         var userId = GetUserId();

         var medications = await _medicationService.GetByPatientAsync(id, userId);

         return Ok(medications.Select(o => _mapper.Map<MedicationDto>(o)));
      }

      [Authorize(Roles = nameof(UserRoleType.Patient))]
      [HttpGet("current/transactions")]
      public async Task<ActionResult<PaginatedResponse<TransactionDto>>> GetTransactionsForCurrentAsync(int page = 0, int pageSize = 30, string query = null)
      {
         var userId = GetUserId();

         var patient = await _patientService.GetByUserIdAsync(userId, true);

         var transactions = await _transactionService.GetByPatientAsync(patient.Id, page, pageSize, query);

         return Paginated<Transaction, TransactionDto>(transactions);
      }

      [Authorize(Roles =
         nameof(UserRoleType.Patient) + "," +
         nameof(UserRoleType.Guest))]
      [HttpGet("{id:guid}/transactions")]
      public async Task<ActionResult<PaginatedResponse<TransactionDto>>> GetTransactionsForPatientAsync(Guid id, int page = 0, int pageSize = 30, string query = null)
      {
         var userId = GetUserId();

         var transactions = await _transactionService.GetByPatientAsync(id, page, pageSize, query);

         return Paginated<Transaction, TransactionDto>(transactions);
      }

      [Authorize(Roles = nameof(UserRoleType.Patient))]
      [HttpGet("current/invoices")]
      public async Task<ActionResult<PaginatedResponse<InvoiceLiteDto>>> GetInvoicesForCurrentAsync(int page = 0, int pageSize = 30, string query = null)
      {
         var userId = GetUserId();

         var patient = await _patientService.GetByUserIdAsync(userId, true);

         var invoices = await _invoiceService.GetByPatientAsync(patient.Id, userId, page, pageSize, query);

         return Paginated<Invoice, InvoiceLiteDto>(invoices);
      }

      [Authorize(Roles =
         nameof(UserRoleType.Patient) + "," +
         nameof(UserRoleType.Guest))]
      [HttpGet("{id:guid}/invoices")]
      public async Task<ActionResult<PaginatedResponse<InvoiceLiteDto>>> GetInvoicesForPatientAsync(Guid id, int page = 0, int pageSize = 30, string query = null)
      {
         var userId = GetUserId();

         var patient = await _patientService.GetByUserIdAsync(id, true);

         var invoices = await _invoiceService.GetByPatientAsync(patient.Id, userId, page, pageSize, query);

         return Paginated<Invoice, InvoiceLiteDto>(invoices);
      }

      [Authorize(Roles = nameof(UserRoleType.Patient))]
      [HttpGet("current/vital-readings/latest")]
      public async Task<ActionResult<Response<VitalReadingDto>>> GetLatestVitalReadingForCurrentAsync()
      {
         var userId = GetUserId();

         var patient = await _patientService.GetByUserIdAsync(userId, true);

         var latestVitalReading = await _vitalReadingService.GetLatestByPatientAsync(userId, patient.Id);

         return Ok(_mapper.Map<VitalReadingDto>(latestVitalReading));
      }

      [Authorize(Roles =
         nameof(UserRoleType.Medic) + "," +
         nameof(UserRoleType.Patient) + "," +
         nameof(UserRoleType.Guest))]
      [HttpGet("{id:guid}/vital-readings/latest")]
      public async Task<ActionResult<Response<VitalReadingDto>>> GetLatestVitalReadingForPatientAsync(Guid id)
      {
         var userId = GetUserId();

         var latestVitalReading = await _vitalReadingService.GetLatestByPatientAsync(userId, id);

         return Ok(_mapper.Map<VitalReadingDto>(latestVitalReading));
      }

      [Authorize(Roles = nameof(UserRoleType.Patient))]
      [HttpGet("current/lab/tests")]
      public async Task<ActionResult<Response<IEnumerable<LabTestDto>>>> GetLabTestsForCurrentAsync()
      {
         var userId = GetUserId();

         var patient = await _patientService.GetByUserIdAsync(userId, true);

         var labTests = await _labService.GetLabTestsByPatientAsync(patient.Id, userId);

         return Ok(labTests.Select(o => _mapper.Map<LabTestDto>(o)));
      }

      [Authorize(Roles =
         nameof(UserRoleType.Medic) + "," +
         nameof(UserRoleType.Patient) + "," +
         nameof(UserRoleType.Guest))]
      [HttpGet("{id:guid}/lab/tests")]
      public async Task<ActionResult<Response<IEnumerable<LabTestDto>>>> GetLabTestsForPatientAsync(Guid id)
      {
         var userId = GetUserId();

         var labTests = await _labService.GetLabTestsByPatientAsync(userId, id);

         return Ok(labTests.Select(o => _mapper.Map<LabTestDto>(o)));
      }

      [Authorize(Roles = nameof(UserRoleType.Patient))]
      [HttpGet("current/lab/scans")]
      public async Task<ActionResult<Response<IEnumerable<LabScanDto>>>> GetLabScansForCurrentAsync()
      {
         var userId = GetUserId();

         var patient = await _patientService.GetByUserIdAsync(userId, true);

         var labScans = await _labService.GetLabScansByPatientAsync(patient.Id, userId);

         return Ok(labScans.Select(o => _mapper.Map<LabScanDto>(o)));
      }

      [Authorize(Roles =
         nameof(UserRoleType.Medic) + "," +
         nameof(UserRoleType.Patient) + "," +
         nameof(UserRoleType.Guest))]
      [HttpGet("{id:guid}/lab/scans")]
      public async Task<ActionResult<Response<IEnumerable<LabScanDto>>>> GetLabScansForPatientAsync(Guid id)
      {
         var userId = GetUserId();

         var labScans = await _labService.GetLabScansByPatientAsync(userId, id);

         return Ok(labScans.Select(o => _mapper.Map<LabScanDto>(o)));
      }

      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<PatientDto>>> GetByIdAsync(Guid id)
      {

         var patient = await _patientService.GetByIdAsync(id, true);

         return Ok(_mapper.Map<PatientDto>(patient));
      }

      [Authorize(Roles = nameof(UserRoleType.Manager) + "," + nameof(UserRoleType.Medic))]
      [HttpPatch("{id:guid}")]
      public async Task<ActionResult<Response<PatientDto>>> UpdatePatientAsync(Guid id, PatientUpdateOptionsDto options)
      {
         var userId = GetUserId();

         var patient = await _patientService.UpdatePatientAsync(userId, id, options);

         return Ok(_mapper.Map<PatientDto>(patient));
      }

      [Authorize(Roles = nameof(UserRoleType.Manager) + "," + nameof(UserRoleType.Medic))]
      [HttpPatch("{id:guid}/biodata")]
      public async Task<ActionResult<Response<PatientBiodataDto>>> UpdatePatientBiodataAsync(Guid id, PatientBiodataUpdateOptionsDto options)
      {
         var userId = GetUserId();

         var patientBiodata = await _patientService.UpdatePatientBiodataAsync(userId, id, options);

         return Ok(_mapper.Map<PatientBiodataDto>(patientBiodata));
      }

      [Authorize(Roles = nameof(UserRoleType.Manager) + "," + nameof(UserRoleType.Medic))]
      [HttpPatch("{id:guid}/social-history")]
      public async Task<ActionResult<Response<PatientSocialHistoryDto>>> UpdatePatientSocialHistoryAsync(Guid id, PatientSocialHistoryUpdateOptionsDto options)
      {
         var userId = GetUserId();

         var patientSocialHistory = await _patientService.UpdatePatientSocialHistoryAsync(userId, id, options);

         return Ok(_mapper.Map<PatientSocialHistoryDto>(patientSocialHistory));
      }

      [Authorize(Roles = nameof(UserRoleType.Manager) + "," + nameof(UserRoleType.Medic))]
      [HttpDelete("{id:guid}")]
      public async Task<ActionResult<Response>> DeleteAsync(Guid id)
      {
         var userId = GetUserId();

         await _patientService.DeletePatientAsync(userId, id);

         return Ok();
      }
   }
}