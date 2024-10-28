import { Setter, createEffect, onMount } from "solid-js";

import * as d3 from "d3";
import { nanoid } from "nanoid";

interface IDataType {
	label: string;
	category: number;
	value: number;
	rank: number;
	prev: number;
	next: number;
}

interface IProperties<T extends IDataType> {
	data: T[];
	width: number;
	height: number;
	barCount: number;
	categories: string[];
	categoryImages?: string[];
	barHeight?: number;
	delay?: number;
	showCategory?: boolean;
	initialBarColors?: (d3.RGBColor | string)[];
	id?: string;
	class?: string;
	setReset?: Setter<() => void>;
}

export const BarChartRace = <T extends IDataType>(props: IProperties<T>) => {
	let svgRef: SVGSVGElement;
	let plotRef: SVGGElement;

	let svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
	let plot: d3.Selection<SVGGElement, unknown, null, undefined>;

	const barCount = () => props.barCount;
	const barColors = props.initialBarColors ?? d3.schemeCategory10;
	const delay = () => props.delay ?? 500;
	const showCategory = () => props.showCategory ?? true;
	const plotW = () => props.width;
	const plotH = () => props.height;
	const hasImages = () => props.categoryImages?.length > 0;

	const xScale = d3.scaleLinear();
	const yScale = d3.scaleBand(d3.range(barCount()), [0, plotH()]);
	const cScale = d3.scaleOrdinal(barColors);

	const reset = () => {
		xScale.domain([0, 0]);
		plot.selectAll("g.bar").remove();
	};

	createEffect(() => {
		xScale.rangeRound([0, plotW()]);
		draw();
	});

	createEffect(() => {
		props.setReset?.(() => {
			return reset;
		});
	});

	createEffect(() => {
		cScale.domain(props.categories);
	});

	let tbr;
	let tbv;
	const createTransitions = () => {
		// Change bar rank (delayed, short, eased)
		tbr = svg
			.transition()
			.delay(delay() * 0.5)
			.duration(delay() * 0.4);

		// Change bar value (linear)
		tbv = svg.transition().duration(delay).ease(d3.easeLinear);
	};

	const numberFormatter = Intl.NumberFormat([], {
		notation: "compact",
		maximumFractionDigits: 1,
	});
	const formatNumber = (num: number) => {
		return numberFormatter.format(num);
	};

	const enterBar = (sel) => {
		const step = yScale.step();
		const barH = yScale.bandwidth();

		sel
			.attr("class", `bar ${showCategory() ? "show-category" : ""}`)
			.attr("transform", (d: T) => `translate(0, ${(d.prev - 1) * step})`)
			.transition(tbr)
			.attr("transform", (d: T) => `translate(0, ${(d.rank - 1) * step})`);

		sel
			.append("rect")
			.attr("y", 0)
			.attr("x", 0)
			.attr("height", barH)
			.attr("width", (d) => xScale(d.value))
			.attr("fill", (d) => cScale(props.categories[d.category]));

		sel
			.append("text")
			.attr("class", "label")
			.attr("x", (hasImages() ? 75 : 0) + 12)
			.attr("y", "1.35em")
			.text((d) => d.label);

		if (showCategory()) {
			sel
				.append("text")
				.attr("class", "cat")
				.attr("x", (hasImages() ? 75 : 0) + 12)
				.attr("y", "3.5em")
				.text((d) => props.categories[d.category]);
		}

		sel
			.append("text")
			.attr("class", "value")
			.attr("x", (d: T) => xScale(d.value))
			.attr("y", "1.5em")
			.attr("dx", -12)
			.text((d) => formatNumber(d.value));

		if (hasImages()) {
			sel
				.append("image")
				.attr("x", 0)
				.attr("y", 0)
				.attr("width", barH)
				.attr("height", barH)
				.attr("href", (d: T) => props.categoryImages[d.category]);
		}
	};

	const updateBar = (gbar) => {
		const step = yScale.step();

		gbar.transition(tbr).attr("transform", (d) => `translate(0,${(d.rank - 1) * step})`);

		gbar
			.select("rect")
			.transition(tbv)
			.attr("width", (d) => xScale(d.value));

		gbar
			.select("text.value")
			.transition(tbv)
			.attr("x", (d) => xScale(d.value))
			.text((d) => formatNumber(d.value)); // FIX: add interpolation (or not?)
	};

	const draw = () => {
		const data = props.data.filter((d) => d.value);

		if (!svg || data.length === 0) {
			return;
		}

		// It seems this must be done before each draw
		createTransitions();

		// X scale is "reactive"
		const domain = xScale.domain();
		const hival = data[0].value;
		if (domain[1] <= hival) {
			xScale.domain([0, hival]);
		}

		const step = yScale.step();
		plot
			.selectAll("g.bar")
			.data(data, (d: T) => d.label)
			.join(
				(enter) => enter.append("g").call(enterBar),
				(update) => update.call(updateBar),
				(exit) =>
					exit
						.attr("transform", (d: T) => `translate(0, ${(d.rank - 1) * step})`)
						.transition(tbr)
						.attr("transform", (d: T) => {
							const n = "next" in d ? d.next - 1 : barCount() * 2; // arbitrary
							return `translate(0, ${n * step})`;
						})
						.remove()
			);
	};

	createEffect(draw);

	onMount(() => {
		svg = d3.select(svgRef);
		plot = d3.select(plotRef);
	});

	const clipPathId = `clip-path-${nanoid()}`;

	return (
		<svg
			id={props.id}
			class={props.class ?? ""}
			ref={svgRef}
			width={props.width}
			height={props.height}
			viewBox={`0 0 ${props.width} ${props.height}`}
		>
			<g ref={plotRef} class="plot" clip-path={`url(#${clipPathId})`}>
				<clipPath id={clipPathId}>
					<rect x={0} y={0} width={plotW()} height={plotH()} />
				</clipPath>
			</g>
		</svg>
	);
};
