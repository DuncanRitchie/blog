import { CollectionEntry, getCollection } from 'astro:content'

/**
 * Replace HTML characters with their escaped equivalents.
 * So < becomes &gt; for example.
 */
const escapeHtml = (text: string) => {
	// Other characters may need to be added here.
	return text.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

/**
 * Draft posts should have `draft:true` in frontmatter and “.draft.md” ending the filename.
 * This function logs if a post has one of those criteria but not the other.
 */
const isDraftStatusAmbiguous = (
	blogpost: CollectionEntry<'posts'>,
): boolean => {
	const hasDraftFrontmatter = blogpost.data.draft
	const isExcludedFromGit = blogpost.id.endsWith('.draft.md')
	if (hasDraftFrontmatter === isExcludedFromGit) {
		return false
	}
	if (hasDraftFrontmatter) {
		console.warn(
			'Marked as draft in frontmatter but not filename: ' + blogpost.id,
		)
	} else {
		console.warn(
			'Marked as draft in filename but not frontmatter: ' + blogpost.id,
		)
	}
	return true
}

/**
 * Logs to the console if any posts have ambiguous draft status.
 * These posts will need to be reviewed manually and their status clarified.
 * @returns any posts with ambiguous draft status
 */
const logIfPostsHaveAmbiguousDraftStatus = async (): Promise<
	CollectionEntry<'posts'>[]
> => {
	const allPosts = await getCollection('posts')
	return allPosts.filter(isDraftStatusAmbiguous)
}

/**
 * Returns the slug (URL fragment) for the given blogpost.
 * This function exists because `blogpost.slug` includes the subfolder
 * (eg “2020/”), and ends with “draft” if the post is a draft, but
 * blogpost URLs should not include the subfolder or “draft” suffix.
 */
const slugifyPost = (blogpost: CollectionEntry<'posts'>) => {
	if (!blogpost) {
		return ''
	}

	const slugWithoutDraftSuffix = blogpost.data.draft
		? blogpost.slug.replace(/draft$/, '')
		: blogpost.slug

	// Delete slashes and anything before them.
	return slugWithoutDraftSuffix.replace(/.+\//, '')
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
	escapeHtml,
	logIfPostsHaveAmbiguousDraftStatus,
	slugifyPost,
	slugifyText,
	sortPosts,
}
