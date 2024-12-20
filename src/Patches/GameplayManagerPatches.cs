using Gatemeter.Events;
using HarmonyLib;
using Il2CppGatekeeper.General;
using MelonLoader;
using UnityEngine.SceneManagement;

namespace Gatemeter.Patches;

[HarmonyPatch(typeof(GameplayManager), nameof(GameplayManager.Awake))]
public static class GameplayManagerAwakePatch
{
    public static void Postfix(GameplayManager __instance)
    {
        IServiceProvider services = Melon<GatemeterMod>.Instance.Services();

        GameResetEventEmitter gameResetEventEmitter = services.GetRequiredService<GameResetEventEmitter>();
        gameResetEventEmitter.GameReset?.Invoke();
    }
}

[HarmonyPatch(typeof(GameplayManager), nameof(GameplayManager.ClientInit))]
public static class GameplayManagerInitPatch
{
    public static void Postfix(GameplayManager __instance)
    {
        IServiceProvider services = Melon<GatemeterMod>.Instance.Services();

        string scene = SceneManager.GetActiveScene().name;
        if (scene != "Delta_Hub")
        {
            NewLevelEventEmitter newLevelEventEmitter = services.GetRequiredService<NewLevelEventEmitter>();
            newLevelEventEmitter.NewLevel?.Invoke();
        }
    }
}
