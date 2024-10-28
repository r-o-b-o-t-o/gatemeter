using HarmonyLib;
using Il2CppGatekeeper.Char_Scripts.General;
using Il2CppGatekeeper.Items;
using MelonLoader;

namespace GatekeeperDamageMeter;

[HarmonyPatch(typeof(CharItemManager), nameof(CharItemManager.AddItemInternal))]
public static class OnItemAddedPatch
{
    public static void Postfix(CharItemManager __instance, ItemID itemId, int quantityToAdd)
    {
        IServiceProvider services = Melon<DamageMeterMod>.Instance.Services();
        WebSocketServer ws = services.GetRequiredService<WebSocketServer>();
        InventoryManager inventoryManager = services.GetService<InventoryManager>();
        CharManager charMgr = __instance.GetComponent<CharManager>();

        int clientId = charMgr.GetClientId();
        inventoryManager.AddItem(clientId, itemId, quantityToAdd);

        ws.Broadcast(new InventoryMessage()
        {
            ClientId = clientId,
            Name = charMgr.GetPlayerName(),
            Items = inventoryManager.GetItems(clientId),
        });
    }
}

[HarmonyPatch(typeof(CharItemManager), nameof(CharItemManager.RemoveItemInternal))]
public static class OnItemRemovedPatch
{
    public static void Postfix(CharItemManager __instance, ItemID itemId, int quantityToRemove)
    {
        IServiceProvider services = Melon<DamageMeterMod>.Instance.Services();
        WebSocketServer ws = services.GetRequiredService<WebSocketServer>();
        InventoryManager inventoryManager = services.GetService<InventoryManager>();
        CharManager charMgr = __instance.GetComponent<CharManager>();

        int clientId = charMgr.GetClientId();
        inventoryManager.RemoveItem(clientId, itemId, quantityToRemove);

        ws.Broadcast(new InventoryMessage()
        {
            ClientId = clientId,
            Name = charMgr.GetPlayerName(),
            Items = inventoryManager.GetItems(clientId),
        });
    }
}
