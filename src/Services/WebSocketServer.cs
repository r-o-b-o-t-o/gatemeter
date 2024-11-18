using MelonLoader;
using System.Text.Json;
using WatsonWebsocket;

namespace Gatemeter.Services;

public class WebSocketServer
{
    public interface IMessage
    {
        public string MessageType { get; }
    }

    public Action<Guid> OnClientConnected;
    public Action<Guid> OnClientDisconnected;
    private readonly WatsonWsServer server;

    public WebSocketServer(MelonLogger.Instance logger, string host, int port)
    {
        server = new WatsonWsServer(host, port, false);
        server.ClientConnected += ClientConnected;
        server.ClientDisconnected += ClientDisconnected;
        server.MessageReceived += MessageReceived;
        server.Start();
        logger.Msg("WebSocket server started on port " + port);
    }

    public async Task BroadcastAsync(IMessage message)
    {
        string json = JsonSerializer.Serialize<object>(message);

        foreach (ClientMetadata client in server.ListClients())
        {
            await server.SendAsync(client.Guid, json);
        }
    }

    public void Broadcast(IMessage message)
    {
        Task.Run(() => BroadcastAsync(message));
    }

    public async Task SendAsync(Guid client, IMessage message)
    {
        string json = JsonSerializer.Serialize<object>(message);
        await server.SendAsync(client, json);
    }

    public void Send(Guid client, IMessage message)
    {
        Task.Run(() => SendAsync(client, message));
    }

    private void ClientConnected(object sender, ConnectionEventArgs args)
    {
        OnClientConnected?.Invoke(args.Client.Guid);
    }

    private void ClientDisconnected(object sender, DisconnectionEventArgs args)
    {
        OnClientDisconnected?.Invoke(args.Client.Guid);
    }

    private void MessageReceived(object sender, MessageReceivedEventArgs args)
    { }
}
