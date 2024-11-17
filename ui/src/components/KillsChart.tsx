import { throttle } from "@solid-primitives/scheduled";
import { createEffect, createSignal, onCleanup } from "solid-js";

import { CharacterStatsMessage } from "../WsMessages";
import { characterCategories, characterChartBarHeight, characterColors, chartsDelay, maxPlayers } from "../consts";
import { characterImages } from "../images";
import { mapPlayerData, rankByValues } from "../utils";
import { BarChartRace } from "./BarChartRace";
import { css } from "styled-system/css";
import { useWs } from "~/WsClient";

export const KillsChart = () => {
	const ws = useWs();

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

	const onCharacterStats = (msg: CharacterStatsMessage) => {
		const stats = msg.Data;

		setKillsThrottled(() => {
			const data = stats.map((player) => mapPlayerData(player, player.Kills));
			rankByValues(data);
			return data;
		});
	};

	const onResetData = () => {
		setKills([]);
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
			<div class="title">Kills</div>
			<div class={css({ marginTop: "1", minHeight: "0" })}>
				<BarChartRace
					data={kills()}
					categories={characterCategories}
					categoryImages={characterImages}
					initialBarColors={characterColors}
					showCategory={true}
					delay={chartsDelay}
					barHeight={characterChartBarHeight}
					maxBarCount={maxPlayers}
					setReset={setResetChart}
				/>
			</div>
		</div>
	);
};
