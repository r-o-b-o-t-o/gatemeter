using GatekeeperDamageMeter.Events;
using HarmonyLib;
using Il2CppGatekeeper.General.Arena;
using Il2CppGatekeeper.General.Events.Arena;
using MelonLoader;

namespace GatekeeperDamageMeter.Patches;

[HarmonyPatch(typeof(ArenaGameplayManager), nameof(ArenaGameplayManager.ClientHandleStartArenaRound))]
public static class StartArenaRoundPatch
{
    public static void Postfix(ArenaGameplayManager __instance, EventClientStartArenaRound eventData)
    {
        IServiceProvider services = Melon<DamageMeterMod>.Instance.Services();

        NewLevelEventEmitter newLevelEventEmitter = services.GetRequiredService<NewLevelEventEmitter>();
        newLevelEventEmitter.NewLevel?.Invoke();
    }
}
