using Gatemeter.Services;
using HarmonyLib;
using Il2CppGatekeeper.Char_Scripts.General;
using Il2CppGatekeeper.Items;
using MelonLoader;

namespace Gatemeter.Patches;

[HarmonyPatch(typeof(CharItemManager), nameof(CharItemManager.AddItemInternal))]
public static class AddItemPatch
{
    public static void Postfix(CharItemManager __instance, ItemID itemId, int quantityToAdd)
    {
        Melon<GatemeterMod>.Instance.Services().GetRequiredService<CharItemManagerPatchesService>().AddItemInternal(__instance, itemId, quantityToAdd);
    }
}

[HarmonyPatch(typeof(CharItemManager), nameof(CharItemManager.RemoveItemInternal))]
public static class RemoveItemPatch
{
    public static void Postfix(CharItemManager __instance, ItemID itemId, int quantityToRemove)
    {
        Melon<GatemeterMod>.Instance.Services().GetRequiredService<CharItemManagerPatchesService>().RemoveItemInternal(__instance, itemId, quantityToRemove);
    }
}
