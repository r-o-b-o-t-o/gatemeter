import { throttle } from "@solid-primitives/scheduled";
import { createEffect, createSignal, onCleanup } from "solid-js";

import { CharacterStatsMessage } from "../WsMessages";
import { characterCategories, characterColors, chartsDelay, maxPlayers } from "../consts";
import { characterImages } from "../images";
import { mapPlayerData, rankByValues } from "../utils";
import { BarChartRace } from "./BarChartRace";
import { css } from "styled-system/css";
import { useWs } from "~/WsClient";

export const DamageDealtChart = () => {
	const ws = useWs();

	const [damageDealt, setDamageDealt] = createSignal<
		{
			label: string;
			category: number;
			value: number;
			rank: number;
			prev: number;
			next: number;
		}[]
	>([]);
	const setDamageDealtThrottled = throttle(setDamageDealt, chartsDelay);
	const [resetChart, setResetChart] = createSignal<() => void>();

	const onCharacterStats = (msg: CharacterStatsMessage) => {
		const stats = msg.Data;

		setDamageDealtThrottled(() => {
			const data = stats.map((player) => mapPlayerData(player, player.DamageDealt));
			rankByValues(data);
			return data;
		});
	};

	const onResetData = () => {
		setDamageDealt([]);
		resetChart()();
	};

	createEffect(() => {
		ws()?.on("message:CharacterStats", onCharacterStats);
		ws()?.on("message:ResetData", onResetData);
	});

	onCleanup(() => {
		ws()?.off("message:CharacterStats", onCharacterStats);
		ws()?.off("message:ResetData", onResetData);
	});

	return (
		<div class={css({ display: "flex", flexDir: "column", flex: 1, justifyContent: "center", textAlign: "center", minHeight: "0" })}>
			<div class="title">Damage dealt&ensp;(total)</div>
			<div class={css({ minHeight: "0" })}>
				<BarChartRace
					class={css({ marginTop: "1" })}
					data={damageDealt()}
					categories={characterCategories}
					categoryImages={characterImages}
					initialBarColors={characterColors}
					showCategory={true}
					delay={chartsDelay}
					barCount={maxPlayers}
					setReset={setResetChart}
				/>
			</div>
		</div>
	);
};
