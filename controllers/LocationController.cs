using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using HealthGyro.Models.Dtos;
using HealthGyro.Models.Enums;
using HealthGyro.Models.Utilities.Response;
using HealthGyro.Services.Entities.Interfaces;
using HealthGyro.Services.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthGyro.Controllers
{
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/locations")]
   public class LocationController : BaseController
   {
      private readonly IMapper _mapper;
      private readonly IStateService _stateService;
      private readonly ICountryService _countryService;

      public LocationController(
          IMapper mapper,
          IStateService stateService,
          ICountryService countryService,
          RequestService requestService) : base(mapper)
      {
         _mapper = mapper;
         _stateService = stateService;
         _countryService = countryService;
      }

      [HttpGet("countries"), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response<IEnumerable<CountryDto>>>> GetCountriesAsync()
      {
         var countries = await _countryService.GetCountriesAsync();

         return Ok(countries.Select(_mapper.Map<CountryDto>));
      }

      [HttpGet("countries/{id:guid}/states"), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response<IEnumerable<StateDto>>>> GetStatesByCountryAsync(Guid id)
      {
         var states = await _stateService.GetByCountryIdAsync(id);

         return Ok(states.Select(_mapper.Map<StateDto>));
      }
   }
}