import { type CollectionEntry } from 'astro:content'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'
const parser = new MarkdownIt({ html: true, breaks: true, linkify: true })

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
 * Replaces relative links in a HTML string with the absolute equivalent
 * @param html HTML string that might contain `src` or `href` attributes
 * @param pagePath The string to insert between the base URL and the relative link — eg "slug" in "/blog/slug#section".
 * @returns
 */
const absoluteLinksInHtml = (html: string, pagePath: string) => {
	// addLinkBase adds the site’s base to the start of `pagePath`
	// The replace function then adds that to the start of any `src`
	// or `href` HTML attribute that begins with a slash or octothorpe.
	const newHtml = html.replace(
		/(?<=src="|href=")(?=[#\/])/g,
		addLinkBase(pagePath),
	)
	return newHtml
}

/**
 * Generats the `items` field for rss.xml.js files.
 * @param posts Array of posts as collection entries
 * @returns The `items` field for the RSS feed
 */
const rssItems = (posts: CollectionEntry<'posts'>[]) => {
	return posts.map((post) => ({
		title: escapeHtml(post.data.title),
		pubDate: new Date(post.data.date),
		link: `/blog/${slugifyPost(post)}/`,
		// Render the post’s body to HTML, make links absolute, then encode it
		content: sanitizeHtml(
			absoluteLinksInHtml(parser.render(post.body), slugifyPost(post)),
		),
	}))
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

export {
	addLinkBase,
	escapeHtml,
	rssItems,
	slugifyPost,
	slugifyText,
	sortPosts,
}
