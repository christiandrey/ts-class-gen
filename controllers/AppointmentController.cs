using System;
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
   [Route("v{version:apiVersion}/appointments")]
   public class AppointmentController : BaseController
   {
      private readonly IAppointmentService _appointmentService;
      private readonly IMapper _mapper;

      public AppointmentController(
         IAppointmentService appointmentService,
         IMapper mapper) : base(mapper)
      {
         _appointmentService = appointmentService;
         _mapper = mapper;
      }

      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<AppointmentDto>>> GetByIdAsync(Guid id)
      {
         var appointment = await _appointmentService.GetByIdAsync(id, true);

         return Ok(_mapper.Map<AppointmentDto>(appointment));
      }

      [Authorize(Roles = nameof(UserRoleType.Medic))]
      [HttpPut("{id:guid}/status")]
      public async Task<ActionResult<Response<AppointmentDto>>> UpdateStatusAsync(Guid id, AppointmentStatusUpdateOptionsDto options)
      {
         var userId = GetUserId();

         var appointment = await _appointmentService.UpdateStatusAsync(userId, id, options.Status);

         return Ok(_mapper.Map<AppointmentDto>(appointment));
      }

      [Authorize(Roles = nameof(UserRoleType.Medic))]
      [HttpPatch("{id:guid}/reschedule")]
      public async Task<ActionResult<Response<AppointmentDto>>> RescheduleAsync(Guid id, CalendarEventUpdateOptionsDto options)
      {
         var userId = GetUserId();

         var appointment = await _appointmentService.RescheduleAppointmentAsync(userId, id, options);

         return Ok(_mapper.Map<AppointmentDto>(appointment));
      }
   }
}