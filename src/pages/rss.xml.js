import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection("blog");
  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
  );

  const items = sortedPosts.map((post) => {
    // Remove import statements but keep everything else
    const cleanedBody = post.body.replace(
      /^import\s+.*?from\s+['"].*?['"];?\s*$/gm,
      "",
    );

    const html = parser.render(cleanedBody);

    let content = sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "title", "width", "height"],
      },
    });

    if (post.data.heroImage) {
      const imageUrl = new URL(post.data.heroImage, context.site).toString();
      content = `<img src="${imageUrl}" alt="${post.data.title}" style="max-width: 100%; height: auto;" />${content}`;
    }

    return {
      ...post.data,
      link: `/blog/${post.slug}/`,
      content: content,
    };
  });

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: items,
  });
}
