import rss from '@astrojs/rss'
import { getContainerRenderer as getMdxRenderer } from '@astrojs/mdx'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { loadRenderers } from 'astro:container'
import { getCollection, render } from 'astro:content'

import { addLinkBase, escapeHtml, slugifyPost, sortPosts } from '../utils/'

// Code adapted for MDX from https://blog.damato.design/posts/astro-rss-mdx/

export async function GET(context) {
	const posts = await getCollection('posts')
	const postsSorted = sortPosts(posts)

	const renderers = await loadRenderers([getMdxRenderer()])
	const container = await AstroContainer.create({ renderers })

	// Use Astro Containers to render the posts to HTML.
	const items = []
	for (const post of postsSorted) {
		const { Content } = await render(post)
		const content = await container.renderToString(Content)
		const link = addLinkBase(slugifyPost(post))
		items.push({
			...post.data,
			link,
			content,
			title: escapeHtml(post.data.title),
			pubDate: new Date(post.data.date),
		})
	}

	return rss({
		title: 'Duncan Ritchie’s blog',
		description:
			'Assorted notes about software development and other matters that I find interesting.',
		site: context.site,
		items,
		customData: `<language>en-gb</language>`,
		stylesheet: addLinkBase('rss-styles.xsl'),
	})
}
