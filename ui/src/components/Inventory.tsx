import { For, Show, createEffect, createSignal, onCleanup } from "solid-js";
import { createStore, reconcile } from "solid-js/store";

import { css } from "../../styled-system/css";
import { InventoryMessage } from "../WsMessages";
import { itemsEnum } from "../consts";
import { itemImages } from "../images";
import styles from "./Inventory.module.scss";
import { useWs } from "~/WsClient";

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
		<div class={styles.section}>
			<div class={`title ${styles.title}`}>Items</div>

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
												<img class={css({ height: "12", width: "auto" })} src={itemImages[itemId]} />
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
