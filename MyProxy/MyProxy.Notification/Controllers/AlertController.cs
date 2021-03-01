using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using MyProxy.Notification.Helpers;
using MyProxy.Notification.Hubs;
using MyProxy.Notification.Models;
using System.Threading.Tasks;

namespace MyProxy.Notification.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlertController : ControllerBase
    {
        private readonly IHubContext<NotificationHub> _hub;

        public AlertController(IHubContext<NotificationHub> hub)
        {
            _hub = hub;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            NotificationModel model = new NotificationModel()
            {
                Type = "alert",
                Message = "Notification triggered"
            };
            var timerManager = new TimerManager(async () => await _hub.Clients.All.SendAsync("ReceiveMessage", model));

            return Ok(new { Message = "Request Completed" });
        }
    }
}
