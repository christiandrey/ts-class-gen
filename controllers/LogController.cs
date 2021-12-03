using System;
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
   [Authorize(Roles = nameof(UserRoleType.Admin))]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/logs")]
   public class LogController : BaseController
   {
      private readonly IMapper _mapper;
      private readonly ILogService _logService;
      public LogController(
          IMapper mapper,
          ILogService logService) : base(mapper)
      {
         _mapper = mapper;
         _logService = logService;
      }

      [HttpGet("")]
      public async Task<ActionResult<PaginatedResponse<LogLiteDto>>> GetAsync(int page = 1, int pageSize = 30, LogLevel? level = null)
      {
         var logs = await _logService.GetAllAsync(page, pageSize, level);

         return Paginated<Log, LogLiteDto>(logs);
      }

      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<LogDto>>> GetByIdAsync(Guid id)
      {
         var log = await _logService.GetByIdAsync(id);

         return Ok(_mapper.Map<Log, LogDto>(log));
      }

      [HttpDelete("{id:guid}")]
      public async Task<ActionResult<Response>> DeleteByAsync(Guid id)
      {
         await _logService.DeleteByIdAsync(id);

         return Ok();
      }

      [HttpDelete("")]
      public async Task<ActionResult<Response>> DeleteAsync(DateTime? startDate, DateTime? endDate)
      {
         await _logService.DeleteByRangeAsync(startDate, endDate);

         return Ok();
      }
   }
}