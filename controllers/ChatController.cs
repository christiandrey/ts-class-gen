using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using AutoMapper;
using HealthGyro.Models.Dtos;
using HealthGyro.Models.Entities;
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
   [Route("v{version:apiVersion}/chats")]
   public class ChatController : BaseController
   {
      private readonly IChatService _chatService;
      private readonly IMapper _mapper;

      public ChatController(
         IChatService chatService,
         IMapper mapper) : base(mapper)
      {
         _chatService = chatService;
         _mapper = mapper;
      }

      [HttpPost("{id:guid}")]
      public async Task<ActionResult<Response<ChatDto>>> CreateAsync(Guid id, List<Guid> participantsIds)
      {
         var userId = GetUserId();

         var chat = await _chatService.CreateChatAsync(userId, participantsIds);

         return Ok(_mapper.Map<ChatDto>(chat));
      }

      [HttpPost("{id:guid}/messages")]
      public async Task<ActionResult<Response<ChatMessageDto>>> CreateMessageAsync(Guid id, ChatMessageCreationOptionsDto options)
      {
         var userId = GetUserId();

         var chatMessage = await _chatService.CreateChatMessageAsync(id, userId, options);

         return Ok(_mapper.Map<ChatMessageDto>(chatMessage));
      }

      [HttpGet("{id:guid}")]
      public async Task<ActionResult<Response<ChatDto>>> GetChatByIdAsync(Guid id)
      {
         var chat = await _chatService.GetChatByIdAsync(id, true);

         return Ok(_mapper.Map<ChatDto>(chat));
      }

      [HttpGet("")]
      public async Task<ActionResult<Response<IEnumerable<ChatDto>>>> GetChatsAsync()
      {
         var userId = GetUserId();

         var chats = await _chatService.GetChatsByUserAsync(userId);

         return Ok(chats.Select(o => _mapper.Map<ChatDto>(o)));
      }

      [HttpGet("{id:guid}/messages")]
      public async Task<ActionResult<PaginatedResponse<ChatMessageDto>>> GetChatMessagesAsync(Guid id, int page = 0, int pageSize = 30)
      {
         var userId = GetUserId();

         var chatMessages = await _chatService.GetChatMessagesByChat(id, userId, page, pageSize);

         return Paginated<ChatMessage, ChatMessageDto>(chatMessages);
      }

      [HttpGet("{id:guid}/messages/{messageId:guid}")]
      public async Task<ActionResult<Response<ChatMessageDto>>> GetChatMessageByIdAsync(Guid id, Guid messageId)
      {
         var chatMessage = await _chatService.GetChatMessageByIdAsync(messageId, true);

         return Ok(_mapper.Map<ChatMessageDto>(chatMessage));
      }
   }
}