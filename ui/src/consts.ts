import * as d3 from "d3";

export const maxPlayers = 4;
export const characterChartBarHeight = 75;
export const chartsDelay = 400;
export const chartsBarColorAlpha = 0.8;
export const characterCategories = ["Hybrid", "Nidum", "Pandora", "Bastion", "Tech Hunter", "Mediator", "Echo", "Void Model"];
export const characterColors = [
	d3.rgb(74, 182, 231, chartsBarColorAlpha), // Hybrid
	d3.rgb(241, 84, 0, chartsBarColorAlpha), // Nidum
	d3.rgb(165, 105, 255, chartsBarColorAlpha), // Pandora
	d3.rgb(217, 19, 16, chartsBarColorAlpha), // Bastion
	d3.rgb(255, 221, 64, chartsBarColorAlpha), // Tech Hunter
	d3.rgb(101, 24, 22, chartsBarColorAlpha), // Mediator
	d3.rgb(88, 188, 153, chartsBarColorAlpha), // Echo
	d3.rgb(38, 51, 68, chartsBarColorAlpha), // Void Model
];
