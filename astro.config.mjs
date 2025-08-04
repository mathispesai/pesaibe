import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://www.pesai.be/",
  output: "static",
  integrations: [
    mdx(),
    sitemap(),
    react(),
    tailwind()  // Voeg Tailwind toe
  ],
});