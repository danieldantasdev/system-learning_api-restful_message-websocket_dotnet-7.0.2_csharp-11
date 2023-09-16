using Message.Api.Dtos;
using Message.Api.Hub;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Message.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ChatController : ControllerBase
{
    private readonly IHubContext<ChatHub> _hubContext;

    public ChatController(IHubContext<ChatHub> hubContext)
    {
        _hubContext = hubContext;
    }

    [Route("send")]
    [HttpPost]
    public IActionResult SendRequest([FromBody] MessageDto msg)
    {
        _hubContext.Clients.All.SendAsync("ReceiveOne", msg.User, msg.MensagemTexto);
        return Ok("Mensagem enviada!");
    }
}