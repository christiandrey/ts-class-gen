using System;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using Caretaker.Common.Constants;
using Caretaker.Models.Dtos;
using Caretaker.Models.Entities;
using Caretaker.Models.Enums;
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Entities.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Caretaker.Controllers
{
   [Authorize]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/ghosts")]
   public class GhostController : BaseController
   {
      private readonly IGhostService _ghostService;
      private readonly IMapper _mapper;

      public GhostController(
         IGhostService ghostService,
         IMapper mapper) : base(mapper)
      {
         _ghostService = ghostService;
         _mapper = mapper;
      }

      [HttpGet("current")]
      public async Task<ActionResult<Response<GhostDto>>> GetCurrentAsync()
      {
         var userId = GetUserId();

         var ghost = await _ghostService.GetByUserIdAsync(userId);

         if (ghost == null)
         {
            return NotFound(ResponseMessages.GhostNotExist);
         }

         return Ok(_mapper.Map<GhostDto>(ghost));
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<GhostDto>>> GetByIdAsync(Guid id)
      {
         var ghost = await _ghostService.GetByIdAsync(id);

         if (ghost == null)
         {
            return NotFound(ResponseMessages.GhostNotExist);
         }

         return Ok(_mapper.Map<GhostDto>(ghost));
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpGet("")]
      public async Task<ActionResult<PaginatedResponse<GhostDto>>> GetAllAsync(string query = null, int page = 1, int pageSize = 30)
      {
         var ghosts = await _ghostService.GetAllAsync(page, pageSize, query);

         return Paginated<Ghost, GhostDto>(ghosts);
      }
   }
}