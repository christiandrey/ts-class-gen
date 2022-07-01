using System;
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
   [Route("v{version:apiVersion}/faqs")]
   public class FaqController : BaseController
   {
      private readonly IMapper _mapper;
      private readonly IFaqService _faqService;

      public FaqController(IMapper mapper, IFaqService faqService) : base(mapper)
      {
         _mapper = mapper;
         _faqService = faqService;
      }

      [HttpGet("")]
      public async Task<ActionResult<PaginatedResponse<FaqDto>>> GetAllFaqsAsync(string query = null, int page = 1, int pageSize = 30, Guid? categoryId = null)
      {
         var faqs = await _faqService.GetFaqsAsync(query, page, pageSize, categoryId);

         return Paginated<Faq, FaqDto>(faqs);
      }

      [HttpGet("{faqId:guid}")]
      public async Task<ActionResult<Response<FaqDto>>> GetFaqByIdAsync(Guid faqId)
      {
         var faq = await _faqService.GetFaqByIdAsync(faqId);

         return Ok(_mapper.Map<FaqDto>(faq));
      }

      [HttpPost("")]
      [Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response<FaqDto>>> CreateFaqAsync(FaqCreationOptionsDto creationOptions)
      {
         var faq = await _faqService.CreateFaqAsync(_mapper.Map<Faq>(creationOptions));

         return Ok(_mapper.Map<FaqDto>(faq));
      }

      [HttpPut("{faqId:guid}")]
      [Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response<FaqDto>>> UpdateFaqAsync(Guid faqId, FaqCreationOptionsDto creationOptions)
      {
         var faq = await _faqService.UpdateFaqAsync(faqId, _mapper.Map<Faq>(creationOptions));

         return Ok(_mapper.Map<FaqDto>(faq));
      }

      [HttpDelete("{faqId:guid}")]
      [Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response>> DeleteFaqAsync(Guid faqId)
      {
         await _faqService.DeleteFaqAsync(faqId);

         return Ok();
      }
   }
}