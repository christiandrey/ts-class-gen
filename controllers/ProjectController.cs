using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using Caretaker.Common.Constants;
using Caretaker.Models.Dtos;
using Caretaker.Models.Entities;
using Caretaker.Models.Enums;
using Caretaker.Models.Services.Project;
using Caretaker.Models.Services.Review;
using Caretaker.Models.Utilities;
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
   [Route("v{version:apiVersion}/projects")]
   public class ProjectController : BaseController
   {
      private readonly IProjectService _projectService;
      private readonly IMapper _mapper;

      public ProjectController(
         IProjectService projectService,
         IMapper mapper) : base(mapper)
      {
         _projectService = projectService;
         _mapper = mapper;
      }

      [HttpPost("")]
      public async Task<ActionResult<Response<ProjectDto>>> CreateAsync(ProjectCreationOptionsDto dto)
      {
         var userId = GetUserId();

         var project = await _projectService.CreateAsync(_mapper.Map<ProjectCreationOptions>(dto), userId);

         return Ok(_mapper.Map<ProjectDto>(project));
      }

      [HttpPost("{id:guid}/messages")]
      public async Task<ActionResult<Response<ProjectMessageDto>>> CreateMessageAsync(Guid id, ProjectMessageCreationOptionsDto dto)
      {
         var userId = GetUserId();

         var projectMessage = await _projectService.CreateMessageAsync(new ProjectMessageCreationOptions
         {
            Body = dto.Body,
            Hash = dto.Hash,
            Type = dto.Type,
            ProjectId = id,
            UserId = userId
         });

         return Ok(_mapper.Map<ProjectMessageDto>(projectMessage));
      }

      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<ProjectDto>>> GetByIdAsync(Guid id)
      {
         var project = await _projectService.GetByIdAsync(id);

         if (project == null)
         {
            return NotFound(ResponseMessages.ProjectNotExist);
         }

         return Ok(_mapper.Map<ProjectDto>(project));
      }

      [HttpGet("{id:guid}/messages")]
      public async Task<ActionResult<Response<IEnumerable<ProjectMessageDto>>>> GetMessagesAsync(Guid id)
      {
         var project = await _projectService.GetByIdAsync(id);

         if (project == null)
         {
            return NotFound(ResponseMessages.ProjectNotExist);
         }

         var messages = project.Messages.OrderByDescending(o => o.CreatedAt);

         return Ok(messages.Select(o => _mapper.Map<ProjectMessageDto>(o)));
      }

      [HttpGet("{id:guid}/messages/{projectMessageId:guid}")]
      public async Task<ActionResult<Response<ProjectMessageDto>>> GetMessageByIdAsync(Guid id, Guid projectMessageId)
      {
         var projectMessage = await _projectService.GetMessageByIdAsync(projectMessageId, true);

         if (projectMessage.ProjectId != id)
         {
            return BadRequest(ResponseMessages.ProjectMessageNotExist);
         }

         return Ok(_mapper.Map<ProjectMessageDto>(projectMessage));
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpGet("")]
      public async Task<ActionResult<PaginatedResponse<ProjectLiteDto>>> GetAllAsync([FromQuery] ProjectQuery projectQuery, int page = 1, int pageSize = 30)
      {
         var projects = await _projectService.GetAllAsync(page, pageSize, projectQuery);

         return Paginated<Project, ProjectLiteDto>(projects);
      }

      [HttpPut("{id:guid}/assign/{vendorId:guid}")]
      public async Task<ActionResult<Response<ProjectDto>>> AssignVendorAsync(Guid id, Guid vendorId)
      {
         var userId = GetUserId();

         var project = await _projectService.UpdateVendorAsync(id, userId, vendorId);

         return Ok(_mapper.Map<ProjectDto>(project));
      }

      [HttpPut("{id:guid}/status")]
      public async Task<ActionResult<Response<ProjectDto>>> UpdateStatusAsync(Guid id, ProjectStatusUpdateDto dto)
      {
         var userId = GetUserId();

         var project = await _projectService.UpdateStatusAsync(id, userId, dto.Status);

         return Ok(_mapper.Map<ProjectDto>(project));
      }

      [HttpPost("{id:guid}/pay/{localAmount:decimal}")]
      public async Task<ActionResult<Response<ProjectDto>>> MakePaymentAsync(Guid id, decimal localAmount)
      {
         var userId = GetUserId();

         var project = await _projectService.MakePaymentAsync(id, userId, localAmount);

         return Ok(_mapper.Map<ProjectDto>(project));
      }

      [HttpPost("{id:guid}/review")]
      public async Task<ActionResult<Response<ReviewDto>>> ReviewAsync(Guid id, ReviewOptionsDto dto)
      {
         var userId = GetUserId();

         var review = await _projectService.RateAsync(_mapper.Map<ReviewOptions>(dto), id, userId);

         return Ok(_mapper.Map<ReviewDto>(review));
      }

      [HttpDelete("{id:guid}")]
      public async Task<ActionResult<Response>> DeleteAsync(Guid id)
      {
         var userId = GetUserId();

         await _projectService.DeleteAsync(id, userId);

         return Ok();
      }
   }
}