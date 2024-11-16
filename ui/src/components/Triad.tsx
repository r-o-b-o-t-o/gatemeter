import { For } from "solid-js";

import { Item } from "./Item";
import { css } from "styled-system/css";
import { IItem, allItems } from "~/items";

enum ETriadState {
	None,
	Started,
	Available,
	Completed,
}

interface IProperties {
	item: IItem;
	itemCount: (itemId: string) => number;
}

export const Triad = (props: IProperties) => {
	const counts = () => props.item.triad.map((id) => props.itemCount(id.toString()));
	const state = () => {
		if (!counts().some((c) => c > 0)) {
			return ETriadState.None;
		}
		if (!counts().some((c) => c === 0)) {
			const triadId = Object.keys(allItems)[Object.values(allItems).indexOf(props.item)];
			if (props.itemCount(triadId) > 0) {
				return ETriadState.Completed;
			}
			return ETriadState.Available;
		}
		return ETriadState.Started;
	};

	return (
		<div
			class={css({
				display: state() === ETriadState.None ? "none" : "flex",
				flexDir: "row",
				gap: "2",
				padding: "1",
				borderWidth: "medium",
				borderRadius: "md",
				transition: "background 0.2s ease-in-out, border-color 0.2s ease-in-out",
			})}
			classList={{
				[css({ display: "none" })]: state() === ETriadState.None,
				[css({ display: "flex" })]: state() !== ETriadState.None,
				[css({ bg: "gray.5" })]: state() === ETriadState.Started,
				[css({ borderColor: "gray.4" })]: state() === ETriadState.Started,
				[css({ bg: "indigo.6" })]: state() === ETriadState.Available,
				[css({ borderColor: "indigo.5" })]: state() === ETriadState.Available,
				[css({ bg: "green.7" })]: state() === ETriadState.Completed,
				[css({ borderColor: "green.6" })]: state() === ETriadState.Completed,
			}}
		>
			<For each={props.item.triad}>
				{(itemId) => (
					<Item
						item={allItems[itemId]}
						size="2rem"
						classList={{ [css({ filter: "grayscale(1)" })]: props.itemCount(itemId.toString()) === 0 }}
					/>
				)}
			</For>
		</div>
	);
};
