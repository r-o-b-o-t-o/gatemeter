import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	presets: [
		"@pandacss/preset-base",
		createPreset({
			accentColor: "indigo",
			grayColor: "slate",
			borderRadius: "md",
			additionalColors: ["*"],
		}),
	],

	theme: {
		extend: {
			tokens: {
				fonts: {
					mont: { value: "var(--font-mont)" },
					bold: { value: "var(--font-bold)" },
				},
			},
		},
	},

	// Where to look for your css declarations
	include: ["./src/**/*.{js,jsx,ts,tsx}"],

	// Files to exclude
	exclude: [],

	jsxFramework: "solid",

	// The output directory for your css system
	outdir: "styled-system",
});
