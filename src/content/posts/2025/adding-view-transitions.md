---
date: 2025-03-30
title: Adding view transitions between pages
draft: false
tags: [Software]
---

# Adding view transitions between pages

_Note: If your browser doesn’t support view transitions, or you have the “prefers reduced motion” flag enabled, you will not see view transitions on this blog._

View transitions are a relatively new feature of CSS, and they allow a DOM element to appear to change smoothly into another DOM element (or into a new position or state).

They can be triggered by JavaScript, for example to animate a menu opening and closing when a button is clicked, when we aren’t navigating to another page.
For an example of view transitions happening without navigation, see [my list of HTML elements](./html-elements) and try changing the filters there.
The items on the list should fade in and out nicely.

But view transitions can be used without JavaScript, just in the CSS, if the aim is to show an element on one page transitioning into an element on another page when a link is followed or the back/forward buttons in the browser are clicked.
This article deals mainly with that.

## Basic page transitions

To get started, ensure you have a `@view-transition` query in the CSS on both the page you’ll be navigating from and the page you’ll be navigating to.
Since I want view transitions to happen across my blog, and all my blog’s pages import a GlobalStyles.css stylesheet, I just put it there.

```css
@media not (prefers-reduced-motion: reduce) {
	@view-transition {
		navigation: auto;
	}
}
```

(By default, there’s no distinction between “to” and “from”.
The transition from the first page to the second will look the same as a transition from the second to the first, just reversed.)

Wrapping the view transition bit in a `@media` query ensures that visitors won’t see the view transitions if their browser is configured to not show a lot of movement on screen.
This is helpful for people who get motion sickness or vertigo from browsing the web, or who just prefer their internet experience to have less animation.

Okay, now that view transitions are enabled, pages should fade in when you navigate to them.

## Transitioning elements

To make a particular element on one page transition into another element on the other page, apply a `view-transition-name` CSS property to the two elements, with the same value.
For my blog (which uses Astro), it can look like so:

```jsx
<span style={{ viewTransitionName: 'year-2025' }}>2025</span>
```

You can get very creative with how one element disappears and how the other appears, but I like the simple cross-fade you get from keeping the CSS basic like this.
The first element appears to move towards the position of the second element while cross-fading into it.

You can have as many transitioning elements as you like, as long as each value of `view-transition-name` is unique to the page.

## CSS variables

I like the top-level heading (`<h1>` element) to take part in view transitions; for example, when you click on a link inside a list of articles, the link turns into the article heading.

To ensure the transition names were unique to each article, even though the headings were inside the article content, I made use of a CSS variable.

So inside GlobalStyles.css (the stylesheet applied across the blog), I set a CSS variable with a default value (`'h1'`).
The default value results in pages that aren’t articles getting a transition between their top-level headings.

```css
:root {
	--viewTransitionNameH1: 'h1';
}
h1 {
	view-transition-name: var(--viewTransitionNameH1);
}
```

And inside the Astro page that is the template for all my blogposts, I have a new value (the slug of the post) and I pass that new value in to override the default.
For this to work in Astro, I had to add a `<style>` element with a special directive of `define:vars` which I don’t think I’ve used before!

```astro
---
// This will be specific to the article, something like "adding-view-transitions".
const viewTransitionNameH1 = slugifyPost(post)
---

<!-- I’ve omitted the template HTML but it goes here. -->
<style define:vars={{ viewTransitionNameH1 }}></style>
```

Astro turns that into CSS like this, applied to the article’s content:

```css
 {
	--viewTransitionNameH1: adding-view-transitions;
}
```

The `<a>` tags inside a list of links to articles have matching view transition names, so that’s how the transition works between the links and the article headings.

## Removing transitions from unseen elements

One thing that bothered me about the effect is that it applies to elements that are outside of the viewport.
This can result in some elements flying off or onto the page, which I think looks bad.

To fix that, I added a custom HTML attribute to the transitioning elements, and set up an intersection observer to detect when those elements leave or enter the viewport.
The view transition name is removed from the CSS when the element isn’t visible, and is re-applied if the visitor scrolls back to the element.

Here’s the client-side script I wrote for that:

```ts
// Use intersection observer only if view transitions are supported.
if ('startViewTransition' in document) {
	const transitionElements = document.querySelectorAll(
		'[data-has-view-transition]',
	)

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const element = entry.target as HTMLElement
				// Get the view transition name from data-view-transition-name attribute or from CSS.
				const viewTransitionName =
					element.dataset['viewTransitionName'] ||
					element.style['view-transition-name']
				if (viewTransitionName) {
					// Ensure the name is saved as data-view-transition-name.
					element.dataset['viewTransitionName'] = viewTransitionName
					// Apply or disapply the name depending on whether the element intersects with the viewport.
					if (entry.isIntersecting) {
						element.style.viewTransitionName = viewTransitionName
					} else {
						element.style.viewTransitionName = 'none'
					}
				}
			})
		},
		// Zero threshold means the observer should fire as soon as the element enters or leaves the viewport.
		{ threshold: 0 },
	)

	transitionElements.forEach((element) => {
		observer.observe(element)
	})
}
```

It seems to work well.
