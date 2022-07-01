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
   [Authorize]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/service-categories")]
   public class ServiceCategoryController : BaseController
   {
      private readonly IServiceCategoryService _serviceCategoryService;
      private readonly IMapper _mapper;

      public ServiceCategoryController(IServiceCategoryService serviceCategoryService, IMapper mapper) : base(mapper)
      {
         _serviceCategoryService = serviceCategoryService;
         _mapper = mapper;
      }

      [HttpGet("")]
      public async Task<ActionResult<Response<IEnumerable<ServiceCategoryDto>>>> GetAsync()
      {
         var serviceCategories = await _serviceCategoryService.GetServiceCategoriesAsync();

         return Ok(serviceCategories.Select(o => _mapper.Map<ServiceCategoryDto>(o)));
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpPost("")]
      public async Task<ActionResult<Response<ServiceCategoryDto>>> CreateAsync(ServiceCategoryCreationOptionsDto dto)
      {
         var serviceCategory = await _serviceCategoryService.CreateServiceCategoryAsync(_mapper.Map<ServiceCategory>(dto));

         return Ok(_mapper.Map<ServiceCategoryDto>(serviceCategory));
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpDelete("{id:guid}")]
      public async Task<ActionResult<Response>> DeleteAsync(Guid id)
      {
         await _serviceCategoryService.DeleteByIdAsync(id);

         return Ok();
      }
   }
}