import { For, Show, createEffect, createSignal, onMount } from "solid-js";
import { createStore, reconcile } from "solid-js/store";

import { ws } from "../App";
import { InventoryMessage } from "../WsMessages";
import { itemsEnum } from "../consts";
import { itemImages } from "../images";
import styles from "./Inventory.module.scss";

export const Inventory = () => {
	const [items, setItems] = createStore<{ [key: number]: { name: string; items: { [key: string]: number } } }>({});

	onMount(() => {
		// eslint-disable-next-line solid/reactivity
		ws.addListener("message:Inventory", (inventory: InventoryMessage) => {
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
		});

		ws.addListener("message:ResetData", () => {
			setItems(reconcile({}));
		});
	});

	return (
		<div>
			<div class="title">Items</div>
			<For each={Object.values(items)}>
				{(player) => (
					<div>
						<div class="title-2">{player.name}</div>
						<div class={styles.items}>
							<For each={Object.keys(itemsEnum)}>
								{(itemId) => {
									const [appearAnim, setAppearAnim] = createSignal(true);
									createEffect(() => {
										if (player.items[itemId] > 0) {
											setAppearAnim(false);
											setAppearAnim(true);
											setTimeout(() => setAppearAnim(false), 1000);
										}
									});

									return (
										<Show when={player.items[itemId] > 0}>
											<div class={styles.item} classList={{ [styles.appearAnimation]: appearAnim() }}>
												<img height={48} src={itemImages[itemId]} />
												<Show when={player.items[itemId] > 1}>
													<span class={styles.quantity}>x{player.items[itemId]}</span>
												</Show>
											</div>
										</Show>
									);
								}}
							</For>
						</div>
					</div>
				)}
			</For>
		</div>
	);
};
