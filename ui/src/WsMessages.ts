export interface CharacterStatsMessageData {
	ClientId: number;
	Name: string;
	Character: number;
	DamageDealt: number;
	DamageReceived: number;
	Kills: number;
}

export interface CharacterStatsMessage {
	Data: CharacterStatsMessageData[];
}

export interface InventoryMessage {
	ClientId: number;
	Name: string;
	Items: { [key: number]: number };
}
