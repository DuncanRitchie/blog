---
title: Tables of contents in Astro
draft: false
date: 2026-03-09 19:00:00
tags: [Software]
---

# Adding tables of contents to my Astro blog

This blog now has tables of contents on its articles!
In the top-right corner of a post such as this one, all the headings are listed as links.
Links to subheadings are nested, with extra indentation so it’s clear what’s a subheading of what.

This allows you as a reader to see what’s in an article without reading it through, and you can follow the links to specific sections you’re interested in.

## Data structures

### Unnested array of headings

Astro’s built-in method for rendering a Markdown post exposes an array of headings (`headings`) as well as the page content (`Content`).
So if we have the code…

```ts
const { Content, headings } = await render(post)
```

… the `headings` array looks like this:

<details>
<summary>The <code>headings</code> array that Astro provides</summary>

```ts
const headings = [
	{
		depth: 1,
		slug: 'adding-tables-of-contents-to-my-astro-blog',
		text: 'Adding tables of contents to my Astro blog',
	},
	{ depth: 2, slug: 'data-structures', text: 'Data structures' },
	{
		depth: 3,
		slug: 'unnested-array-of-headings',
		text: 'Unnested array of headings',
	},
	{
		depth: 3,
		slug: 'recursive-array-of-headings',
		text: 'Recursive array of headings',
	},
	{ depth: 2, slug: 'astro-components', text: 'Astro components' },
	{
		depth: 3,
		slug: 'recursive-astro-component',
		text: 'Recursive Astro component',
	},
	{ depth: 3, slug: 'main-component', text: 'Main component' },
	{
		depth: 3,
		slug: 'containing-elements',
		text: 'Containing elements',
	},
	{
		depth: 2,
		slug: 'unexpected-challenges',
		text: 'Unexpected challenges',
	},
	{ depth: 3, slug: 'css', text: 'CSS' },
	{
		depth: 4,
		slug: 'tangent-about-navigation-elements',
		text: 'Tangent about navigation elements',
	},
	{ depth: 2, slug: 'conclusion', text: 'Conclusion' },
]
```

</details>

This is exactly the data we need for a Table of Contents component!
The `slug` property can be used for the `href` for each link (because Astro renders headings with the corresponding `id` attributes), and `text` will be the text that’s displayed.

### Recursive array of headings

Each heading has a `depth`, or heading level, corresponding to the HTML tag `<h1>`/`<h2>`/`<h3>`/…

This allows us to work out the relationships between headings — ie, what is a subheading of what.
For example, if the headings on a page have depths 1,2,3,2, the depth-3 heading is subordinate to the first depth-2 heading, and both depth-2 headings are subordinate to the depth-1 heading.

For my tables of contents, I wanted to render nested lists of headings, so each list item would contain a link to a heading and its own list of subheadings.

So I wrote some code that grouped headings with their subheadings.

<details>
<summary>Code for constructing the nested object of headings</summary>

```ts
// Find the first heading, and nest all its subheadings into it.
// The `getSubheadings` function is recursive, so subheadings will receive their own subheadings, etc.
const firstHeading = headings.find((h) => h.depth === 1)
const headingsObject = {
	...firstHeading,
	subheadings: getSubheadings(firstHeading, headings),
}

// `headings` is the full array of headings from Astro, at first.
// When the function calls itself, the parameter will be a slice of the array, not the full array.
function getSubheadings(
	heading: MarkdownHeading | undefined,
	headings: MarkdownHeading[],
) {
	// If there’s no depth-1 heading to start at, there can be no subheadings of it.
	if (!heading) {
		console.error('Invalid heading:', heading)
		return []
	}
	// A heading’s subheadings cannot be earlier than the heading, nor can they include that heading,
	// so we narrow the headings down to a slice starting immediately after the current heading.
	// So if the headings in a document are 2,1,2,3,4,3,4,2, and we’re getting the subheadings for the second depth-2 heading,
	// the array gets sliced to 3,4,3,4,2.
	const depth = heading.depth
	const laterHeadings = headings.slice(
		1 + headings.findIndex((h) => h === heading),
	)
	// If we’re still looking at headings that are not deeper than the current heading,
	// we need to narrow the headings down to a slice stopping at the first heading that
	// is not a subheading (because it’s of depth equal or less than the current heading).
	// The example array from the previous comment would be sliced to 3,4,3,4 here.
	const descendants = laterHeadings.some((h) => h.depth <= depth)
		? laterHeadings.slice(
				0,
				laterHeadings.findIndex((h) => h.depth <= depth),
		  )
		: [...laterHeadings]
	// The children of a heading all have a depth of one more than it.
	// They become the subheadings, but the recursive function is also called on each of them.
	// So each subheading is paired with the child subheadings that may exist for it,
	// and each child subheading may have children of its own, etc.
	const childSubheadings = descendants
		.filter((h) => h.depth === depth + 1)
		.map((h): HeadingWithSubheadings => {
			return { ...h, subheadings: getSubheadings(h, descendants) }
		})
	return childSubheadings
}
```

</details>

The resultant object looks like this:

<details>

<summary>
<code>headingsObject</code>
</summary>

```ts
const headingsObject = {
	depth: 1,
	slug: 'adding-tables-of-contents-to-my-astro-blog',
	text: 'Adding tables of contents to my Astro blog',
	subheadings: [
		{
			depth: 2,
			slug: 'data-structures',
			text: 'Data structures',
			subheadings: [
				{
					depth: 3,
					slug: 'unnested-array-of-headings',
					text: 'Unnested array of headings',
					subheadings: [],
				},
				{
					depth: 3,
					slug: 'recursive-array-of-headings',
					text: 'Recursive array of headings',
					subheadings: [],
				},
			],
		},
		{
			depth: 2,
			slug: 'astro-components',
			text: 'Astro components',
			subheadings: [
				{
					depth: 3,
					slug: 'recursive-astro-component',
					text: 'Recursive Astro component',
					subheadings: [],
				},
				{
					depth: 3,
					slug: 'main-component',
					text: 'Main component',
					subheadings: [],
				},
				{
					depth: 3,
					slug: 'containing-elements',
					text: 'Containing elements',
					subheadings: [],
				},
			],
		},
		{
			depth: 2,
			slug: 'unexpected-challenges',
			text: 'Unexpected challenges',
			subheadings: [
				{
					depth: 3,
					slug: 'css',
					text: 'CSS',
					subheadings: [
						{
							depth: 4,
							slug: 'tangent-about-navigation-elements',
							text: 'Tangent about navigation elements',
							subheadings: [],
						},
					],
				},
			],
		},
		{
			depth: 2,
			slug: 'conclusion',
			text: 'Conclusion',
			subheadings: [],
		},
	],
}
```

</details>

There should be only one heading of depth 1 on the page, since this is the heading for the entire blogpost.
I don’t expect there to be headings before the depth-1 heading, and if there are my code excludes them.
Likewise, a second depth-1 heading (and any headings after it) is ignored.

As for the data-types, `MarkdownHeading` is the type from Astro for a heading, and `HeadingWithSubheadings` is my own type (inspired by a [GitHub gist](https://gist.github.com/maciejpedzich/000da5c6b3a91290d49a91c9fe940ca3) I found during my research for this article).

```ts
export type HeadingWithSubheadings = MarkdownHeading & {
	subheadings: HeadingWithSubheadings[]
}
```

## Astro components

To get the lists rendered on the page nicely, I ended up making two components: `<TableOfContents>` and `<TableOfContentsRecursivePart>`.
The latter is embedded in the former, and is also embedded in itself because it’s recursive!

### Recursive Astro component

Into this component (`<TableOfContentsRecursivePart>`), I pass an array of headings and the depth of the heading for them.
Here’s the HTML:

```astro
<ul data-depth={depth}>
	{
		headings.map((heading) => (
			<li>
				<a href={'#' + heading.slug}>{heading.text}</a>
				{heading.subheadings?.length ? (
					<Astro.self headings={heading.subheadings} depth={heading.depth} />
				) : null}
			</li>
		))
	}
</ul>
```

We get a nice unordered list.
Each list item contains a link to a heading, and if the heading has subheadings, we render the recursive component to render the list of those subheadings.

Note that `<Astro.self>` is how to refer to the current component in Astro for recursion.
Initially I tried calling `<TableOfContentsRecursivePart>`, but that didn’t work because the component doesn’t know that that name is what I named it.
The filename is `TableOfContentsRecursivePart.astro`, and I therefore import it in the other component with `import TableOfContentsRecursivePart from './TableOfContentsRecursivePart.astro'`, but when we’re inside the component itself it doesn’t have a name — it’s just `<Astro.self>`!

The `depth` parameter ensures that we can write CSS targeting a specific level of subheadings, if we want to.
I do that for the outermost list (depth 1), just for some margin/padding.

### Main component

The `<TableOfContents>` component’s HTML looks like this:

```astro
<details>
	<summary>Contents</summary>
	<nav id="table-of-contents" aria-label="Table of Contents">
		<p class="heading1-wrapper">
			<a href={'#' + headingsObject.slug}>{headingsObject.text}</a>
		</p>

		<TableOfContentsRecursivePart
			headings={headingsObject.subheadings}
			depth={headingsObject.depth}
		/>
	</nav>
</details>
```

<figure class="float-right">
<img src="./images/2026/table-of-contents.png" alt="Screenshot of the table of contents" style="aspect-ratio: 452 / 416" width="360" />
<figcaption>Screenshot showing nested heading lists</figcaption>
</figure>

The `<details>` element means the table is hidden until the user wants to see it.
The `<nav>` element means assistive technologies (eg screenreaders) know that this is part of the webpage is a navigation element.
The `.heading1-wrapper` paragraph contains a link to the depth-1 heading of the page (the blogpost’s title) — this isn’t really necessary for a table of contents, but it felt more complete with it.

`headingsObject` is the object denoting the depth-1 heading with the [nested array of headings](#recursive-array-of-headings) that I explained earlier.

### Containing elements

Where does the `<TableOfContents>` component go on the page?
It goes in the `<PostIntro>` component, which is the box (at the top of the page) containing the blogpost’s date, tags, and edit history (if I’ve edited the post after publishing it).

I put the existing contents of `<PostIntro>` into a new wrapper `<div>` element, which sits side-by-side with the table of contents if there’s enough screen-width.
A border in between helps keep things from looking messy.

The only pages that have `<PostIntro>` are blogposts, and `<TableOfContents>` is only displayed if the blogpost has subheadings.

## Unexpected challenges

Adding the tables of contents was pretty straightforward — especially since Astro gives me the array of headings so conveniently.
I didn’t have major setbacks.

Writing the JavaScript (or TypeScript) to group subheadings together was slightly more difficult than I had anticipated, and there were times when headings were missing or were showing up out of order.
But I quickly realised my mistakes, where I needed to add a one to an array index or use a different array method.

This was my first time making a recursive component in Astro, and I’ve already mentioned that my initial guess was wrong — I hadn’t yet seen that `<Astro.self>` is the name I needed.
Of course, it was easy to look up “recursive component astro” online and amend my code.

### CSS

I found that the `<nav>` element was inheriting CSS from my website, because I import some of the CSS from the main site of [DuncanRitchie.co.uk](https://www.DuncanRitchie.co.uk) onto my blog.
The CSS selector was simply `nav`, without a class or something more specific.
So I did have to change that CSS to stop it applying to the tables of contents.
The navbar on the main pages of DuncanRitchie.co.uk is full-width across the screen and fixed in position, with grey link text.
That’s not what I wanted for my blog’s tables of contents, and it’s not what I would want anywhere except the main pages of DuncanRitchie.co.uk.

#### Tangent about navigation elements

That reminds me — the footer of my blog (and the footer for other web projects I have) is a `<footer>` element containing a `<ul>` element, with no `<nav>` element to be found, despite it being a list of links for navigation.
Maybe it would be nice to mark the footer as a navigation element using `<nav>`.
It wouldn’t make the site look different, but it might improve the user-experience with assistive technologies that look for “landmark” elements such as `<nav>`.

Putting `<nav>` inside `<footer>` is not explicitly recommended by the HTML specification, and it’s especially unnecessary if there’s a main `<nav>` element outside of the footer.
But in my case, the footer is the main navigation element of the page, so `<nav>` would make sense.

## Conclusion

Overall my tables of contents were a fun little enhancement to make for my blog, and I learnt something about Astro (and my website’s CSS).
And I found that this article, with its four levels of headings, is good for showcasing my new <TableOfContents> component!

Let’s see the component again, because why not?

<details data-astro-cid-xvrfupwn="" open=""> <summary data-astro-cid-xvrfupwn="">Contents</summary> <nav id="table-of-contents" aria-label="Table of Contents (duplicate)" data-astro-cid-xvrfupwn=""> <p class="heading1-wrapper" data-astro-cid-xvrfupwn=""> <a href="#adding-tables-of-contents-to-my-astro-blog" data-astro-cid-xvrfupwn="">Adding tables of contents to my Astro blog</a> </p> <ul data-depth="1" data-astro-cid-urqnktd5=""> <li data-astro-cid-urqnktd5=""> <a href="#data-structures" data-astro-cid-urqnktd5="">Data structures</a> <ul data-depth="2" data-astro-cid-urqnktd5=""> <li data-astro-cid-urqnktd5=""> <a href="#unnested-array-of-headings" data-astro-cid-urqnktd5="">Unnested array of headings</a>  </li><li data-astro-cid-urqnktd5=""> <a href="#recursive-array-of-headings" data-astro-cid-urqnktd5="">Recursive array of headings</a>  </li> </ul>  </li><li data-astro-cid-urqnktd5=""> <a href="#astro-components" data-astro-cid-urqnktd5="">Astro components</a> <ul data-depth="2" data-astro-cid-urqnktd5=""> <li data-astro-cid-urqnktd5=""> <a href="#recursive-astro-component" data-astro-cid-urqnktd5="">Recursive Astro component</a>  </li><li data-astro-cid-urqnktd5=""> <a href="#main-component" data-astro-cid-urqnktd5="">Main component</a>  </li><li data-astro-cid-urqnktd5=""> <a href="#containing-elements" data-astro-cid-urqnktd5="">Containing elements</a>  </li> </ul>  </li><li data-astro-cid-urqnktd5=""> <a href="#unexpected-challenges" data-astro-cid-urqnktd5="">Unexpected challenges</a> <ul data-depth="2" data-astro-cid-urqnktd5=""> <li data-astro-cid-urqnktd5=""> <a href="#css" data-astro-cid-urqnktd5="">CSS</a> <ul data-depth="3" data-astro-cid-urqnktd5=""> <li data-astro-cid-urqnktd5=""> <a href="#tangent-about-navigation-elements" data-astro-cid-urqnktd5="">Tangent about navigation elements</a>  </li> </ul>  </li> </ul>  </li><li data-astro-cid-urqnktd5=""> <a href="#conclusion" data-astro-cid-urqnktd5="">Conclusion</a>  </li> </ul>  </nav> </details>
