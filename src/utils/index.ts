import { type CollectionEntry } from 'astro:content'

/**
 * For use in hrefs — constructs a URL as a string from the base URL and `urlFragments`.
 * Eg addLinkBase('years', 2020) => "/blog/years/2020"
 * If no parameter is passed, returns the base URL.
 * Adapted from my Childhood Blog.
 */
function addLinkBase(...urlFragments: (string | number)[]): string {
	const base = import.meta.env.BASE_URL
	let concatenated = base
	for (let i = 0; i < urlFragments.length; i++) {
		concatenated = concatenated + '/' + urlFragments[i]
	}
	const cleaned = concatenated.replace(/\/+/g, '/') // Collapse any consecutive slashes into one slash.
	return cleaned
}

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
 * Eg if the filepath is "src/content/posts/2020/mandarin-ducks.md",
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

	// Delete .md, .mdx, .draft.md, .draft.mdx from the end of the filepath.
	const slugWithoutDraftSuffix = blogpost.filePath
		.replace(/\.md(x?)$/, '')
		.replace(/\.draft$/, '')

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

export { addLinkBase, escapeHtml, slugifyPost, slugifyText, sortPosts }
