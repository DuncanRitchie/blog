import type { CollectionEntry } from 'astro:content'

/** This function exists because `blogpost.slug` includes the
 * subfolder (eg “2020/”), but blogpost URLs should not include this.
 */
const slugify = (blogpost: CollectionEntry<'posts'>) => {
	return blogpost.slug.replace(/.+\//, '')
}

export { slugify }
