using GatekeeperDamageMeter.Services;

namespace GatekeeperDamageMeter;

public class CharacterStatsMessageData
{
    public int ClientId { get; set; }
    public string Name { get; set; }
    public CharManagerExtensions.GatekeeperCharacter Character { get; set; }
    public float DamageDealt { get; set; }
    public float DamageReceived { get; set; }
    public uint Kills { get; set; }
}

public class CharacterStatsMessage : WebSocketServer.IMessage
{
    public string MessageType => "CharacterStats";
    public CharacterStatsMessageData[] Data { get; set; }
}

public class LevelCharacterStatsMessage : WebSocketServer.IMessage
{
    public string MessageType => "LevelCharacterStats";
    public CharacterStatsMessageData[] Data { get; set; }
}

public class InventoryMessage : WebSocketServer.IMessage
{
    public string MessageType => "Inventory";
    public int ClientId { get; set; }
    public string Name { get; set; }
    public Dictionary<int, int> Items { get; set; }
}

public class ResetDataMessage : WebSocketServer.IMessage
{
    public string MessageType => "ResetData";
}

public class NewLevelMessage : WebSocketServer.IMessage
{
    public string MessageType => "NewLevel";
}
