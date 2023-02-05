import type { CollectionEntry } from 'astro:content'

/**
 * Returns the slug (URL fragment) for the given blogpost.
 * This function exists because `blogpost.slug` includes the subfolder
 * (eg “2020/”), and ends with “draft” if the post is a draft, but
 * blogpost URLs should not include the subfolder or “draft” suffix.
 */
const slugifyPost = (blogpost: CollectionEntry<'posts'>) => {
	const slugWithoutDraftSuffix = blogpost.data.draft
		? blogpost.slug.replace(/draft$/, '')
		: blogpost.slug

	// Delete slashes and anything before them.
	return slugWithoutDraftSuffix.replace(/.+\//, '')
}

/**
 * Eg, "Annual review" => "annual-review"
 */
const slugifyText = (text: string) => {
	if (!text) {
		return ''
	}
	return text
		.trim()
		.replace(/[^a-z0-9]+/i, '-')
		.toLowerCase()
}

/**
 * Returns the given posts, sorted reverse-chronologically.
 */
const sortPosts = (posts: CollectionEntry<'posts'>[]) => {
	return posts.sort((a, b) => (a.data.date < b.data.date ? 1 : -1))
}

export { slugifyPost, slugifyText, sortPosts }
