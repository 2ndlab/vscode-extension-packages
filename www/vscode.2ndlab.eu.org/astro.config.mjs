import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import AstroPWA from "@vite-pwa/astro";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	integrations: [
		solidJs(),
		tailwind(),
		AstroPWA({
			/* other options */
			/* enable sw on development */
			devOptions: {
				enabled: true,
				/* other options */
			},
		}),
	],
});
