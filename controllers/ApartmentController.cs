using System;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using Caretaker.Common.Constants;
using Caretaker.Models.Dtos;
using Caretaker.Models.Entities;
using Caretaker.Models.Enums;
using Caretaker.Models.Services.Management;
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Entities.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Caretaker.Controllers
{
   [Authorize]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/apartments")]
   public class ApartmentController : BaseController
   {
      private readonly IApartmentService _apartmentService;
      private readonly IResidentService _residentService;
      private readonly ILogger _logger;
      private readonly IMapper _mapper;

      public ApartmentController(
         IApartmentService apartmentService,
         IResidentService residentService,
         ILogger<ResidentController> logger,
         IMapper mapper) : base(mapper)
      {
         _apartmentService = apartmentService;
         _residentService = residentService;
         _mapper = mapper;
         _logger = logger;
      }

      [HttpPost("")]
      public async Task<ActionResult<Response<ApartmentDto>>> CreateAsync(ApartmentCreationOptionsDto options)
      {
         var userId = GetUserId();

         var apartment = await _apartmentService.CreateAsync(_mapper.Map<ApartmentCreationOptions>(options), userId);

         return Ok(_mapper.Map<ApartmentDto>(apartment));
      }

      [HttpGet("current")]
      public async Task<ActionResult<Response<ApartmentDto>>> GetCurrentAsync()
      {
         var userId = GetUserId();

         var resident = await _residentService.GetCurrentByUserIdAsync(userId);

         if (resident == null)
         {
            return NotFound(ResponseMessages.ApartmentNotExist);
         }

         return Ok(_mapper.Map<ApartmentDto>(resident.Apartment));
      }

      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<ApartmentDto>>> GetByIdAsync(Guid id)
      {
         var apartment = await _apartmentService.GetByIdAsync(id);

         if (apartment == null)
         {
            return NotFound(ResponseMessages.ApartmentNotExist);
         }

         return Ok(_mapper.Map<ApartmentDto>(apartment));
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpGet("")]
      public async Task<ActionResult<PaginatedResponse<ApartmentLiteDto>>> GetAllAsync(string query = null, int page = 1, int pageSize = 30)
      {
         var apartments = await _apartmentService.GetAllAsync(page, pageSize, query);

         return Paginated<Apartment, ApartmentLiteDto>(apartments);
      }

      [HttpPatch("{id:guid}")]
      public async Task<ActionResult<Response<ApartmentDto>>> UpdateAsync(Guid id, ApartmentUpdateOptionsDto options)
      {
         var apartment = await _apartmentService.UpdateAsync(id, _mapper.Map<ApartmentUpdateOptions>(options));

         return Ok(_mapper.Map<ApartmentDto>(apartment));
      }

      [HttpDelete("{id:guid}")]
      public async Task<ActionResult<Response>> DeleteAsync(Guid id)
      {
         var userId = GetUserId();

         await _apartmentService.DeleteAsync(id);

         return Ok();
      }
   }
}