import { For, Show, createEffect, onCleanup } from "solid-js";
import { createStore, reconcile } from "solid-js/store";

import { css } from "../../styled-system/css";
import { InventoryMessage } from "../WsMessages";
import { Item } from "./Item";
import { Triad } from "./Triad";
import { useWs } from "~/WsClient";
import { allItems } from "~/items";

export const Inventory = () => {
	const ws = useWs();
	const [items, setItems] = createStore<{ [key: number]: { name: string; items: { [key: string]: number } } }>({});

	const onInventory = (inventory: InventoryMessage) => {
		if (!inventory.Items) {
			return;
		}

		if (!(inventory.ClientId in items)) {
			setItems(inventory.ClientId, {
				name: inventory.Name,
				items: inventory.Items,
			});
		} else {
			const currentItems = items[inventory.ClientId].items;
			for (const itemId in inventory.Items) {
				const quantity = inventory.Items[itemId];
				if (!(itemId in currentItems) || currentItems[itemId] !== quantity) {
					setItems(inventory.ClientId, "items", itemId, quantity);
				}
			}
		}
	};

	const onResetData = () => {
		setItems(reconcile({}));
	};

	createEffect(() => {
		ws()?.on("message:Inventory", onInventory);
		ws()?.on("message:ResetData", onResetData);
	});

	onCleanup(() => {
		ws()?.off("message:Inventory", onInventory);
		ws()?.off("message:ResetData", onResetData);
	});

	return (
		<div class={css({ textAlign: "center", overflowY: "auto", overflowX: "hidden", height: "100%", paddingY: "2", paddingX: "4" })}>
			<div class={css({ marginBottom: "2" })} classList={{ title: true }}>
				Artifacts
			</div>

			<For each={Object.values(items)}>
				{(player) => {
					const totalCount = () => Object.values(player.items).reduce((sum, current) => sum + current, 0);
					return (
						<div>
							<div class="title-2">
								{player.name} ({totalCount()})
							</div>
							<div
								class={css({
									display: "flex",
									flexDir: "row",
									gap: "3",
									flexWrap: "wrap",
									justifyContent: "center",
									marginTop: "2",
								})}
							>
								<For each={Object.keys(allItems).filter((itemId) => !allItems[itemId].triad)}>
									{(itemId) => {
										const item = allItems[itemId];
										const count = () => player.items[itemId] ?? 0;
										return (
											<Show when={count() > 0}>
												<Item item={item} count={count()} initialAppearAnimation />
											</Show>
										);
									}}
								</For>
							</div>

							<div
								class={css({
									display: "flex",
									flexDir: "row",
									gap: "3",
									flexWrap: "wrap",
									justifyContent: "center",
									marginTop: "2",
									marginBottom: "4",
								})}
							>
								<For each={Object.values(allItems).filter((item) => !!item.triad)}>
									{(item) => <Triad item={item} itemCount={(id) => player.items[id] ?? 0} />}
								</For>
							</div>
						</div>
					);
				}}
			</For>
		</div>
	);
};
