import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://joshmoody.org",
  integrations: [mdx(), sitemap()],
  compressHTML: true,
  markdown: {
    shikiConfig: {
      themes: {
        light: "slack-ochin",
        dark: "andromeeda",
      },
    },
  },
});
