using Il2CppGatekeeper.Char_Scripts.General;
using Il2CppGatekeeper.Items;

namespace Gatemeter.Services;

public class CharItemManagerPatchesService
{
    private readonly WebSocketServer ws;
    private readonly InventoryManager inventoryManager;

    public CharItemManagerPatchesService(WebSocketServer ws, InventoryManager inventoryManager)
    {
        this.ws = ws;
        this.inventoryManager = inventoryManager;
    }

    public void AddItemInternal(CharItemManager instance, ItemID itemId, int quantityToAdd)
    {
        CharManager charMgr = instance.GetComponent<CharManager>();

        int clientId = charMgr.GetClientId();
        inventoryManager.AddItem(clientId, itemId, quantityToAdd);

        ws.Broadcast(new InventoryMessage()
        {
            ClientId = clientId,
            Name = charMgr.GetPlayerName(),
            Items = inventoryManager.GetItems(clientId),
        });
    }

    public void RemoveItemInternal(CharItemManager instance, ItemID itemId, int quantityToRemove)
    {
        CharManager charMgr = instance.GetComponent<CharManager>();

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
