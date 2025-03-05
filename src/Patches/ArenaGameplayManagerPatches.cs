using Gatemeter.Services;
using HarmonyLib;
using Il2CppGatekeeper.General.Arena;
using Il2CppGatekeeper.General.Events.Arena;
using MelonLoader;

namespace Gatemeter.Patches;

[HarmonyPatch(typeof(ArenaGameplayManager), nameof(ArenaGameplayManager.ClientHandleStartArenaRound))]
public static class StartArenaRoundPatch
{
    public static void Postfix(ArenaGameplayManager __instance, EventClientStartArenaRound eventData)
    {
        Melon<GatemeterMod>.Instance.Services().GetRequiredService<ArenaGameplayManagerPatchesService>().ClientHandleStartArenaRound();
    }
}
