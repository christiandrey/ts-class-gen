using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using Caretaker.Common.Constants;
using Caretaker.Models.Dtos;
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Utilities.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Caretaker.Controllers
{
   [Authorize]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/storage")]
   public class StorageController : BaseController
   {
      private readonly IStorageService _storageService;

      public StorageController(IStorageService storageService)
      {
         _storageService = storageService;
      }

      [HttpPost("")]
      public async Task<ActionResult<Response<ResourceDto>>> UploadAsync(IFormFile resource)
      {
         var uri = await _storageService.UploadResourceAsync(resource);

         if (string.IsNullOrEmpty(uri))
         {
            return BadRequest(ResponseMessages.ResourceNotAcceptable);
         }

         var dto = new ResourceDto
         {
            Uri = uri
         };

         return Ok(dto);
      }

      [HttpDelete("")]
      public async Task<ActionResult<Response>> DeleteAsync(ResourceDto dto)
      {

         var result = await _storageService.DeleteResourceAsync(dto.Uri);

         if (result)
         {
            return Ok();
         }

         return NotFound(ResponseMessages.ResourceNotExist);
      }

      [HttpDelete("multiple")]
      public ActionResult<Response> DeleteMultipleAsync(List<ResourceDto> dto)
      {
         _storageService.DeleteResources(dto.Select(o => o.Uri));

         return Ok();
      }
   }
}