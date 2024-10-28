using Il2CppGatekeeper.Char_Scripts;
using Il2CppGatekeeper.Char_Scripts.General;

namespace GatekeeperDamageMeter;

public class CharacterUtils
{
    public CharManager[] CharManagers()
    {
        List<CharManager> chars = new();
        foreach (CharManager c in PlayableCharactersHolder.PlayableCharactersList.Values)
        {
            chars.Add(c);
        }
        return chars.ToArray();
    }
}
