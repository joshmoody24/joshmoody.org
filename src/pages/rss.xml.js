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
    // Remove import statements and MDX components
    let cleanedBody = post.body.replace(
      /^import\s+.*?from\s+['"].*?['"];?\s*$/gm,
      "",
    );

    // Remove unclosed or problematic JSX tags that could break HTML parsing
    cleanedBody = cleanedBody.replace(/<[A-Z]\w+[^>]*>/g, "");
    cleanedBody = cleanedBody.replace(/<\/[A-Z]\w+>/g, "");

    const html = parser.render(cleanedBody);

    let content = sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "title", "width", "height"],
      },
    });

    const postUrl = new URL(`/blog/${post.slug}/`, context.site).toString();

    // Convert relative URLs to absolute URLs
    content = content.replace(/href="\/([^"]+)"/g, `href="${context.site}$1"`);
    content = content.replace(/src="\/([^"]+)"/g, `src="${context.site}$1"`);
    // Convert anchor links to absolute URLs
    content = content.replace(/href="#([^"]+)"/g, `href="${postUrl}#$1"`);

    if (post.data.heroImage) {
      const imageUrl = new URL(post.data.heroImage, context.site).toString();
      const escapedTitle = post.data.title.replace(/"/g, '&quot;');
      content = `<p><img src="${imageUrl}" alt="${escapedTitle}" width="100%" /></p>${content}`;
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
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
    customData: `<atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />`,
    items: items,
  });
}
