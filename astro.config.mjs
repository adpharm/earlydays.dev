// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  server: {
    // "host" is necessary to run astro in development from a dev container
    // see https://github.com/vitejs/vite/issues/16522#issuecomment-2075856315
    host: "127.0.0.1",
  },

  output: "hybrid",

  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],

  adapter: node({
    mode: "standalone",
  }),
});