# Duncan Ritchie’s blog

https://www.duncanritchie.co.uk/blog

My personal blog, a static site made with Astro. Posts are in Markdown files in <samp>src/content/posts</samp>.

I previously made my blog with [Eleventy](https://www.11ty.dev). When I tried [Astro](https://astro.build/), I found it so intuitive that I migrated the blog.

## RSS

I love that Astro has [official support for RSS](https://docs.astro.build/en/guides/rss/). You can [subscribe to my blog](https://www.duncanritchie.co.uk/blog/rss.xml) if you like. There are also feeds for each tag I use on articles.

The RSS feed is formatted through an adaption of [Matt Webb’s XSL stylesheet](https://github.com/genmon/aboutfeeds/blob/main/tools/pretty-feed-v3.xsl).

## Draft posts

Draft posts have filenames ending with <samp>.draft.md</samp>, which allows me to exclude drafts from Git and prevent them getting published.

Also, they have `draft: true` in their front matter. This automatically makes Astro exclude them from production, even if I were to allow them in Git.

## View transitions

If your browser supports view transitions and doesn’t prefer reduced motion, you’ll see view transitions on the blog when navigating between pages.
When adding a view transition, I like to add a `data-has-view-transition` attribute to the participating elements — this enables a [custom script to prevent view transitions](https://github.com/DuncanRitchie/blog/blob/main/src/components/ViewTransitionsInViewport.astro) from affecting elements outside the viewport.

## Commands for me

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm start`            | Starts local dev server at `localhost:4321`      |
| `npm run dev`          | Same as `npm start`                              |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |
