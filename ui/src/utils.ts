import { maxPlayers } from "./consts";

export const rankByValues = (data: { value: number; rank: number }[]) => {
	data.sort((a, b) => b.value - a.value);
	for (let i = 0; i < data.length; ++i) {
		data[i].rank = i + 1;
	}
};

export const mapPlayerData = (player: { Name: string; Character: number }, value: number) => ({
	label: player.Name,
	category: player.Character,
	value,
	rank: 0,
	prev: maxPlayers + 2,
	next: maxPlayers + 2,
});
