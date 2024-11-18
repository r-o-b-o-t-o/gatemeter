using Gatemeter.Events;
using Il2CppGatekeeper.Items;

namespace Gatemeter.Services;

public sealed class InventoryManager : IDisposable
{
    private class InventoryData
    {
        public Dictionary<ItemID, int> Items { get; set; } = new();
    }

    private readonly GameResetEventEmitter gameResetEventEmitter;
    private readonly Dictionary<int, InventoryData> inventories = new();

    public InventoryManager(GameResetEventEmitter gameResetEventEmitter)
    {
        this.gameResetEventEmitter = gameResetEventEmitter;

        gameResetEventEmitter.GameReset += Reset;
    }

    public void AddItem(int clientId, ItemID itemId, int quantity)
    {
        EnsureItem(clientId, itemId);
        inventories[clientId].Items[itemId] += quantity;
    }

    public void RemoveItem(int clientId, ItemID itemId, int quantity)
    {
        EnsureItem(clientId, itemId);
        inventories[clientId].Items[itemId] -= quantity;
    }

    public Dictionary<int, int> GetItems(int clientId)
    {
        if (!inventories.ContainsKey(clientId))
        {
            return null;
        }

        Dictionary<int, int> items = new();
        foreach (var pair in inventories[clientId].Items)
        {
            items[(int)pair.Key] = pair.Value;
        }

        return items;
    }

    private void Reset()
    {
        inventories.Clear();
    }

    private void EnsureItem(int clientId, ItemID itemId)
    {
        if (!inventories.ContainsKey(clientId))
        {
            inventories[clientId] = new InventoryData();
        }
        if (!inventories[clientId].Items.ContainsKey(itemId))
        {
            inventories[clientId].Items[itemId] = 0;
        }
    }

    public void Dispose()
    {
        gameResetEventEmitter.GameReset -= Reset;
    }
}
