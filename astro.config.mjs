// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import inoxToolsRequestNanostores from "@inox-tools/request-nanostores";

// https://astro.build/config
export default defineConfig({
  server: {
    // "host" is necessary to run astro in development from a dev container
    // see https://github.com/vitejs/vite/issues/16522#issuecomment-2075856315
    host: "0.0.0.0",
    port: 3000,
  },

  output: "server",

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
  integrations: [react(), inoxToolsRequestNanostores()],
});
