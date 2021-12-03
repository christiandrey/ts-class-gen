using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using HealthGyro.Models.Dtos;
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
   [Route("v{version:apiVersion}/medics")]
   public class MedicController : BaseController
   {
      private readonly IAppointmentService _appointmentService;
      private readonly ICalendarEventService _calendarEventService;
      private readonly IMedicService _medicService;
      private readonly IMapper _mapper;

      public MedicController(
         IAppointmentService appointmentService,
         ICalendarEventService calendarEventService,
         IMedicService medicService,
         IMapper mapper) : base(mapper)
      {
         _appointmentService = appointmentService;
         _calendarEventService = calendarEventService;
         _medicService = medicService;
         _mapper = mapper;
      }

      [Authorize(Roles = nameof(UserRoleType.Medic))]
      [HttpGet("current")]
      public async Task<ActionResult<Response<MedicDto>>> GetCurrentAsync()
      {
         var userId = GetUserId();

         var medic = await _medicService.GetByUserIdAsync(userId, true);

         return Ok(_mapper.Map<MedicDto>(medic));
      }

      [Authorize(Roles = nameof(UserRoleType.Medic))]
      [HttpPatch("current")]
      public async Task<ActionResult<Response<MedicDto>>> UpdateCurrentAsync(MedicUpdateOptionsDto options)
      {
         var userId = GetUserId();

         var medic = await _medicService.UpdateMedicAsync(userId, options);

         return Ok(_mapper.Map<MedicDto>(medic));
      }

      [Authorize(Roles = nameof(UserRoleType.Medic))]
      [HttpGet("current/appointments")]
      public async Task<ActionResult<Response<IEnumerable<AppointmentDto>>>> GetAppointmentsForCurrentAsync(AppointmentStatus? status = null)
      {
         var userId = GetUserId();

         var medic = await _medicService.GetByUserIdAsync(userId, true);

         var appointments = await _appointmentService.GetByMedicAsync(medic.Id, status);

         return Ok(appointments.Select(o => _mapper.Map<AppointmentDto>(o)));
      }

      [Authorize(Roles = nameof(UserRoleType.NonMedic))]
      [HttpGet("{id:guid}/appointments")]
      public async Task<ActionResult<Response<IEnumerable<AppointmentDto>>>> GetAppointmentsByMedicAsync(Guid id, AppointmentStatus? status = null)
      {
         var appointments = await _appointmentService.GetByMedicAsync(id, status);

         return Ok(appointments.Select(o => _mapper.Map<AppointmentDto>(o)));
      }

      [Authorize(Roles = nameof(UserRoleType.Manager))]
      [HttpPut("{id:guid}/services")]
      public async Task<ActionResult<Response<MedicDto>>> UpdateServicesAsync(Guid id, List<Guid> servicesIds)
      {
         var userId = GetUserId();

         var medic = await _medicService.UpdateServicesAsync(userId, id, servicesIds);

         return Ok(_mapper.Map<MedicDto>(medic));
      }

      [Authorize(Roles = nameof(UserRoleType.Manager))]
      [HttpDelete("{id:guid}")]
      public async Task<ActionResult<Response>> DeleteAsync(Guid id)
      {
         await _medicService.DeleteMedicAsync(id);

         return Ok();
      }
   }
}