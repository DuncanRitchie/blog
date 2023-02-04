import { z, defineCollection } from 'astro:content';

const postsCollection = defineCollection({
	schema: z.object({
		date: z.date(),
		title: z.string(),
		draft: z.boolean(),
		tags: z.array(z.string()),
	}),
});

// Keys here should match the collection directory names in "src/content"
export const collections = {
	posts: postsCollection,
};
