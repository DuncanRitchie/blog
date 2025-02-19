import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import pagefind from 'astro-pagefind'

// https://astro.build/config
export default defineConfig({
	base: '/blog',
	site: 'https://www.duncanritchie.co.uk/blog',
	markdown: {
		shikiConfig: {
			// Available themes are in node_modules/shiki/themes/
			theme: 'slack-dark',
		},
	},
	integrations: [mdx(), pagefind()],
	trailingSlash: 'never',
})
