using Gatemeter.Services;
using HarmonyLib;
using Il2CppGatekeeper.General;
using MelonLoader;

namespace Gatemeter.Patches;

[HarmonyPatch(typeof(GameplayManager), nameof(GameplayManager.Awake))]
public static class GameplayManagerAwakePatch
{
    public static void Postfix(GameplayManager __instance)
    {
        Melon<GatemeterMod>.Instance.Services().GetRequiredService<GameplayManagerPatchesService>().Awake();
    }
}

[HarmonyPatch(typeof(GameplayManager), nameof(GameplayManager.ClientInit))]
public static class GameplayManagerInitPatch
{
    public static void Postfix(GameplayManager __instance)
    {
        Melon<GatemeterMod>.Instance.Services().GetRequiredService<GameplayManagerPatchesService>().ClientInit();
    }
}
