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
      devOptions: {
        enabled: true,
      },
      manifest: {
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        display_override: ["window-controls-overlay"],
        id: "/",
        protocol_handlers: [
          {
            protocol: "web+secondlab",
            url: "/?type=%s",
          },
        ],
      },
    }),
  ],
});
