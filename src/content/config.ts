import { defineCollection, z } from 'astro:content';

const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.date(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  news: newsCollection,
};