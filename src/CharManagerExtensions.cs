using Il2CppGatekeeper.Char_Scripts.Bastion;
using Il2CppGatekeeper.Char_Scripts.Echo;
using Il2CppGatekeeper.Char_Scripts.General;
using Il2CppGatekeeper.Char_Scripts.Hybrid;
using Il2CppGatekeeper.Char_Scripts.Mediator;
using Il2CppGatekeeper.Char_Scripts.Nidum;
using Il2CppGatekeeper.Char_Scripts.Pandora;
using Il2CppGatekeeper.Char_Scripts.TechHunter;
using Il2CppGatekeeper.Char_Scripts.VoidModel;
using Il2CppGatekeeper.Network.Team;

namespace Gatemeter;

public static class CharManagerExtensions
{
    public enum GatekeeperCharacter
    {
        Hybrid,
        Nidum,
        Pandora,
        Bastion,
        TechHunter,
        Mediator,
        Echo,
        VoidModel,
    }

    public static GatekeeperCharacter GetGatekeeperCharacter(this CharManager charManager)
    {
        if (charManager.GetComponent<HybridMain>() != null)
        {
            return GatekeeperCharacter.Hybrid;
        }
        if (charManager.GetComponent<NidumMain>() != null)
        {
            return GatekeeperCharacter.Nidum;
        }
        if (charManager.GetComponent<PandoraMain>() != null)
        {
            return GatekeeperCharacter.Pandora;
        }
        if (charManager.GetComponent<BastionMain>() != null)
        {
            return GatekeeperCharacter.Bastion;
        }
        if (charManager.GetComponent<TechHunterMain>() != null)
        {
            return GatekeeperCharacter.TechHunter;
        }
        if (charManager.GetComponent<MediatorMain>() != null)
        {
            return GatekeeperCharacter.Mediator;
        }
        if (charManager.GetComponent<EchoMain>() != null)
        {
            return GatekeeperCharacter.Echo;
        }
        if (charManager.GetComponent<VoidModelMain>() != null)
        {
            return GatekeeperCharacter.VoidModel;
        }

        return GatekeeperCharacter.Hybrid;
    }

    public static int GetClientId(this CharManager charManager)
    {
        return charManager.NetworkObject.OwnerId;
    }

    public static string GetPlayerName(this CharManager charManager)
    {
        return TeamManager.GetPlayerDisplayName(charManager.GetClientId());
    }
}
