using Gatemeter.Events;

namespace Gatemeter.Services;

public sealed class LevelCharacterStatsManager : IDisposable
{
    public class StatsData
    {
        public float DamageDealt { get; set; }
        public float DamageReceived { get; set; }
        public uint EnemiesKilled { get; set; }
    }

    private readonly GameResetEventEmitter gameResetEventEmitter;
    private readonly NewLevelEventEmitter newLevelEventEmitter;
    private Dictionary<int, StatsData> lastLevelStats = new();
    private Dictionary<int, StatsData> totalStats = new();

    public LevelCharacterStatsManager(GameResetEventEmitter gameResetEventEmitter, NewLevelEventEmitter newLevelEventEmitter)
    {
        this.gameResetEventEmitter = gameResetEventEmitter;
        this.newLevelEventEmitter = newLevelEventEmitter;

        gameResetEventEmitter.GameReset += Reset;
        newLevelEventEmitter.NewLevel += NewLevel;
    }

    public void Update(int clientId, float totalDamageDealt, float totalDamageReceived, uint totalEnemiesKilled)
    {
        EnsureClient(clientId);

        totalStats[clientId].DamageDealt = totalDamageDealt;
        totalStats[clientId].DamageReceived = totalDamageReceived;
        totalStats[clientId].EnemiesKilled = totalEnemiesKilled;
    }

    public StatsData GetStats(int clientId)
    {
        EnsureClient(clientId);

        StatsData total = totalStats[clientId];
        StatsData last = lastLevelStats[clientId];

        return new StatsData()
        {
            DamageDealt = total.DamageDealt - last.DamageDealt,
            DamageReceived = total.DamageReceived - last.DamageReceived,
            EnemiesKilled = total.EnemiesKilled - last.EnemiesKilled,
        };
    }

    private void Reset()
    {
        lastLevelStats.Clear();
        totalStats.Clear();
    }

    private void NewLevel()
    {
        lastLevelStats = totalStats;
        totalStats = new();
    }

    private void EnsureClient(int clientId)
    {
        if (!totalStats.ContainsKey(clientId))
        {
            totalStats[clientId] = new StatsData();
        }
        if (!lastLevelStats.ContainsKey(clientId))
        {
            lastLevelStats[clientId] = new StatsData();
        }
    }

    public void Dispose()
    {
        gameResetEventEmitter.GameReset -= Reset;
        newLevelEventEmitter.NewLevel -= NewLevel;
    }
}
