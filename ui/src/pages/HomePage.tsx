import { css } from "styled-system/css";
import { DamageDealtChart } from "~/components/DamageDealtChart";
import { Inventory } from "~/components/Inventory";
import { KillsChart } from "~/components/KillsChart";
import { Splitter } from "~/components/ui/splitter";

export const HomePage = () => {
	return (
		<div class={css({ height: "100%", padding: "4" })}>
			<Splitter.Root
				size={[
					{ id: "l", size: 50 },
					{ id: "r", size: 50 },
				]}
				orientation="horizontal"
			>
				<Splitter.Panel
					id="l"
					class={css({ paddingY: "2", paddingX: "4", gap: "2", alignItems: "stretch", flexDir: "column", minHeight: "0" })}
				>
					<DamageDealtChart />
					<KillsChart />
					<DamageDealtChart />
				</Splitter.Panel>

				<Splitter.ResizeTrigger id="l:r" />

				<Splitter.Panel id="r">
					<Inventory />
				</Splitter.Panel>
			</Splitter.Root>
		</div>
	);
};
