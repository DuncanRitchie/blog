---
date: 2024-09-15
title: Making an Astro blog display its own source code
draft: false
tags: ['Software']
---

# Making an Astro blog display its own source code

I [resurrected my Childhood Blog](./childhood-blog) earlier this year, using the Astro framework.
But I didn’t make the code repository public on GitHub.
Instead I made a page for displaying some of the code.

The codebase mainly consisted of one large HTML file (containing public and private articles), two TypeScript files (for extracting relevant content from the HTML file), and several Astro files.
The latter define the components, layouts, and pages for the website.

By default, importing HTML and Astro files gives you rendered DOM content to use in your components/layouts/pages, and importing TypeScript files gives you the functions and variables and whatnot.
This usually is what you want.

```astro
---
import Layout from '../layouts/Layout.astro'
import SomeHtmlComponent from '../data/some-html-component.html'
// Import statements for TypeScript and JavaScript files don’t need file-extensions.
import { someLanguageName, translate } from '../lib/language-stuff'
---

<Layout>
	<p>
		Look at me, I can write in {someLanguageName}!
	</p>
	<p>
		{translate('Hello!', someLanguageName)}
	</p>

	<SomeHtmlComponent />
</Layout>
```

For my source-code page, I didn’t want this.
I wanted the raw text — I wanted `<b>this</b>`, not <b>this</b>.

Happily, Astro uses the bundler Vite for its imports, and Vite allows raw imports — just append `?raw` to the filepath.

```astro
---
import someHtmlCode from '../data/some-html-component.html?raw'
import someTypeScriptCode from '../lib/language-stuff?raw'
---

<p>Look at all the code below!</p>
<pre>
	{someHtmlCode}
	{someTypeScriptCode}
</pre>
```

Unhappily, this doesn’t work for .astro files.
Importing `from '../layouts/Layout.astro?raw'` is the same as `from '../layouts/Layout.astro'` — you get the Astro component either way.

So I couldn’t show the code for all my Astro components on my source-code page.
That’s annoying.

Another thing that’s not great is that I was importing files individually.
But I only had two TypeScript files, so I didn’t really mind having them specified in the code for the source-code page.

```astro
---
import sourceLib from '../lib/lib?raw'
import sourceLibDefs from '../lib/defs?raw'
---

<CodeInDetails summary="/src/lib/lib.ts" code={sourceLib} />
<CodeInDetails summary="/src/lib/defs.ts" code={sourceLibDefs} />
```

(This was my actual code, albeit abridged.
`<CodeInDetails>` is a component I made for displaying code.
It wraps Astro’s built-in `<Code>` component in a `<details>` element, so the contents can be hidden and shown easily.)

And that was where I was when I wrote my [article about making the blog](./childhood-blog).

## Glob imports

If I ever wanted to add more TypeScript files to the project, they wouldn’t automatically be shown on the source-code page.
But Astro has an [`Astro.glob` function](https://docs.astro.build/en/reference/api-reference/#astroglob) for grabbing all the files that match a given filepath pattern.
Unfortunately, I couldn’t use it for raw imports.

Fortunately, the `Astro.glob` function is a wrapper for a [Vite function](https://vitejs.dev/guide/features.html#glob-import) named `import.meta.glob`, and the Vite function is more customisable.
I could get my raw imports through it.

It gives me an object where the keys are filepaths (relative to the file the function is being called from) and the corresponding values are asynchronous functions that return the source-code.
Mapping over the key–value pairs to create my `<CodeInDetails>` instances is then quite easy.

```astro
---
const tsFileImports = import.meta.glob(`../*/*.ts`, {
	query: '?raw',
	import: 'default',
})
---

{
	Object.entries(tsFileImports).map(async ([path, code]) => (
		<CodeInDetails summary={path} code={(await code()) as string} />
	))
}
```

I could then separate my TypeScript into multiple files, and they would be automatically detected and shown on the source-code page.

## Displaying .astro files

Here’s an excerpt from my previous article:

> Oddly enough, my `?raw` trick doesn’t work on .astro files, which define Astro components and pages.
> More investigation is required if I’m going to show those parts of the code.
> I could simply copy and paste all my Astro code into text files and import those into the source-code page, but then they wouldn’t update automatically when I edit the code.

Hmm, if only there were a way to make it that the files could automatically be copied and renamed as text files, so Astro/Vite would import them as raw text, without my having to do it manually every time I publish the blog.

Such a mystery.

Oh wait, I can write a simple script to do it, and include it in the package.json file so it runs whenever the site is built.

This is my (abridged) package.json file:

```json
{
	"name": "duncan-childhood-blog",
	"type": "module",
	"scripts": {
		"dev": "astro dev",
		"start": "astro dev",
		"prebuild": "bash prebuild.sh",
		"build": "astro check && astro build",
		"preview": "astro preview",
		"astro": "astro"
	},
	"dependencies": {
		"@astrojs/check": "^0.7.0",
		"astro": "^4.11.3",
		"typescript": "^5.4.5"
	}
}
```

The only change to this file was to add `"prebuild": "bash prebuild.sh"` to the `scripts` object.
A nifty feature of NPM (Node Package Manager) is that you can define your own scripts here, and then run them by entering `npm run name-of-my-script` in the terminal.
Not only that, but whenever a script is to run, NPM automatically looks for scripts with the same name but with `pre` and `post` at the beginning, and runs those scripts too if they exist.
So whenever the `build` script is to run, NPM can run `prebuild`, then `build`, then `postbuild`.
(Of course, I don’t have a `postbuild` script, but that’s fine.)

What does my prebuild.sh Bash script look like?
It looks like this, albeit with more comments:

```bash
# Start from a blank slate
rm -r text-dist

# All folders need to be hardcoded, for now.
mkdir text-dist
mkdir text-dist/src
mkdir text-dist/src/components
mkdir text-dist/src/layouts
mkdir text-dist/src/pages

# Copy every Astro file to a new text file.
for file in src/**/*.astro; do
  cp -a $file text-dist/${file}.txt
done

echo "All .astro files in /src have been copied to .astro.txt files."
```

I’m sure it’s possible to make Bash generate the directories as needed, without hardcoding them, but I’m but a newbie to Bash scripting, so I don’t know how to make the script more robust.

This works for now, and it’ll continue to work as long as I don’t add more folders containing .astro files to the project.
Even if it does break, the missing folder(s) will be easy to spot.
I’m not too bothered about it.

The important thing is that I can now get all Astro code for my Childhood Blog (as well as the TypeScript code) displaying on a page of my Childhood Blog.
I even added the prebuild.sh script to the page.

So if you want to see how that blog works, in addition to the [article I wrote earlier](./childhood-blog), here’s [the source-code](https://www.duncanritchie.co.uk/childhood-blog/source)!
