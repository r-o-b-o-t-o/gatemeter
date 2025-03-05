using Gatemeter.Events;

namespace Gatemeter.Services;

public class ArenaGameplayManagerPatchesService
{
    private readonly NewLevelEventEmitter newLevelEventEmitter;

    public ArenaGameplayManagerPatchesService(NewLevelEventEmitter newLevelEventEmitter)
    {
        this.newLevelEventEmitter = newLevelEventEmitter;
    }

    public void ClientHandleStartArenaRound()
    {
        newLevelEventEmitter.NewLevel?.Invoke();
    }
}
