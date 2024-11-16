import AdjusterImg from "./assets/img/items/Adjuster.png";
import AdrenalinePillImg from "./assets/img/items/AdrenalinePill.png";
import ArcanumBountyImg from "./assets/img/items/ArcanumBounty.png";
import ArgumentImg from "./assets/img/items/Argument.png";
import BadMoodImg from "./assets/img/items/BadMood.png";
import BalefulBoonImg from "./assets/img/items/BalefulBoon.png";
import BaneSealImg from "./assets/img/items/BaneSeal.png";
import BayonetImg from "./assets/img/items/Bayonet.png";
import BluePillImg from "./assets/img/items/BluePill.png";
import BuzzImg from "./assets/img/items/Buzz.png";
import CalamitysPactImg from "./assets/img/items/CalamitysPact.png";
import CannonadeImg from "./assets/img/items/Cannonade.png";
import ChargedCoreImg from "./assets/img/items/ChargedCore.png";
import CinderFlareImg from "./assets/img/items/CinderFlare.png";
import ConfinesImg from "./assets/img/items/Confines.png";
import CriticaImg from "./assets/img/items/Critica.png";
import CursedShardImg from "./assets/img/items/CursedShard.png";
import CutCloutImg from "./assets/img/items/CutClout.png";
import CycloneImg from "./assets/img/items/Cyclone.png";
import DeadeyeImg from "./assets/img/items/Deadeye.png";
import DelugeonImg from "./assets/img/items/Delugeon.png";
import DetonatorImg from "./assets/img/items/Detonator.png";
import DuoImg from "./assets/img/items/Duo.png";
import ElixImg from "./assets/img/items/Elix.png";
import EminenceImg from "./assets/img/items/Eminence.png";
import EmptyCarapaceImg from "./assets/img/items/EmptyCarapace.png";
import EnhancerImg from "./assets/img/items/Enhancer.png";
import EruptorImg from "./assets/img/items/Eruptor.png";
import EssenceImg from "./assets/img/items/Essence.png";
import EternalHeartImg from "./assets/img/items/EternalHeart.png";
import ExtrasystoleImg from "./assets/img/items/Extrasystole.png";
import FirstImpressionImg from "./assets/img/items/FirstImpression.png";
import FlameDraftImg from "./assets/img/items/FlameDraft.png";
import FlashImg from "./assets/img/items/Flash.png";
import FractalImg from "./assets/img/items/Fractal.png";
import FuseImg from "./assets/img/items/Fuse.png";
import GreedsGambitImg from "./assets/img/items/GreedsGambit.png";
import HVCImg from "./assets/img/items/HVC.png";
import HarmonyImg from "./assets/img/items/Harmony.png";
import HeatConcentrateImg from "./assets/img/items/HeatConcentrate.png";
import HollowTalismanImg from "./assets/img/items/HollowTalisman.png";
import IndicatorImg from "./assets/img/items/Indicator.png";
import InertiaImg from "./assets/img/items/Inertia.png";
import InfurionImg from "./assets/img/items/Infurion.png";
import InjectionImg from "./assets/img/items/Injection.png";
import JujuImg from "./assets/img/items/Juju.png";
import KarmaImg from "./assets/img/items/Karma.png";
import KettlebellImg from "./assets/img/items/Kettlebell.png";
import LumiloreImg from "./assets/img/items/Lumilore.png";
import NephritisImg from "./assets/img/items/Nephritis.png";
import NomadStickImg from "./assets/img/items/NomadStick.png";
import OpalEyeImg from "./assets/img/items/OpalEye.png";
import ProtectiveSignImg from "./assets/img/items/ProtectiveSign.png";
import Protocol1Img from "./assets/img/items/Protocol1.png";
import Protocol2Img from "./assets/img/items/Protocol2.png";
import ReflexImg from "./assets/img/items/Reflex.png";
import RendstoneImg from "./assets/img/items/Rendstone.png";
import RiftmakerImg from "./assets/img/items/Riftmaker.png";
import RiposteImg from "./assets/img/items/Riposte.png";
import RippletideImg from "./assets/img/items/Rippletide.png";
import RitualVesselImg from "./assets/img/items/RitualVessel.png";
import RuneOfReboundImg from "./assets/img/items/RuneOfRebound.png";
import SecondWindImg from "./assets/img/items/SecondWind.png";
import ShieldModuleImg from "./assets/img/items/ShieldModule.png";
import SkirmishImg from "./assets/img/items/Skirmish.png";
import SootheStoneImg from "./assets/img/items/SootheStone.png";
import SoulWeaverImg from "./assets/img/items/SoulWeaver.png";
import SourceImg from "./assets/img/items/Source.png";
import SparkImg from "./assets/img/items/Spark.png";
import StringOfEliImg from "./assets/img/items/StringOfEli.png";
import SuperiorityImg from "./assets/img/items/Superiority.png";
import SwarmPendantImg from "./assets/img/items/SwarmPendant.png";
import TamerImg from "./assets/img/items/Tamer.png";
import TarraClawImg from "./assets/img/items/TarraClaw.png";
import ThunderRingImg from "./assets/img/items/ThunderRing.png";
import TriumphImg from "./assets/img/items/Triumph.png";
import VanguardImg from "./assets/img/items/Vanguard.png";
import VeilTalismanImg from "./assets/img/items/VeilTalisman.png";
import VertebralImplantImg from "./assets/img/items/VertebralImplant.png";
import WiltHazeImg from "./assets/img/items/WiltHaze.png";
import YellowPillImg from "./assets/img/items/YellowPill.png";

export interface IItem {
	code: string;
	name: string;
	image: string;
	triad?: number[];
}

export const allItems: { [key: number | string]: IItem } = {
	1: { code: "AdrenalinePill", name: "Adrenaline Pill", image: AdrenalinePillImg },
	2: { code: "Argument", name: "Argument", image: ArgumentImg },
	3: { code: "BadMood", name: "Bad Mood", image: BadMoodImg },
	4: { code: "Bayonet", name: "Bayonet", image: BayonetImg },
	5: { code: "BluePill", name: "Blue Pill", image: BluePillImg },
	6: { code: "Cannonade", name: "Cannonade", image: CannonadeImg },
	7: { code: "EternalHeart", name: "Eternal Heart", image: EternalHeartImg },
	8: { code: "FirstImpression", name: "First Impression", image: FirstImpressionImg },
	9: { code: "Flash", name: "Flash", image: FlashImg },
	10: { code: "HVC", name: "HVC", image: HVCImg },
	11: { code: "Indicator", name: "Indicator", image: IndicatorImg },
	12: { code: "Injection", name: "Injection", image: InjectionImg },
	13: { code: "Kettlebell", name: "Kettlebell", image: KettlebellImg },
	14: { code: "Nephritis", name: "Jade", image: NephritisImg },
	15: { code: "NomadStick", name: "Nomad's Stick", image: NomadStickImg },
	16: { code: "OpalEye", name: "Opal Eye", image: OpalEyeImg },
	17: { code: "ProtectiveSign", name: "Protective Mark", image: ProtectiveSignImg },
	18: { code: "Protocol1", name: "Protocol 1.0", image: Protocol1Img },
	19: { code: "Protocol2", name: "Protocol 2.0", image: Protocol2Img },
	20: { code: "Reflex", name: "Reflex", image: ReflexImg },
	21: { code: "Riposte", name: "Riposte", image: RiposteImg },
	22: { code: "RuneOfRebound", name: "Rune Of Rebound", image: RuneOfReboundImg },
	23: { code: "SecondWind", name: "Second Wind", image: SecondWindImg },
	24: { code: "ShieldModule", name: "Shield Module", image: ShieldModuleImg },
	25: { code: "Spark", name: "Spark", image: SparkImg },
	26: { code: "StringOfEli", name: "Eli's String", image: StringOfEliImg },
	27: { code: "ThunderRing", name: "Thunder Ring", image: ThunderRingImg },
	28: { code: "VertebralImplant", name: "Vertebral Implant", image: VertebralImplantImg },
	29: { code: "YellowPill", name: "Yellow Pill", image: YellowPillImg },
	30: { code: "ChargedCore", name: "Charged Core", image: ChargedCoreImg },
	31: { code: "Confines", name: "Confines", image: ConfinesImg },
	32: { code: "Enhancer", name: "Enhancer", image: EnhancerImg },
	33: { code: "Extrasystole", name: "Extrasystole", image: ExtrasystoleImg },
	34: { code: "Inertia", name: "Inertia", image: InertiaImg },
	35: { code: "Source", name: "Source", image: SourceImg },
	36: { code: "HollowTalisman", name: "Hollow Talisman", image: HollowTalismanImg },
	37: { code: "SwarmPendant", name: "Swarm Pendant", image: SwarmPendantImg },
	38: { code: "CursedShard", name: "Cursed Shard", image: CursedShardImg },
	39: { code: "Eminence", name: "Eminence", image: EminenceImg },
	40: { code: "EmptyCarapace", name: "Empty Carapace", image: EmptyCarapaceImg },
	41: { code: "RitualVessel", name: "Ritual Vessel", image: RitualVesselImg },
	42: { code: "Essence", name: "Essence", image: EssenceImg },
	43: { code: "Fractal", name: "Fractal", image: FractalImg },
	44: { code: "Fuse", name: "Fuse", image: FuseImg },
	45: { code: "Harmony", name: "Harmony", image: HarmonyImg },
	46: { code: "Elix", name: "Elix", image: ElixImg },
	47: { code: "FlameDraft", name: "Flame Draft", image: FlameDraftImg },
	48: { code: "TarraClaw", name: "Tarra's Claw", image: TarraClawImg },
	49: { code: "Triumph", name: "Triumph", image: TriumphImg },
	50: { code: "Karma", name: "Karma", image: KarmaImg },
	51: { code: "Skirmish", name: "Skirmish", image: SkirmishImg },
	52: { code: "Adjuster", name: "Adjuster", image: AdjusterImg },
	53: { code: "Detonator", name: "Detonator", image: DetonatorImg },
	54: { code: "WiltHaze", name: "Wilt Haze", image: WiltHazeImg },
	55: { code: "BaneSeal", name: "Bane Seal", image: BaneSealImg },
	56: { code: "CutClout", name: "Cut Clout", image: CutCloutImg },
	57: { code: "Eruptor", name: "Eruptor", image: EruptorImg },
	58: { code: "CinderFlare", name: "Cinder Flare", image: CinderFlareImg },
	59: { code: "Riftmaker", name: "Riftmaker", image: RiftmakerImg },
	60: { code: "Delugeon", name: "Delugeon", image: DelugeonImg },
	61: { code: "Lumilore", name: "Lumilore", image: LumiloreImg },
	62: { code: "SoulWeaver", name: "Soul Weaver", image: SoulWeaverImg },
	63: { code: "Rippletide", name: "Rippletide", image: RippletideImg },
	64: { code: "Juju", name: "Juju", image: JujuImg },
	65: { code: "Vanguard", name: "Vanguard", image: VanguardImg },
	66: { code: "Buzz", name: "Buzz", image: BuzzImg },
	67: { code: "HeatConcentrate", name: "Heat Concentrate", image: HeatConcentrateImg },
	68: { code: "SootheStone", name: "Soothe Stone", image: SootheStoneImg },
	69: { code: "Duo", name: "Duo", image: DuoImg },
	70: { code: "VeilTalisman", name: "Veil Talisman", image: VeilTalismanImg },
	71: { code: "Deadeye", name: "Deadeye", image: DeadeyeImg },
	72: { code: "Rendstone", name: "Rendstone", image: RendstoneImg },
	73: { code: "Critica", name: "Critica", image: CriticaImg },
	74: { code: "Infurion", name: "Infurion", image: InfurionImg },
	75: { code: "ArcanumBounty", name: "Arcanum's Bounty", image: ArcanumBountyImg },
	76: { code: "Cyclone", name: "Cyclone", image: CycloneImg },
	77: { code: "GreedsGambit", name: "Greed's Gambit", image: GreedsGambitImg },
	78: { code: "CalamitysPact", name: "Calamity's Pact", image: CalamitysPactImg },
	79: { code: "BalefulBoon", name: "Baleful Boon", image: BalefulBoonImg },
	80: { code: "Tamer", name: "Tamer", image: TamerImg },
	81: { code: "Superiority", name: "Superiority", image: SuperiorityImg },
	1000: { code: "TriadOfScorch", name: "Triad of Scorch", image: null, triad: [6, 10, 67] },
	1001: { code: "TriadOfLife", name: "Triad of Life", image: null, triad: [7, 45, 28] },
	1002: { code: "TriadOfCarnage", name: "Triad of Carnage", image: null, triad: [4, 51, 8] },
	1003: { code: "TriadOfRegeneration", name: "Triad of Regeneration", image: null, triad: [14, 23, 43] },
	1004: { code: "TriadOfShock", name: "Triad of Shock", image: null, triad: [9, 73, 53] },
	1005: { code: "TriadOfEmber", name: "Triad of Ember", image: null, triad: [18, 19, 25] },
	1006: { code: "TriadOfCalibration", name: "Triad of Calibration", image: null, triad: [12, 11, 52] },
	1007: { code: "TriadOfAssault", name: "Triad of Assault", image: null, triad: [66, 69, 65] },
	1008: { code: "TriadOfCinderstorm", name: "Triad of Cinderstorm", image: null, triad: [74, 58, 57] },
	1009: { code: "TriadOfArgument", name: "Triad of Argument", image: null, triad: [3, 2, 5] },
	1010: { code: "TriadOfReflection", name: "Triad of Reflection", image: null, triad: [21, 56, 50] },
	1011: { code: "TriadOfMeteor", name: "Triad of Lumilore", image: null, triad: [27, 61, 71] },
	1012: { code: "TriadOfDevastation", name: "Triad of Devastation", image: null, triad: [32, 55, 60] },
	1013: { code: "TriadOfTides", name: "Triad of Tides", image: null, triad: [36, 63, 26] },
	1014: { code: "TriadOfFireflow", name: "Triad of Fireflow", image: null, triad: [35, 47, 20] },
};
