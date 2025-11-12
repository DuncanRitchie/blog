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

## Open Graph images

Social media platforms like to show an “Open Graph” image for links to things like blogs, by looking in in the `<head>` of the webpage for a `<meta property="og:image" content={YOUR_IMAGE_URL_HERE} />` tag.
I wanted this to be a screenshot for every page, nothing too weird.
The [screenshotting library that I’m using](https://github.com/vadimdemedes/astro-selfie) is `astro-selfie`, and it runs automatically for every page in the blog, every time I do a build locally.
The screenshots get saved to the /public/og folder and can easily be referenced in the `<meta>` tags.

This means that when I publish or update an article, I need to run `npm run build` and commit any new/changed Open Graph images to Git.
When I push to GitHub, Netlify will run `npm run build` for production, but this does not mean running `astro-selfie` again (I’ve disabled the library for production because the images will have already been created).

Irritatingly, because `astro-selfie` works locally, it sees all pages as I see them in development.
Which means it takes screenshots of all my draft posts, and I have to take care not to commit them to Git.

Worse, on lists of posts (and on lists of tags and years), draft posts were included.
I have stopped this happening, but my solution is hackier than I would really like.
Fortunately, I did not need to insert any extra Dom elements in production, only in development mode.

I could probably create my own version of `astro-selfie`, or submit a pull request to it allowing draft posts to be excluded (Astro already excludes drafts from production anyway!).
But the library has been so easy to use (drafts and the need for local builds notwithstanding) and how I handle drafts is (maybe) a little unusual.

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
