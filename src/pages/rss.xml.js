import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it/lib';
const parser = new MarkdownIt();

import { getCollection } from 'astro:content';

export async function get(context) {
	const posts = await getCollection('posts');

  return rss({
    title: 'Duncan Ritchie’s Blog',
    description: 'Assorted notes that may or may not relate to web development',
    site: context.site,
    items: posts.map((post) => ({
      title: sanitizeHtml(post.data.title),
      pubDate: new Date(post.data.date),
      link: `/blog/${post.slug}/`,
			// Render the post’s body to HTML, then encode it
			content: sanitizeHtml(parser.render(post.body)),
    })),
    customData: `<language>en-gb</language>`,
  });
}
