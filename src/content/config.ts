import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Parse date strings as MST (Mountain Standard Time)
const parseLocalDate = (val: string | Date) => {
  if (typeof val === 'string') {
    // Parse as MST (UTC-7) by appending time and timezone offset
    return new Date(val + 'T00:00:00-07:00');
  }
  return new Date(val);
};

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform(parseLocalDate),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? parseLocalDate(str) : undefined)),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog };
