import rss from '@astrojs/rss'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it/lib'
const parser = new MarkdownIt()

import { escapeHtml, slugifyPost, sortPosts } from '../../../utils/'
import { getStaticPaths as getPathsForTags } from '../../tags/[slug].astro'

// Generate a new path for every collection entry
export async function getStaticPaths() {
	return getPathsForTags()
}

export async function get(context) {
	const { posts, tag } = context.props
	const postsSorted = sortPosts(posts)

	return rss({
		title: `Posts tagged “${tag}” — Duncan Ritchie’s blog`,
		description: `Assorted notes that I thought should be recorded somewhere, which I have categorized under “${tag}”. More articles can be found via my blog’s homepage.`,
		site: context.url.href.replace('rss.xml', ''),
		items: postsSorted.map((post) => ({
			title: escapeHtml(post.data.title),
			pubDate: new Date(post.data.date),
			link: `/blog/${slugifyPost(post)}/`,
			// Render the post’s body to HTML, then encode it
			content: sanitizeHtml(parser.render(post.body)),
		})),
		customData: `<language>en-gb</language>`,
		stylesheet: import.meta.env.BASE_URL + 'rss-styles.xsl',
	})
}
