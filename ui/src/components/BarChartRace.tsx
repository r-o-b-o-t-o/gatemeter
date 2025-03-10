import { Setter, createEffect, onMount } from "solid-js";

import styles from "./BarChartRace.module.scss";
import * as d3 from "d3";

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
	barHeight: number;
	maxBarCount: number;
	categories: string[];
	categoryImages?: string[];
	delay?: number;
	showCategory?: boolean;
	showPercentage?: boolean;
	initialBarColors?: (d3.RGBColor | string)[];
	id?: string;
	class?: string;
	setReset?: Setter<() => void>;
}

export const BarChartRace = <T extends IDataType>(props: IProperties<T>) => {
	let svgRef: SVGSVGElement;
	let svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;

	const barCount = () => Math.min(props.data.length, props.maxBarCount);
	const barColors = props.initialBarColors ?? d3.schemeCategory10;
	const delay = () => props.delay ?? 500;
	const showCategory = () => props.showCategory ?? true;
	const showPercentage = () => props.showPercentage ?? true;
	const plotW = 700;
	const plotH = () => props.barHeight * barCount();
	const hasImages = () => props.categoryImages?.length > 0;

	const xScale = d3.scaleLinear();
	const yScale: d3.ScaleBand<number> = d3.scaleBand();
	const cScale = d3.scaleOrdinal(barColors);

	const reset = () => {
		xScale.domain([0, 0]);
		svg.selectAll(`.${styles.bar}`).remove();
	};

	xScale.rangeRound([0, plotW]);

	createEffect(() => {
		yScale.domain(d3.range(barCount()));
		yScale.range([0, plotH()]);
	});

	createEffect(() => {
		cScale.domain(props.categories);
	});

	createEffect(() => {
		props.setReset?.(() => {
			return reset;
		});
	});

	let total = 0;

	let tbr: d3.Transition<SVGSVGElement, unknown, null, undefined>;
	let tbv: d3.Transition<SVGSVGElement, unknown, null, undefined>;
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
	const percentage = (value: number) => Math.round((value / total) * 100) + " %";

	const enterBar = (sel: d3.Selection<SVGGElement, T, SVGSVGElement, unknown>) => {
		const step = yScale.step();
		const barH = yScale.bandwidth();

		sel
			.attr("class", `${styles.bar} ${showCategory() ? styles.showCategory : ""} ${showPercentage() ? styles.showPercentage : ""}`)
			.attr("transform", (d: T) => `translate(0, ${(d.prev - 1) * step})`)
			.transition(tbr)
			.attr("transform", (d: T) => `translate(0, ${(d.rank - 1) * step})`);

		sel
			.append("rect")
			.attr("y", 0)
			.attr("x", 0)
			.attr("height", barH)
			.attr("width", (d: T) => xScale(d.value))
			.attr("fill", (d: T) => cScale(props.categories[d.category]).toString());

		sel
			.append("text")
			.attr("class", styles.label)
			.attr("x", (hasImages() ? 75 : 0) + 12)
			.attr("y", "1.35em")
			.text((d: T) => d.label);

		if (showCategory()) {
			sel
				.append("text")
				.attr("class", styles.category)
				.attr("x", (hasImages() ? 75 : 0) + 12)
				.attr("y", "3.5em")
				.text((d: T) => props.categories[d.category]);
		}

		sel
			.append("text")
			.attr("class", styles.value)
			.attr("x", (d: T) => xScale(d.value))
			.attr("y", "1.5em")
			.attr("dx", -12)
			.text((d: T) => formatNumber(d.value));

		if (showPercentage()) {
			sel
				.append("text")
				.attr("class", styles.percentage)
				.attr("x", (d: T) => xScale(d.value))
				.attr("y", "3.5em")
				.attr("dx", -12)
				.text((d: T) => percentage(d.value));
		}

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

	const updateBar = (gbar: d3.Selection<d3.BaseType, T, SVGSVGElement, unknown>) => {
		const step = yScale.step();

		gbar.transition(tbr).attr("transform", (d: T) => `translate(0,${(d.rank - 1) * step})`);

		gbar
			.select("rect")
			.transition(tbv)
			.attr("width", (d: T) => xScale(d.value));

		gbar
			.select(`.${styles.value}`)
			.transition(tbv)
			.attr("x", (d: T) => xScale(d.value))
			.text((d: T) => formatNumber(d.value));

		gbar
			.select(`.${styles.percentage}`)
			.transition(tbv)
			.attr("x", (d: T) => xScale(d.value))
			.text((d: T) => percentage(d.value));
	};

	const draw = () => {
		const data = props.data.filter((d) => d.value);

		if (!svg || data.length === 0) {
			return;
		}

		// It seems this must be done before each draw
		createTransitions();

		// X scale is "reactive"
		const hival = data[0].value;
		xScale.domain([0, hival]);

		total = data.reduce((sum, d) => sum + d.value, 0);

		const step = yScale.step();
		svg
			.selectAll(`.${styles.bar}`)
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
	});

	return (
		<svg
			id={props.id}
			class={`${styles.chart} ${props.class ?? ""}`}
			ref={svgRef}
			width="100%"
			height="100%"
			viewBox={`0 0 ${plotW} ${plotH()}`}
		/>
	);
};
