import { createElementSize } from "@solid-primitives/resize-observer";
import { throttle } from "@solid-primitives/scheduled";
import { createSignal, onMount } from "solid-js";

import { ws } from "../App";
import { CharacterStatsMessage } from "../WsMessages";
import { characterCategories, characterChartBarHeight, characterColors, chartsDelay, maxPlayers } from "../consts";
import { characterImages } from "../images";
import { mapPlayerData, rankByValues } from "../utils";
import { BarChartRace } from "./BarChartRace";
import styles from "./DamageDealtChart.module.scss";

export const DamageDealtChart = () => {
	let containerRef: HTMLDivElement;
	const containerSize = createElementSize(() => containerRef);

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

	onMount(() => {
		ws.addListener("message:CharacterStats", (msg: CharacterStatsMessage) => {
			const stats = msg.Data;

			setDamageDealtThrottled(() => {
				const data = stats.map((player) => mapPlayerData(player, player.DamageDealt));
				rankByValues(data);
				return data;
			});
		});

		// eslint-disable-next-line solid/reactivity
		ws.addListener("message:ResetData", () => {
			setDamageDealt([]);
			resetChart()();
		});
	});

	return (
		<div class={styles.section}>
			<div class="title">Damage dealt&ensp;(total)</div>
			<div ref={containerRef}>
				<BarChartRace
					class={styles.chart}
					data={damageDealt()}
					categories={characterCategories}
					categoryImages={characterImages}
					initialBarColors={characterColors}
					showCategory={true}
					width={containerSize?.width}
					height={characterChartBarHeight * maxPlayers}
					delay={chartsDelay}
					barCount={maxPlayers}
					setReset={setResetChart}
				/>
			</div>
		</div>
	);
};
