import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import pagefind from 'astro-pagefind'
import selfie from 'astro-selfie'

// The astro-selfie dependency takes screenshots of all static pages and turns them into Open Graph images. It doesn’t run in production: I have to build the site locally (and astro-selfie is run automatically as part of that) and commit the images to Git.
// Netlify’s special environment variables include `CI=true` and are listed at https://docs.netlify.com/build/configure-builds/environment-variables/
const selfieIfLocal = !process.env.CI && selfie()

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
	integrations: [mdx(), pagefind(), selfieIfLocal].filter(Boolean),
	trailingSlash: 'never',
})
