import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

import { addLinkBase, rssItemsMdx, sortPosts } from '../utils/'

// Code adapted for MDX from https://blog.damato.design/posts/astro-rss-mdx/

export async function GET(context) {
	const posts = await getCollection('posts')
	const postsSorted = sortPosts(posts)

	return rss({
		title: 'Duncan Ritchie’s blog',
		description:
			'Assorted notes about software development and other matters that I find interesting.',
		site: context.site,
		items: rssItemsMdx(postsSorted),
		customData: `<language>en-gb</language>`,
		stylesheet: addLinkBase('rss-styles.xsl'),
	})
}
