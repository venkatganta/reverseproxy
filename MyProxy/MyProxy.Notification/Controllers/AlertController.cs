using Microsoft.AspNetCore.Mvc;
using MyProxy.Notification.Models;
using System.Collections.Generic;

namespace MyProxy.Notification.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlertController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<NotificationModel> Get()
        {
            List<NotificationModel> notifications = new List<NotificationModel>()
            {
                new NotificationModel(){ Type="Success",Message="TEST Success" },
                new NotificationModel(){ Type="Fail",Message="TEST Fail" }
            };
            return notifications;
        }
    }
}
