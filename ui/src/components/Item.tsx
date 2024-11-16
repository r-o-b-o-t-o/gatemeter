import { Show, createEffect, createSignal } from "solid-js";
import { Portal } from "solid-js/web";

import { Tooltip } from "./ui/tooltip";
import { css } from "styled-system/css";
import { IItem } from "~/items";

interface IProperties {
	item: IItem;
	count?: number;
	size?: string;
	initialAppearAnimation?: boolean;
	class?: string;
	classList?: {
		[k: string]: boolean;
	};
}

export const Item = (props: IProperties) => {
	const size = () => props.size ?? "3rem";
	const count = () => props.count ?? 0;

	const [appearAnim, setAppearAnim] = createSignal(props.initialAppearAnimation);
	createEffect(() => {
		if (props.initialAppearAnimation && count() > 0) {
			setAppearAnim(false);
			setAppearAnim(true);
			setTimeout(() => setAppearAnim(false), 1000);
		}
	});

	return (
		<Tooltip.Root openDelay={0} closeDelay={0}>
			<Tooltip.Trigger>
				<div class={css({ position: "relative" }) + (props.class ?? "")} classList={{ group: true, ...props.classList }}>
					<img
						class={css({
							width: "auto",
							borderRadius: "full",
							transition: "transform 0.2s ease-in-out",
							userSelect: "none",
							_groupHover: {
								transform: "scale(1.2)",
							},
						})}
						classList={{ [css({ animation: "spin 800ms" })]: appearAnim() }}
						style={{ height: size() }}
						src={props.item.image}
					/>
					<Show when={count() > 1}>
						<span
							class={css({
								color: "white.a11",
								fontFamily: "mont",
								position: "absolute",
								zIndex: 1,
								right: "-1",
								bottom: "-1",
							})}
						>
							x{count()}
						</span>
					</Show>
				</div>
			</Tooltip.Trigger>

			<Portal>
				<Tooltip.Positioner>
					<Tooltip.Arrow>
						<Tooltip.ArrowTip />
					</Tooltip.Arrow>
					<Tooltip.Content>
						<span class={css({ fontFamily: "mont" })}>{props.item.name}</span>
					</Tooltip.Content>
				</Tooltip.Positioner>
			</Portal>
		</Tooltip.Root>
	);
};
