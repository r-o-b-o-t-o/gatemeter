import eslint from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import solid from "eslint-plugin-solid/configs/recommended";
import tseslint from "typescript-eslint";

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	eslintPluginPrettierRecommended,
	{
		ignores: ["dist/", "styled-system/"],
	},
	{
		files: ["**/*.{ts,tsx}"],
		...solid,
		languageOptions: {
			parser: tsParser,
		},
	}
);
