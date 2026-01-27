import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Parse date strings as MST (Mountain Standard Time)
const parseLocalDate = (val: string | Date) => {
  if (typeof val === 'string') {
    // First parse the date in any format
    const tempDate = new Date(val);
    // Convert to YYYY-MM-DD format
    const year = tempDate.getFullYear();
    const month = String(tempDate.getMonth() + 1).padStart(2, '0');
    const day = String(tempDate.getDate()).padStart(2, '0');
    const isoDateString = `${year}-${month}-${day}`;
    // Parse as MST (UTC-7) by appending time and timezone offset
    return new Date(isoDateString + 'T00:00:00-07:00');
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
      .transform(parseLocalDate)
      .optional(),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? parseLocalDate(str) : undefined)),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog };
