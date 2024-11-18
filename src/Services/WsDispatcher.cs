using Gatemeter.Events;
using Il2CppGatekeeper.Char_Scripts.General;

namespace Gatemeter.Services;

public sealed class WsDispatcher : IDisposable
{
    private readonly WebSocketServer server;
    private readonly CharacterUtils charUtils;
    private readonly InventoryManager inventoryManager;
    private readonly GameResetEventEmitter gameResetEventEmitter;
    private readonly NewLevelEventEmitter newLevelEventEmitter;
    private readonly ICharacterStatsUpdateEventEmitter characterStatsUpdateEventEmitter;

    public WsDispatcher(WebSocketServer server, CharacterUtils charUtils, InventoryManager inventoryManager, GameResetEventEmitter gameResetEventEmitter, NewLevelEventEmitter newLevelEventEmitter, ICharacterStatsUpdateEventEmitter characterStatsUpdateEventEmitter)
    {
        this.server = server;
        this.charUtils = charUtils;
        this.inventoryManager = inventoryManager;
        this.gameResetEventEmitter = gameResetEventEmitter;
        this.newLevelEventEmitter = newLevelEventEmitter;
        this.characterStatsUpdateEventEmitter = characterStatsUpdateEventEmitter;

        server.OnClientConnected += OnClientConnected;
        gameResetEventEmitter.GameReset += OnReset;
        newLevelEventEmitter.NewLevel += OnNewLevel;
        characterStatsUpdateEventEmitter.CharacterStatsUpdated += OnCharacterStatsUpdated;
    }

    private void OnClientConnected(Guid client)
    {
        foreach (CharManager charMgr in charUtils.CharManagers())
        {
            int clientId = charMgr.GetClientId();

            server.Send(client, new InventoryMessage()
            {
                ClientId = clientId,
                Name = charMgr.GetPlayerName(),
                Items = inventoryManager.GetItems(clientId),
            });
        }
    }

    private void OnReset()
    {
        server.Broadcast(new ResetDataMessage());
    }

    private void OnNewLevel()
    {
        server.Broadcast(new NewLevelMessage());
    }

    private void OnCharacterStatsUpdated(ICharacterStatsUpdateEventEmitter.EventData data)
    {
        if (data.TotalData.Length > 0)
        {
            server.Broadcast(new CharacterStatsMessage() { Data = data.TotalData });
        }
        if (data.LevelData.Length > 0)
        {
            server.Broadcast(new LevelCharacterStatsMessage() { Data = data.LevelData });
        }
    }

    public void Dispose()
    {
        server.OnClientConnected -= OnClientConnected;
        gameResetEventEmitter.GameReset -= OnReset;
        newLevelEventEmitter.NewLevel -= OnNewLevel;
        characterStatsUpdateEventEmitter.CharacterStatsUpdated -= OnCharacterStatsUpdated;
    }
}
