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
   [Route("v{version:apiVersion}/managers")]
   public class ManagerController : BaseController
   {
      private readonly IManagerService _managerService;
      private readonly IMapper _mapper;

      public ManagerController(
         IManagerService managerService,
         IMapper mapper) : base(mapper)
      {
         _managerService = managerService;
         _mapper = mapper;
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpPost("")]
      public async Task<ActionResult<Response<ManagerDto>>> CreateAsync(ManagerCreationOptionsDto options)
      {
         var manager = await _managerService.CreateManagerAsync(options);

         return Ok(_mapper.Map<ManagerDto>(manager));
      }

      [Authorize(Roles = nameof(UserRoleType.Manager))]
      [HttpGet("current")]
      public async Task<ActionResult<Response<ManagerDto>>> GetCurrentAsync()
      {
         var userId = GetUserId();

         var manager = await _managerService.GetByUserIdAsync(userId, true);

         return Ok(_mapper.Map<ManagerDto>(manager));
      }

      [Authorize(Roles = nameof(UserRoleType.Manager))]
      [HttpPatch("current")]
      public async Task<ActionResult<Response<ManagerDto>>> UpdateCurrentAsync(ManagerUpdateOptionsDto options)
      {
         var userId = GetUserId();

         var manager = await _managerService.UpdateManagerAsync(userId, options);

         return Ok(_mapper.Map<ManagerDto>(manager));
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpDelete("{id:guid}")]
      public async Task<ActionResult<Response>> DeleteAsync(Guid id)
      {
         await _managerService.DeleteManagerAsync(id);

         return Ok();
      }
   }
}