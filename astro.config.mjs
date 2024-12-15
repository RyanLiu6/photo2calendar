import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [react(),tailwind()],
  output: "server",
  adapter: node({
    mode: "development"
  })
});
