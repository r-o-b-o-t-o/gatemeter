using Il2CppGatekeeper.Char_Scripts;
using Il2CppGatekeeper.Char_Scripts.General;

namespace Gatemeter.Services;

public class CharacterUtils
{
    public CharManager[] CharManagers()
    {
        CharManager[] chars = new CharManager[PlayableCharactersHolder.PlayableCharactersList.Count];
        int i = 0;
        foreach (CharManager c in PlayableCharactersHolder.PlayableCharactersList.Values)
        {
            chars[i] = c;
            ++i;
        }
        return chars;
    }
}
