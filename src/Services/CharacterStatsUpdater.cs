using GatekeeperDamageMeter.Events;
using Il2CppGatekeeper.Char_Scripts.General;
using UnityEngine;

namespace GatekeeperDamageMeter.Services;

public sealed class CharacterStatsUpdater : ICharacterStatsUpdateEventEmitter, IDisposable
{
    private readonly IUpdateEventEmitter updateEventEmitter;
    private readonly LevelCharacterStatsManager levelStatsMgr;
    private readonly CharacterUtils charUtils;
    private const float threshold = 0.4f;
    private float dt;

    public Action<ICharacterStatsUpdateEventEmitter.EventData> CharacterStatsUpdated { get; set; }

    public CharacterStatsUpdater(IUpdateEventEmitter updateEventEmitter, LevelCharacterStatsManager levelStatsMgr, CharacterUtils charUtils)
    {
        this.updateEventEmitter = updateEventEmitter;
        this.levelStatsMgr = levelStatsMgr;
        this.charUtils = charUtils;

        updateEventEmitter.Update += OnUpdate;
    }

    private void Run()
    {
        UpdateLevelStats();
        InvokeEvent();
    }

    private void UpdateLevelStats()
    {
        foreach (CharManager c in charUtils.CharManagers())
        {
            levelStatsMgr.Update(c.GetClientId(), c.CharStats.DamageDealt, c.CharStats.DamageReceived, c.CharStats.EnemiesKilled);
        }
    }

    private void InvokeEvent()
    {
        ICharacterStatsUpdateEventEmitter.EventData data = new()
        {
            TotalData = charUtils.CharManagers().Select(c => new CharacterStatsMessageData()
            {
                ClientId = c.GetClientId(),
                Name = c.GetPlayerName(),
                Character = c.GetGatekeeperCharacter(),
                DamageDealt = c.CharStats.DamageDealt,
                DamageReceived = c.CharStats.DamageReceived,
                Kills = c.CharStats.EnemiesKilled,
            }).ToArray(),

            LevelData = charUtils.CharManagers().Select(c =>
            {
                int clientId = c.GetClientId();
                var stats = levelStatsMgr.GetStats(clientId);
                return new CharacterStatsMessageData()
                {
                    ClientId = clientId,
                    Name = c.GetPlayerName(),
                    Character = c.GetGatekeeperCharacter(),
                    DamageDealt = stats.DamageDealt,
                    DamageReceived = stats.DamageReceived,
                    Kills = stats.EnemiesKilled,
                };
            }).ToArray(),
        };
        CharacterStatsUpdated?.Invoke(data);
    }

    private void OnUpdate()
    {
        dt += Time.deltaTime;
        if (dt >= threshold)
        {
            dt -= threshold;
            Run();
        }
    }

    public void Dispose()
    {
        updateEventEmitter.Update -= OnUpdate;
    }
}
