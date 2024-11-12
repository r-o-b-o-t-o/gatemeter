import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [solidPlugin(), tsconfigPaths({ root: "./" })],
	server: {
		port: 5000,
	},
	build: {
		target: "esnext",
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: "modern-compiler",
			},
		},
	},
});
