# Duncan Ritchie’s blog
https://www.duncanritchie.co.uk/blog

My personal blog, a static site made with Astro. Posts are in Markdown files in <samp>src/content/posts</samp>.

I previously made my blog with [Eleventy](https://www.11ty.dev). When I tried [Astro](https://astro.build/), I found it so intuitive that I migrated the blog.

## Draft posts

Draft posts have filenames ending with <samp>.draft.md</samp>, which allows me to exclude drafts from Git and prevent them getting published.

Also, they have `draft: true` in their front matter.

## Commands for me

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |
