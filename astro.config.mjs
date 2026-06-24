import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://joshmoody.org",
  integrations: [mdx(), sitemap()],
  compressHTML: true,
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeMathjax, { svg: false }]],
    }),
    shikiConfig: {
      themes: {
        light: "light-plus",
        dark: "andromeeda",
      },
    },
  },
});
