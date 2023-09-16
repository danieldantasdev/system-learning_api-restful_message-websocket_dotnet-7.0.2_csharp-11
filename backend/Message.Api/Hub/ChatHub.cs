using Microsoft.AspNetCore.SignalR;

namespace Message.Api.Hub;

public class ChatHub : Microsoft.AspNetCore.SignalR.Hub
{
    public Task SendMessage1(string user, string message)
    {
        return Clients.All.SendAsync("ReceiveOne", user, message);
    }
}