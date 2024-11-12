import { For, Show, createEffect, createSignal, onCleanup } from "solid-js";
import { createStore, reconcile } from "solid-js/store";

import { css } from "../../styled-system/css";
import { InventoryMessage } from "../WsMessages";
import { itemsEnum } from "../consts";
import { itemImages } from "../images";
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
		<div class={css({ textAlign: "center" })}>
			<div class={css({ marginBottom: "2" })} classList={{ title: true }}>
				Items
			</div>

			<For each={Object.values(items)}>
				{(player) => (
					<div>
						<div class="title-2">{player.name}</div>
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
											<div class={css({ position: "relative" })} classList={{ group: true }}>
												<img
													class={css({
														height: "12",
														width: "auto",
														borderRadius: "full",
														transition: "transform 0.2s ease-in-out",
														userSelect: "none",
														_groupHover: {
															transform: "scale(1.2)",
														},
													})}
													classList={{ [css({ animation: "spin 800ms" })]: appearAnim() }}
													src={itemImages[itemId]}
												/>
												<Show when={player.items[itemId] > 1}>
													<span
														class={css({
															color: "white",
															position: "absolute",
															zIndex: 1,
															right: "-1",
															bottom: "-1",
														})}
													>
														x{player.items[itemId]}
													</span>
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
