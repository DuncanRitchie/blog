import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import MarkdownIt from 'markdown-it/lib'
const parser = new MarkdownIt()

import { escapeHtml, slugifyPost, sortPosts } from '../utils/'

export async function GET(context) {
	const posts = await getCollection('posts')
	const postsSorted = sortPosts(posts)

	return rss({
		title: 'Duncan Ritchie’s blog',
		description:
			'Assorted notes that may or may not relate to web development, but that I thought should be recorded somewhere.',
		site: context.site,
		items: postsSorted.map((post) => ({
			title: escapeHtml(post.data.title),
			pubDate: new Date(post.data.date),
			link: `/blog/${slugifyPost(post)}/`,
			// Render the post’s body to HTML
			content: parser.render(post.body),
		})),
		customData: `<language>en-gb</language>`,
		stylesheet: import.meta.env.BASE_URL + '/rss-styles.xsl',
	})
}
