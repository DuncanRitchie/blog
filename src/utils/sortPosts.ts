import type { CollectionEntry } from 'astro:content';

const sortPosts = (posts: CollectionEntry<'posts'>[]) => {
	return posts
		.filter((post) => !post.data.draft)
		.sort((a, b) => (a.data.date < b.data.date ? 1 : -1));
};

export { sortPosts };
