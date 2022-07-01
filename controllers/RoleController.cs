using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using Caretaker.Models.Dtos;
using Caretaker.Models.Entities;
using Caretaker.Models.Enums;
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Entities.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Caretaker.Controllers
{
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Authorize(Roles = nameof(UserRoleType.Admin))]
   [Route("v{version:apiVersion}/roles")]
   public class RoleController : BaseController
   {
      private readonly IRoleService _roleService;
      private readonly IMapper _mapper;

      public RoleController(IRoleService roleService, IMapper mapper) : base(mapper)
      {
         _roleService = roleService;
         _mapper = mapper;
      }

      [HttpGet("")]
      public async Task<ActionResult<Response<IEnumerable<RoleDto>>>> GetRolesAsync()
      {
         var roles = await _roleService.GetRolesAsync();

         return Ok(roles.Select(x => _mapper.Map<RoleDto>(x)));
      }

      [HttpPut("{roleId:guid}")]
      public async Task<ActionResult<Response<RoleDto>>> UpdateRoleAsync(Guid roleId, RoleDto dto)
      {
         var role = await _roleService.GetByIdAsync(roleId);

         if (role == null)
         {
            return NotFound();
         }

         var updatedRole = await _roleService.UpdateAsync(roleId, _mapper.Map<Role>(dto));

         return Ok(_mapper.Map<RoleDto>(updatedRole));
      }
   }
}