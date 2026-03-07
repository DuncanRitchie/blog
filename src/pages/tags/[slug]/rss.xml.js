import rss from '@astrojs/rss'

import { addLinkBase, rssItems, sortPosts } from '../../../utils/'
import { getStaticPaths as getPathsForTags } from '../[slug].astro'

// Generate a new path for every collection entry
export async function getStaticPaths() {
	return getPathsForTags()
}

export async function GET(context) {
	const { posts, tag } = context.props
	const postsSorted = sortPosts(posts)

	return rss({
		title: `Posts tagged “${tag}” — Duncan Ritchie’s blog`,
		description: `Assorted notes that I thought should be recorded somewhere, which I have categorized under “${tag}”. More articles can be found via my blog’s homepage.`,
		site: context.url.href.replace('rss.xml', ''),
		items: rssItems(postsSorted),
		customData: `<language>en-gb</language>`,
		stylesheet: addLinkBase('rss-styles.xsl'),
	})
}
