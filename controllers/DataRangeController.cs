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
   [Route("v{version:apiVersion}/data-ranges")]
   public class DataRangeController : BaseController
   {
      private readonly IDataRangeService _dataRangeService;
      private readonly IMapper _mapper;

      public DataRangeController(
         IDataRangeService dataRangeService,
         IMapper mapper) : base(mapper)
      {
         _dataRangeService = dataRangeService;
         _mapper = mapper;
      }

      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<DataRangeDto>>> GetByIdAsync(Guid id)
      {
         var dataRange = await _dataRangeService.GetByIdAsync(id, true);

         return Ok(_mapper.Map<DataRangeDto>(dataRange));
      }

      [Authorize(Roles = nameof(UserRoleType.Manager))]
      [HttpPatch("{id:guid}")]
      public async Task<ActionResult<Response<DataRangeDto>>> UpdateAsync(Guid id, DataRangeUpdateOptionsDto options)
      {
         var userId = GetUserId();

         var dataRange = await _dataRangeService.UpdateDataRangeAsync(userId, id, options);

         return Ok(_mapper.Map<DataRangeDto>(dataRange));
      }

      [Authorize(Roles = nameof(UserRoleType.Manager))]
      [HttpDelete("{id:guid}")]
      public async Task<ActionResult<Response>> DeleteAsync(Guid id)
      {
         var userId = GetUserId();

         await _dataRangeService.DeleteDataRangeAsync(userId, id);

         return Ok();
      }
   }
}