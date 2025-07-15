// eslint.config.js
import { defineConfig } from "eslint/config";
import baseConfig from "@mainqueueio/eslint-config/eslint";

export default defineConfig([
	{
		files: ["**/*.ts", "**/*.tsx"],
		extends: [baseConfig],
	},
]);
