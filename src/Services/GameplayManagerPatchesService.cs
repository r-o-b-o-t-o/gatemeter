using Gatemeter.Events;
using UnityEngine.SceneManagement;

namespace Gatemeter.Services;

public class GameplayManagerPatchesService
{
    private readonly GameResetEventEmitter gameResetEventEmitter;
    private readonly NewLevelEventEmitter newLevelEventEmitter;

    public GameplayManagerPatchesService(GameResetEventEmitter gameResetEventEmitter, NewLevelEventEmitter newLevelEventEmitter)
    {
        this.gameResetEventEmitter = gameResetEventEmitter;
        this.newLevelEventEmitter = newLevelEventEmitter;
    }

    public void Awake()
    {
        gameResetEventEmitter.GameReset?.Invoke();
    }

    public void ClientInit()
    {
        string scene = SceneManager.GetActiveScene().name;
        if (scene != "Delta_Hub")
        {
            newLevelEventEmitter.NewLevel?.Invoke();
        }
    }
}
