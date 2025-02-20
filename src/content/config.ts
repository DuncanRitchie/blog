import { z, defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

/**
 * Draft posts should have `draft:true` in frontmatter and “.draft.md” ending the filename.
 * This function logs if a post has one of those criteria but not the other.
 * If either criterion is met, the collection loader will treat the post as a draft.
 */
const isDraft = (blogpost: any): boolean => {
	const hasDraftFrontmatter = blogpost.data.draft
	const isExcludedFromGit = blogpost.filePath?.includes('.draft')

	if (hasDraftFrontmatter && isExcludedFromGit) {
		return true
	}
	if (!hasDraftFrontmatter && !isExcludedFromGit) {
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
	// A post with ambiguous draft status is treated as a draft.
	return true
}

const postsCollection = defineCollection({
	// Custom loader adapted from https://stackoverflow.com/a/79428616
	loader: {
		...glob,
		name: 'Posts Loader',
		load: async (loaderParams) => {
			const { store } = loaderParams
			const baseLoader = glob({
				pattern: '**/*.{md,mdx}',
				base: './src/content',
			})
			await baseLoader.load.call(this, loaderParams)

			const items = [...store.entries()].map(([_, value]) => value)

			const mappedItems = items.map((item) => {
				if (isDraft(item)) {
					return {
						...item,
						data: {
							...item.data,
							draft: true,
						},
					}
				}
				return item
			})
			store.clear()
			mappedItems.forEach((item) => {
				store.set({ ...item })
			})
		},
	},
	schema: z.object({
		date: z.date(),
		title: z.string(),
		draft: z.boolean(),
		tags: z.array(z.string()),
		editHistory: z.array(z.tuple([z.date(), z.string()])).optional(),
	}),
})

// Keys here should match the collection directory names in "src/content"
export const collections = {
	posts: postsCollection,
}
