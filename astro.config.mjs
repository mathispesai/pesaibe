// astro.config.ts
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://www.pesai.be/",
  output: "static",
  integrations: [mdx(), sitemap(), react()],
  // adapter: cloudflare(),  <-- deze lijn verwijderen
});
