using System;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using HealthGyro.Models.Dtos;
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
   [Route("v{version:apiVersion}/calendar-events")]
   public class CalendarEventController : BaseController
   {
      private readonly IAppointmentService _appointmentService;
      private readonly ICalendarEventService _calendarEventService;
      private readonly IMapper _mapper;

      public CalendarEventController(
         IAppointmentService appointmentService,
         ICalendarEventService calendarEventService,
         IMapper mapper) : base(mapper)
      {
         _appointmentService = appointmentService;
         _calendarEventService = calendarEventService;
         _mapper = mapper;
      }

      [HttpPost("")]
      public async Task<ActionResult<Response<CalendarEventDto>>> CreateAsync(CalendarEventCreationOptionsDto options)
      {
         var userId = GetUserId();

         var calendarEvent = await _calendarEventService.CreateCalendarEventAsync(userId, options);

         return Ok(_mapper.Map<CalendarEventDto>(calendarEvent));
      }

      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<CalendarEventDto>>> GetByIdAsync(Guid id)
      {
         var calendarEvent = await _calendarEventService.GetByIdAsync(id, true);

         return Ok(_mapper.Map<CalendarEventDto>(calendarEvent));
      }

      [HttpGet("{id:guid}/appointment")]
      public async Task<ActionResult<Response<AppointmentDto>>> GetAppointmentAsync(Guid id)
      {
         var appointment = await _appointmentService.GetByCalendarEventAsync(id, true);

         return Ok(_mapper.Map<AppointmentDto>(appointment));
      }

      [HttpPatch("{id:guid}")]
      public async Task<ActionResult<Response<CalendarEventDto>>> UpdateAsync(Guid id, CalendarEventUpdateOptionsDto options)
      {
         var userId = GetUserId();

         var calendarEvent = await _calendarEventService.UpdateCalendarEventAsync(userId, id, options);

         return Ok(_mapper.Map<CalendarEventDto>(calendarEvent));
      }

      [HttpDelete("{id:guid}")]
      public async Task<ActionResult<Response>> DeleteAsync(Guid id)
      {
         var userId = GetUserId();

         await _calendarEventService.DeleteCalendarEventAsync(userId, id);

         return Ok();
      }
   }
}