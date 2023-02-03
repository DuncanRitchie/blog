import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
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
    })),
    customData: `<language>en-gb</language>`,
  });
}
