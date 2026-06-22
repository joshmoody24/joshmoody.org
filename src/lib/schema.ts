import { SITE_URL, SITE_DESCRIPTION } from "../consts";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BLOG_ID = `${SITE_URL}/blog/#blog`;

const SOCIAL_PROFILES = [
  "https://github.com/joshmoody24",
  "https://www.youtube.com/channel/UCxFHoHvQWZ0VF9NM_XcYVeA",
  "https://www.linkedin.com/in/joshmoody24/",
  "https://twitter.com/joshmoody24",
];

const personNode = () => ({
  "@type": "Person",
  "@id": PERSON_ID,
  url: `${SITE_URL}/`,
  name: "Josh Moody",
  givenName: "Josh",
  familyName: "Moody",
  image: `${SITE_URL}/josh/josh-moody-1280.jpg`,
  sameAs: SOCIAL_PROFILES,
});

const websiteNode = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: "joshmoody.org",
  alternateName: ["Josh Moody"],
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
});

export const baseGraph = () => [websiteNode(), personNode()];

export const profilePageNode = () => ({
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#webpage`,
  url: `${SITE_URL}/`,
  isPartOf: { "@id": WEBSITE_ID },
  name: "Josh Moody",
  inLanguage: "en",
  mainEntity: { "@id": PERSON_ID },
});

export const blogNode = () => ({
  "@type": "Blog",
  "@id": BLOG_ID,
  isPartOf: { "@id": WEBSITE_ID },
  name: "Josh Moody's Blog",
  description: "A collection of Josh Moody's technical blog posts.",
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
});

interface BlogPostingInput {
  url: string;
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  heroImage?: string;
}

export const blogPostingNode = ({
  url,
  title,
  description,
  pubDate,
  updatedDate,
  heroImage,
}: BlogPostingInput) => ({
  "@type": "BlogPosting",
  "@id": `${url}#blogposting`,
  url,
  isPartOf: { "@id": BLOG_ID },
  headline: title,
  description,
  inLanguage: "en",
  datePublished: pubDate.toISOString(),
  dateModified: (updatedDate ?? pubDate).toISOString(),
  author: { "@id": PERSON_ID },
  publisher: { "@id": PERSON_ID },
  ...(heroImage && { image: new URL(heroImage, SITE_URL).href }),
});
