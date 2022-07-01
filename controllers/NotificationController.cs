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
   [Route("v{version:apiVersion}/notifications")]
   public class NotificationController : BaseController
   {
      private readonly INotificationService _notificationService;
      private readonly IMapper _mapper;

      public NotificationController(
         INotificationService notificationService,
         IMapper mapper) : base(mapper)
      {
         _notificationService = notificationService;
         _mapper = mapper;
      }

      [HttpGet("")]
      public async Task<ActionResult<PaginatedResponse<NotificationDto>>> GetNotificationsAsync(int page = 1, int pageSize = 30)
      {
         var userId = GetUserId();

         var notifications = await _notificationService.GetByUserAsync(userId, page, pageSize);

         return Paginated<Notification, NotificationDto>(notifications);
      }
   }
}