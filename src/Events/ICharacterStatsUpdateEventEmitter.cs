namespace GatekeeperDamageMeter.Events;

public interface ICharacterStatsUpdateEventEmitter
{
    public class EventData
    {
        public CharacterStatsMessageData[] TotalData;
        public CharacterStatsMessageData[] LevelData;
    }

    public Action<EventData> CharacterStatsUpdated { get; set; }
}
