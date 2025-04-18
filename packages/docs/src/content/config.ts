import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

// Define the 'docs' collection, extending the Starlight schema
const docsCollection = defineCollection({
  schema: docsSchema({
    extend: z.object({
      // Add any custom frontmatter fields here if needed later
      // exampleField: z.string().optional(),
    }),
  }),
});

export const collections = {
  docs: docsCollection,
};