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
using Caretaker.Models.Services.Management;
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
   [Route("v{version:apiVersion}/vendors")]
   public class VendorController : BaseController
   {
      private readonly IVendorService _vendorService;
      private readonly IProjectService _projectService;
      private readonly IReviewService _reviewService;
      private readonly IMapper _mapper;

      public VendorController(
         IVendorService vendorService,
         IProjectService projectService,
         IReviewService reviewService,
         IMapper mapper) : base(mapper)
      {
         _vendorService = vendorService;
         _projectService = projectService;
         _reviewService = reviewService;
         _mapper = mapper;
      }

      [HttpPost("")]
      public async Task<ActionResult<Response<VendorDto>>> CreateAsync(VendorCreationOptionsDto dto)
      {
         var userId = GetUserId();

         var vendor = await _vendorService.CreateAsync(userId, _mapper.Map<VendorCreationOptions>(dto));

         return Ok(_mapper.Map<VendorDto>(vendor));
      }

      [HttpGet("current")]
      public async Task<ActionResult<Response<VendorDto>>> GetCurrentAsync()
      {
         var userId = GetUserId();

         var vendor = await _vendorService.GetByUserIdAsync(userId);

         if (vendor == null)
         {
            return NotFound(ResponseMessages.VendorNotExist);
         }

         return Ok(_mapper.Map<VendorDto>(vendor));
      }

      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<VendorDto>>> GetByIdAsync(Guid id)
      {
         var vendor = await _vendorService.GetByIdAsync(id);

         if (vendor == null)
         {
            return NotFound(ResponseMessages.VendorNotExist);
         }

         return Ok(_mapper.Map<VendorDto>(vendor));
      }

      [Authorize(Roles = nameof(UserRoleType.FacilityManager) + "," + nameof(UserRoleType.Admin))]
      [HttpGet("")]
      public async Task<ActionResult<PaginatedResponse<VendorLiteDto>>> GetAllAsync(string query = null, int page = 1, int pageSize = 30)
      {
         var vendors = await _vendorService.GetAllAsync(page, pageSize, query);

         return Paginated<Vendor, VendorLiteDto>(vendors);
      }

      [HttpGet("current/projects")]
      public async Task<ActionResult<PaginatedResponse<ProjectLiteDto>>> GetProjectsAsync([FromQuery] ProjectQuery projectQuery, int page = 1, int pageSize = 30)
      {
         var userId = GetUserId();

         var vendor = await _vendorService.GetByUserIdAsync(userId, true);

         var projects = await _projectService.GetAllByVendorAsync(vendor.Id, page, pageSize, projectQuery);

         return Paginated<Project, ProjectLiteDto>(projects);
      }

      [HttpGet("{id:guid}/projects")]
      public async Task<ActionResult<PaginatedResponse<ProjectLiteDto>>> GetProjectsByVendorAsync(Guid id, [FromQuery] ProjectQuery projectQuery, int page = 1, int pageSize = 30)
      {
         var projects = await _projectService.GetAllByVendorAsync(id, page, pageSize, projectQuery);

         return Paginated<Project, ProjectLiteDto>(projects);
      }

      [HttpGet("{id:guid}/reviews")]
      public async Task<ActionResult<Response<IEnumerable<ReviewDto>>>> GetReviewsAsync(Guid id)
      {
         var reviews = await _reviewService.GetReviewsByVendorAsync(id);

         return Ok(reviews.Select(o => _mapper.Map<ReviewDto>(o)));
      }
   }
}