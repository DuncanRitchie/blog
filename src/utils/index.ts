import type { CollectionEntry } from 'astro:content'

/** This function exists because `blogpost.slug` includes the
 * subfolder (eg “2020/”), but blogpost URLs should not include this.
 */
const slugifyPost = (blogpost: CollectionEntry<'posts'>) => {
	return blogpost.slug.replace(/.+\//, '')
}

const slugifyText = (text: string) => {
	return text
		.trim()
		.replace(/[^a-z0-9]+/i, '-')
		.toLowerCase()
}

const sortPosts = (posts: CollectionEntry<'posts'>[]) => {
	return posts
		.filter((post) => !post.data.draft)
		.sort((a, b) => (a.data.date < b.data.date ? 1 : -1))
}

export { slugifyPost, slugifyText, sortPosts }