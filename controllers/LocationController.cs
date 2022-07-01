using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using Caretaker.Models.Dtos;
using Caretaker.Models.Entities;
using Caretaker.Models.Enums;
using Caretaker.Models.Services.GeoFencing;
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Entities.Interfaces;
using Caretaker.Services.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Caretaker.Controllers
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
      private readonly ILocationService _locationService;
      private readonly GeocodingService _geocodingService;
      private readonly RequestService _requestService;

      public LocationController(
          IMapper mapper,
          IStateService stateService,
          ICountryService countryService,
          ILocationService locationService,
          GeocodingService geocodingService,
          RequestService requestService) : base(mapper)
      {
         _mapper = mapper;
         _stateService = stateService;
         _countryService = countryService;
         _locationService = locationService;
         _geocodingService = geocodingService;
         _requestService = requestService;
      }

      [HttpGet("countries"), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<PaginatedResponse<CountryDto>>> GetCountriesAsync(int page = 1, int pageSize = 30, string query = null)
      {
         var countries = await _countryService.GetCountriesAsync(page, pageSize, query);

         return Paginated<Country, CountryDto>(countries);
      }

      [HttpGet("countries/active")]
      public async Task<ActionResult<Response<IEnumerable<CountryDto>>>> GetActiveCountriesAsync()
      {
         var countries = await _countryService.GetActiveCountriesAsync();

         return Ok(countries.Select(_mapper.Map<CountryDto>));
      }

      [HttpPut("countries/{id:guid}"), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response<CountryDto>>> UpdateCountryAsync(Guid id, UpdatedCountryDto updatedCountryDto)
      {
         var updatedCountry = await _countryService.UpdateAsync(id, _mapper.Map<Country>(updatedCountryDto));

         return Ok(_mapper.Map<CountryDto>(updatedCountry));
      }

      [HttpGet("countries/{id:guid}"), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response<CountryDto>>> GetCountryAsync(Guid id)
      {
         var country = await _countryService.GetByIdAsync(id);

         return Ok(_mapper.Map<CountryDto>(country));
      }

      [HttpPut("countries/{id:guid}/activate"), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response<CountryDto>>> ActivateCountryAsync(Guid id)
      {
         var updatedCountry = await _countryService.ActivateAsync(id);

         return Ok(_mapper.Map<CountryDto>(updatedCountry));
      }

      [HttpPut("countries/{id:guid}/deactivate"), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response<CountryDto>>> DeactivateCountryAsync(Guid id)
      {
         var updatedCountry = await _countryService.DeactivateAsync(id);

         return Ok(_mapper.Map<CountryDto>(updatedCountry));
      }

      [HttpGet("countries/{id:guid}/states"), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<PaginatedResponse<StateDto>>> GetStatesByCountryAsync(Guid id, int page = 1, int pageSize = 30, string query = null)
      {
         var states = await _stateService.GetByCountryIdAsync(id, page, pageSize, query);

         return Paginated<State, StateDto>(states);
      }

      [HttpGet("states"), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<PaginatedResponse<StateDto>>> GetStatesAsync(int page = 1, int pageSize = 30, string query = null)
      {
         var states = await _stateService.GetStatesAsync(page, pageSize, query);

         return Paginated<State, StateDto>(states);
      }

      [HttpPut("states/{id:guid}"), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response<StateDto>>> UpdateStateAsync(Guid id, UpdatedStateDto updatedStateDto)
      {
         var updatedState = await _stateService.UpdateAsync(id, _mapper.Map<State>(updatedStateDto));

         return Ok(_mapper.Map<StateDto>(updatedState));
      }

      [HttpPut("states/{id:guid}/activate"), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response<StateDto>>> ActivateStateAsync(Guid id)
      {
         var updatedState = await _stateService.ActivateAsync(id);

         return Ok(_mapper.Map<StateDto>(updatedState));
      }

      [HttpPut("states/{id:guid}/deactivate"), Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response<StateDto>>> DeactivateStateAsync(Guid id)
      {
         var updatedState = await _stateService.DeactivateAsync(id);

         return Ok(_mapper.Map<StateDto>(updatedState));
      }

      [HttpGet("geocode/{placeId}")]
      public async Task<ActionResult<Response<LocationDto>>> GeocodeAddressByPlaceIdAsync(string placeId)
      {
         var location = await _locationService.GeocodePlaceAsync(placeId);

         return Ok(_mapper.Map<LocationDto>(location));
      }

      [HttpGet("geocode/{latitude}/{longitude}")]
      public async Task<ActionResult<Response<LocationDto>>> GeocodeAddressByLocationAsync(double latitude, double longitude)
      {
         var location = await _locationService.GeocodeLocationAsync(latitude, longitude);

         return Ok(_mapper.Map<LocationDto>(location));
      }

      [HttpGet("search"), ResponseCache(Duration = 300, VaryByQueryKeys = new[] { "*" })]
      public async Task<ActionResult<Response<List<AutoCompleteResultDto>>>> SearchAsync(string query, double latitude, double longitude)
      {
         var results = await _geocodingService.GetAutoCompleteResultsAsync(query, latitude, longitude);

         return Ok(results);
      }

      [HttpPost("directions")]
      public async Task<ActionResult<Response<List<GeoCoordinates>>>> GetDirectionsAsync(List<string> placeIds)
      {
         var polyline = await _geocodingService.GetDirectionsAsync(placeIds);

         if (polyline == null)
         {
            return Ok(new List<GeoCoordinates> { });
         }

         var points = _geocodingService.DecodePolyline(polyline);

         return Ok(points);
      }

      [HttpPost("directions/polyline")]
      public async Task<ActionResult<Response<PolylineDto>>> GetPolylineDirectionsAsync(List<string> placeIds)
      {
         var polyline = await _geocodingService.GetDirectionsAsync(placeIds);

         return Ok(new PolylineDto(polyline));
      }

      [HttpGet("geolocate")]
      public async Task<ActionResult<Response<LocationDto>>> GeolocateAsync()
      {
         var geoCoordinates = await _requestService.GetRequestGeoCoordinatesAsync();

         var location = await _locationService.GeocodeLocationAsync(geoCoordinates.Latitude, geoCoordinates.Longitude);

         return Ok(_mapper.Map<LocationDto>(location));
      }
   }
}