using GatekeeperDamageMeter.Events;
using GatekeeperDamageMeter.Services;
using MelonLoader;

namespace GatekeeperDamageMeter;

public class DamageMeterMod : MelonMod, IUpdateEventEmitter
{
    public Action Update { get; set; }
    public Action LateUpdate { get; set; }

    private IHost host;
    private MelonPreferences_Category config;
    private MelonPreferences_Entry<int> staticServerPort;
    private MelonPreferences_Entry<string> wsServerHost;
    private MelonPreferences_Entry<int> wsServerPort;

    public override void OnInitializeMelon()
    {
        config = MelonPreferences.CreateCategory("Gatemeter");
        staticServerPort = config.CreateEntry("UIServerPort", 5000);
        wsServerHost = config.CreateEntry("WSServerHost", "localhost");
        wsServerPort = config.CreateEntry("WSServerPort", 5001);

        IHostBuilder builder = Host.CreateDefaultBuilder();
        builder.ConfigureServices(
            servicesBuilder => servicesBuilder
                .AddSingleton(LoggerInstance)
                .AddSingleton<IUpdateEventEmitter>(this)
                .AddSingleton<ICharacterStatsUpdateEventEmitter, CharacterStatsUpdater>()
                .AddSingleton<GameResetEventEmitter>()
                .AddSingleton<NewLevelEventEmitter>()
                .AddScoped<CharacterUtils>()
                .AddSingleton<InventoryManager>()
                .AddSingleton<LevelCharacterStatsManager>()
                .AddSingleton<WsDispatcher>()
#if !DEBUG
                .AddSingleton(new StaticWebServer(Path.Combine(Path.GetDirectoryName(MelonAssembly.Location), "GatekeeperDamageMeter"), staticServerPort.Value))
#endif
                .AddSingleton((provider) => new WebSocketServer(provider.GetRequiredService<MelonLogger.Instance>(), wsServerHost.Value, wsServerPort.Value))
        );

        host = builder.Build();

        // Force activation
        Services().GetRequiredService<WsDispatcher>();
    }

    public IServiceProvider Services()
    {
        return host.Services.CreateScope().ServiceProvider;
    }

    public override void OnUpdate()
    {
        Update?.Invoke();
    }

    public override void OnLateUpdate()
    {
        LateUpdate?.Invoke();
    }
}
