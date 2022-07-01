using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using Caretaker.Common.Constants;
using Caretaker.Models.Dtos;
using Caretaker.Models.Entities;
using Caretaker.Models.Enums;
using Caretaker.Models.Utilities.Response;
using Caretaker.Services.Entities.Interfaces;
using Caretaker.Services.Permissions.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Caretaker.Controllers
{
   [Authorize]
   [ApiController]
   [ApiVersion("1")]
   [Produces(MediaTypeNames.Application.Json)]
   [Route("v{version:apiVersion}/community")]
   public class CommunityController : BaseController
   {
      private readonly ICommunityService _communityService;
      private readonly IPermissionsService _permissionsService;
      private readonly IMapper _mapper;

      public CommunityController(
         ICommunityService communityService,
         IPermissionsService permissionsService,
         IMapper mapper) : base(mapper)
      {
         _communityService = communityService;
         _permissionsService = permissionsService;
         _mapper = mapper;
      }

      [HttpPost("categories")]
      [Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response<CommunityCategoryDto>>> CreateCategoryAsync(CommunityCategoryCreationOptionsDto dto)
      {
         var category = await _communityService.CreateCategoryAsync(_mapper.Map<CommunityCategory>(dto));

         return Ok(_mapper.Map<CommunityCategoryDto>(category));
      }

      [HttpPost("topics")]
      public async Task<ActionResult<Response<CommunityTopicDto>>> CreateTopicAsync(CommunityTopicCreationOptionsDto dto)
      {
         var userId = GetUserId();

         await _permissionsService.AssertOrganizationCommunityScopeAsync(dto.EstateId, userId, OrganizationScopes.CommunityContribute);

         var topic = await _communityService.CreateTopicAsync(userId, _mapper.Map<CommunityTopic>(dto));

         return Ok(_mapper.Map<CommunityTopicDto>(topic));
      }

      [HttpGet("topics/{topicId:guid}")]
      public async Task<ActionResult<Response<CommunityTopicDto>>> GetTopicByIdAsync(Guid topicId)
      {
         var topic = await _communityService.GetTopicByIdAsync(topicId, true);

         return Ok(_mapper.Map<CommunityTopicDto>(topic));
      }

      [HttpPost("topics/{topicId:guid}/comments")]
      public async Task<ActionResult<Response<CommunityCommentDto>>> CreateCommentAsync(Guid topicId, CommunityCommentCreationOptionsDto dto)
      {
         var userId = GetUserId();

         var comment = await _communityService.CreateCommentAsync(userId, topicId, _mapper.Map<CommunityComment>(dto));

         return Ok(_mapper.Map<CommunityCommentDto>(comment));
      }

      [HttpGet("topics/{topicId:guid}/comments")]
      public async Task<ActionResult<Response<IEnumerable<CommunityCommentDto>>>> GetTopicCommentsAsync(Guid topicId)
      {
         var comments = await _communityService.GetCommentsByTopicIdAsync(topicId);

         return Ok(comments.Select(o => _mapper.Map<CommunityCommentDto>(o)));
      }

      [HttpGet("topics/{topicId:guid}/comments/{commentId:guid}")]
      public async Task<ActionResult<Response<CommunityCommentDto>>> GetTopicCommentByIdAsync(Guid topicId, Guid commentId)
      {
         var comment = await _communityService.GetCommentByIdAsync(commentId);

         if (comment.TopicId != topicId)
         {
            return BadRequest(ResponseMessages.CommunityCommentNotExist);
         }

         return Ok(_mapper.Map<CommunityCommentDto>(comment));
      }

      [HttpDelete("categories/{categoryId:guid}")]
      [Authorize(Roles = nameof(UserRoleType.Admin))]
      public async Task<ActionResult<Response>> DeleteCategoryAsync(Guid categoryId)
      {
         await _communityService.DeleteCategoryByIdAsync(categoryId);

         return Ok();
      }

      [HttpDelete("topics/{topicId:guid}")]
      public async Task<ActionResult<Response>> DeleteTopicAsync(Guid topicId)
      {
         var userId = GetUserId();

         await _communityService.DeleteTopicByIdAsync(topicId, userId);

         return Ok();
      }

      [HttpDelete("topics/{topicId:guid}/comments/{commentId:guid}")]
      public async Task<ActionResult<Response>> DeleteCommentAsync(Guid topicId, Guid commentId)
      {
         var userId = GetUserId();

         await _communityService.DeleteCommentByIdAsync(commentId, userId);

         return Ok();
      }
   }
}