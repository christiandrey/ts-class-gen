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
   [Route("v{version:apiVersion}/currencies")]
   public class CurrencyController : BaseController
   {
      private readonly ICurrencyService _currencyService;
      private readonly IMapper _mapper;

      public CurrencyController(ICurrencyService currencyService, IMapper mapper) : base(mapper)
      {
         _currencyService = currencyService;
         _mapper = mapper;
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpGet("")]
      public async Task<ActionResult<Response<IEnumerable<CurrencyDto>>>> GetCurrenciesAsync()
      {
         var currencies = await _currencyService.GetCurrenciesAsync();

         return Ok(currencies.Select(o => _mapper.Map<CurrencyDto>(o)));
      }

      [HttpGet("current")]
      public async Task<ActionResult<Response<CurrencyDto>>> GetCurrencyForCurrentRegionAsync()
      {
         var currency = await _currencyService.GetByRegionCodeOrDefaultAsync();

         var currencyDto = _mapper.Map<CurrencyDto>(currency);

         return Ok(currencyDto);
      }

      [Authorize(Roles = nameof(UserRoleType.Admin))]
      [HttpPut("{currencyId:guid}")]
      public async Task<ActionResult<Response<CurrencyDto>>> UpdateCurrencyAsync(Guid currencyId, UpdatedCurrencyDto dto)
      {
         var updatedCurrency = await _currencyService.UpdateAsync(currencyId, _mapper.Map<Currency>(dto));

         var currencyDto = _mapper.Map<CurrencyDto>(updatedCurrency);

         return Ok(currencyDto);
      }
   }
}