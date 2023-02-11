# Duncan Ritchie’s blog

https://www.duncanritchie.co.uk/blog

My personal blog, a static site made with Astro. Posts are in Markdown files in <samp>src/content/posts</samp>.

I previously made my blog with [Eleventy](https://www.11ty.dev). When I tried [Astro](https://astro.build/), I found it so intuitive that I migrated the blog.

## RSS

I love that Astro has [official support for RSS](https://docs.astro.build/en/guides/rss/). You can [subscribe to my blog](https://www.duncanritchie.co.uk/blog/rss.xml) if you like.

The RSS feed is formatted through an adaption of [Matt Webb’s XSL stylesheet](https://github.com/genmon/aboutfeeds/blob/main/tools/pretty-feed-v3.xsl).

## Draft posts

Draft posts have filenames ending with <samp>.draft.md</samp>, which allows me to exclude drafts from Git and prevent them getting published.

Also, they have `draft: true` in their front matter. This automatically makes Astro exclude them from production, even if I were to allow them in Git.

## Commands for me

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |
