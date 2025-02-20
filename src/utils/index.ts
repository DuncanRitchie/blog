import { type CollectionEntry } from 'astro:content'

/**
 * Replace HTML characters with their escaped equivalents.
 * So < becomes &gt; for example.
 */
const escapeHtml = (text: string) => {
	// Other characters may need to be added here.
	return text.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

/**
 * Returns the slug (URL fragment) for the given blogpost.
 * Eg it the filepath is "src/content/posts/2020/mandarin-ducks.md",
 * the slug will be "mandarin-ducks".
 */
const slugifyPost = (blogpost: CollectionEntry<'posts'>) => {
	if (!blogpost) {
		return ''
	}
	if (!blogpost.filePath) {
		console.error(
			'No `filePath` property on blogpost!',
			blogpost.id,
			Object.keys(blogpost),
		)
		return ''
	}

	const slugWithoutDraftSuffix = blogpost.data.draft
		? blogpost.filePath.replace(/\.md$/, '').replace(/\.draft$/, '')
		: blogpost.filePath.replace(/\.md$/, '')

	// Delete slashes and anything before them.
	const slug = slugWithoutDraftSuffix.replace(/.+\//, '')

	return slug
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

export { escapeHtml, slugifyPost, slugifyText, sortPosts }
