import { createElementSize } from "@solid-primitives/resize-observer";
import { throttle } from "@solid-primitives/scheduled";
import { createSignal, onMount } from "solid-js";

import { ws } from "../App";
import { CharacterStatsMessage } from "../WsMessages";
import { characterCategories, characterChartBarHeight, characterColors, chartsDelay, maxPlayers } from "../consts";
import { characterImages } from "../images";
import { mapPlayerData, rankByValues } from "../utils";
import { BarChartRace } from "./BarChartRace";
import styles from "./KillsChart.module.scss";

export const KillsChart = () => {
	let containerRef: HTMLDivElement;
	const containerSize = createElementSize(() => containerRef);

	const [kills, setKills] = createSignal<
		{
			label: string;
			category: number;
			value: number;
			rank: number;
			prev: number;
			next: number;
		}[]
	>([]);
	const setKillsThrottled = throttle(setKills, chartsDelay);
	const [resetChart, setResetChart] = createSignal<() => void>();

	onMount(() => {
		ws.addListener("message:CharacterStats", (msg: CharacterStatsMessage) => {
			const stats = msg.Data;

			setKillsThrottled(() => {
				const data = stats.map((player) => mapPlayerData(player, player.Kills));
				rankByValues(data);
				return data;
			});
		});

		// eslint-disable-next-line solid/reactivity
		ws.addListener("message:ResetData", () => {
			setKills([]);
			resetChart()();
		});
	});

	return (
		<div class={styles.section}>
			<div class="title">Kills</div>
			<div ref={containerRef}>
				<BarChartRace
					class={styles.chart}
					data={kills()}
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
