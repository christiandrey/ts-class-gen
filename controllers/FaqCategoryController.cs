using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using Caretaker.Models.Dtos;
using Caretaker.Models.Entities;
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
   [Route("v{version:apiVersion}/faq-categories")]
   public class FaqCategoryController : BaseController
   {
      private readonly IMapper _mapper;
      private readonly IFaqService _faqService;

      public FaqCategoryController(IMapper mapper, IFaqService faqService) : base(mapper)
      {
         _mapper = mapper;
         _faqService = faqService;
      }

      [HttpGet(""), AllowAnonymous]
      public async Task<ActionResult<Response<List<FaqCategoryDto>>>> GetAllCategoriesAsync(string query = null)
      {
         var faqCategories = await _faqService.GetFaqCategoriesAsync(query);

         var data = faqCategories.Select(x => _mapper.Map<FaqCategoryDto>(x)).ToList();

         return Ok(data);
      }

      [HttpGet("{categoryId:guid}"), AllowAnonymous]
      public async Task<ActionResult<Response<FaqCategoryDto>>> GetFaqCategoryByIdAsync(Guid categoryId)
      {
         var faqCategory = await _faqService.GetCategoryByIdAsync(categoryId);

         return Ok(_mapper.Map<FaqCategoryDto>(faqCategory));
      }

      [HttpPost("")]
      public async Task<ActionResult<Response<FaqCategoryDto>>> CreateFaqCategoryAsync(FaqCategoryCreationOptionsDto creationOptions)
      {
         var faqCategory = await _faqService.CreateCategoryAsync(_mapper.Map<FaqCategory>(creationOptions));

         return Ok(_mapper.Map<FaqCategoryDto>(faqCategory));
      }

      [HttpPut("{categoryId:guid}")]
      public async Task<ActionResult<Response<FaqCategoryDto>>> UpdateFaqCategoryAsync(Guid categoryId, FaqCategoryCreationOptionsDto creationOptions)
      {
         var faqCategory = await _faqService.UpdateCategoryAsync(categoryId, _mapper.Map<FaqCategory>(creationOptions));

         return Ok(_mapper.Map<FaqCategoryDto>(faqCategory));
      }

      [HttpDelete("{categoryId:guid}")]
      public async Task<ActionResult<Response>> DeleteFaqCategoryAsync(Guid categoryId)
      {
         await _faqService.DeleteFaqCategoryAsync(categoryId);

         return Ok();
      }
   }
}
