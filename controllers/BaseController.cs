using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using AutoMapper;
using Caretaker.Common.Constants;
using Caretaker.Common.Models;
using Caretaker.Models.Utilities.Response;
using Microsoft.AspNetCore.Mvc;

namespace Caretaker.Controllers
{
   public class BaseController : ControllerBase
   {
      private readonly IMapper _mapper;

      public BaseController(IMapper mapper)
      {
         _mapper = mapper;
      }

      public BaseController()
      {

      }

      protected BadRequestObjectResult BadRequest(string message)
      {
         return BadRequest(new BadRequestResponse()
         {
            Message = ResponseMessages.BadRequest,
            Errors = new List<ResponseError>
                {
                    new ResponseError(message)
                }
         });
      }

      protected BadRequestObjectResult BadRequest(string propertyName, string message)
      {
         return BadRequest(new BadRequestResponse()
         {
            Message = ResponseMessages.BadRequest,
            Errors = new List<ResponseError>
                {
                    new ResponseError(propertyName, message)
                }
         });
      }

      protected NotFoundObjectResult NotFound(string message = null)
      {
         return NotFound(new Response()
         {
            Message = !string.IsNullOrEmpty(message) ? message : ResponseMessages.NotFound
         });
      }

      protected ActionResult<PaginatedResponse<T>> Paginated<T>(PaginatedList<T> data, string message = null)
      {
         return new PaginatedResponse<T>
         {
            Message = message ?? ResponseMessages.Ok,
            Data = data,
            Meta = new PaginatedResponseMeta
            {
               CurrentPage = data.CurrentPage,
               PerPage = data.PerPage,
               TotalItems = data.TotalItems,
               TotalPages = data.NoOfPages
            }
         };
      }

      protected ActionResult<PaginatedResponse<TDestination>> Paginated<TSource, TDestination>(PaginatedList<TSource> data)
      {
         return new PaginatedResponse<TDestination>
         {
            Message = ResponseMessages.Ok,
            Data = data.Select(x => _mapper.Map<TDestination>(x)),
            Meta = new PaginatedResponseMeta
            {
               CurrentPage = data.CurrentPage,
               PerPage = data.PerPage,
               TotalItems = data.TotalItems,
               TotalPages = data.NoOfPages
            }
         };
      }

      protected ActionResult<Response<T>> Ok<T>(T data, string message = null)
      {
         return new Response<T>
         {
            Message = message ?? ResponseMessages.Ok,
            Data = data
         };
      }

      protected ActionResult<Response> Ok(string message = null)
      {
         return new Response
         {
            Message = message ?? ResponseMessages.Ok
         };
      }

      protected Guid GetUserId()
      {
         var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

         Guid.TryParse(userId, out var parsedId);

         return parsedId;
      }
   }
}