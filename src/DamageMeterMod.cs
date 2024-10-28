using Il2CppGatekeeper.Char_Scripts.General;
using MelonLoader;
using UnityEngine;

namespace GatekeeperDamageMeter;

public class DamageMeterMod : MelonMod
{
    private IHost host;
    private IServiceProvider services;

    private MelonPreferences_Category config;
    private MelonPreferences_Entry<int> staticServerPort;
    private MelonPreferences_Entry<string> wsServerHost;
    private MelonPreferences_Entry<int> wsServerPort;
    private string lastScene = "";

    public override void OnInitializeMelon()
    {
        config = MelonPreferences.CreateCategory("Gatemeter");
        staticServerPort = config.CreateEntry("UIServerPort", 5000);
        wsServerHost = config.CreateEntry("WSServerHost", "localhost");
        wsServerPort = config.CreateEntry("WSServerPort", 5001);

        IHostBuilder builder = Host.CreateDefaultBuilder();
        builder.ConfigureServices(
            servicesBuilder => servicesBuilder
                .AddScoped<CharacterUtils>()
                .AddSingleton<InventoryManager>()
#if !DEBUG
                .AddSingleton(new StaticWebServer(Path.Combine(Path.GetDirectoryName(MelonAssembly.Location), "GatekeeperDamageMeter"), staticServerPort.Value))
#endif
                .AddSingleton(new WebSocketServer(wsServerHost.Value, wsServerPort.Value))
        );

        host = builder.Build();
        services = Services();

        services.GetRequiredService<WebSocketServer>().OnClientConnected += WsOnClientConnected;
    }

    public IServiceProvider Services()
    {
        return host.Services.CreateScope().ServiceProvider;
    }

    public override void OnSceneWasInitialized(int buildIndex, string sceneName)
    {
        if (lastScene == "MainMenu")
        {
            InventoryManager inventoryMgr = services.GetRequiredService<InventoryManager>();
            inventoryMgr.Reset();

            WebSocketServer ws = services.GetRequiredService<WebSocketServer>();
            ws.Broadcast(new ResetDataMessage());
        }

        lastScene = sceneName;
    }

    public override void OnUpdate()
    {
        if (Time.frameCount % 10 == 0)
        {
            SendCharacterStats();
        }
    }

    private void SendCharacterStats()
    {
        CharacterUtils charUtils = services.GetRequiredService<CharacterUtils>();
        CharacterStatsMessageData[] data = charUtils.CharManagers().Select(c => new CharacterStatsMessageData()
        {
            ClientId = c.GetClientId(),
            Name = c.GetPlayerName(),
            Character = c.GetGatekeeperCharacter(),
            DamageDealt = c.CharStats.DamageDealt,
            DamageReceived = c.CharStats.DamageReceived,
            Kills = c.CharStats.EnemiesKilled,
        }).ToArray();

        if (data.Length > 0)
        {
            services.GetRequiredService<WebSocketServer>().Broadcast(new CharacterStatsMessage() { Data = data });
        }
    }

    private void WsOnClientConnected(Guid client)
    {
        WebSocketServer ws = services.GetRequiredService<WebSocketServer>();
        CharacterUtils charUtils = services.GetRequiredService<CharacterUtils>();
        InventoryManager inventoryManager = services.GetService<InventoryManager>();

        foreach (CharManager charMgr in charUtils.CharManagers())
        {
            int clientId = charMgr.GetClientId();

            ws.Send(client, new InventoryMessage()
            {
                ClientId = clientId,
                Name = charMgr.GetPlayerName(),
                Items = inventoryManager.GetItems(clientId),
            });
        }
    }
}
