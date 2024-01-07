---
date: 2023-12-31
title: Good things happening to me in 2023
draft: false
tags: ['Annual review']
---

<style>
	@media (min-width: 48rem) {
		div[aria-describedby] {
			position: relative;
		}

		.float-left {
			float: left;
			margin: 0 1rem 0 0;
		}

		.float-right {
			float: right;
			margin: 0 0 0 1rem;
		}
	}

	figure + figure {
		margin-top: -3px;
	}
</style>

# Good things happening to me in 2023

## Work

My company named me Employee of the Month for January, due to “rapid take-up and excellent performance on new technical tasks” and because I continued to be prompt in completing admin tasks.

Also in 2023, I did most of the work for developing an internal tool for tracking employees’ holidays.
This should be rolled out in the new year.
It was an opportunity for me to refresh some of my Sql (database) knowledge.

My project manager said I was the quickest learner of Angular he knew.
In particular, I’ve learnt how to write unit tests in Angular, in addition to my unit tests and end-to-end tests in Nest.js.

(Unfortunately, I got laid off at the end of the year, along with several colleagues.
So if you’re in the vicinity of Chester and you’re recruiting for a junior/intermediate developer, please get in touch on [LinkedIn](https://www.linkedin.com/in/duncan-ritchie-uk) or wherever you can find me!)

## Personal coding

### velut

Last year I started writing a [script for generating inflection data](https://www.duncanritchie.co.uk/velut-inflector/) for all Latin words in [velut](https://www.velut.co.uk) (my Latin dictionary).
I expected to have it finished sometime this year.
And yes, I got the “Inflector” finished this year, in May.

Importantly, I can control the output for individual headwords (lemmata) through fields in the input data that the Inflector reads from.
This means that if the output is not what I want, or is more than what I want, I can easily tweak the input data and get it right.
For example, if plural forms are being generated for a noun that only makes sense in the singular, I can mark the noun with `"ParsingsToExclude": ["plural"]` to get the correct behaviour.

Now I’m checking all the data that the Inflector produces.
I’m making further adjustments to the input data as needed, and the Inflector too if there are bugs.

I made a [page on velut](https://www.velut.co.uk/deexcellation) specifically for explaining my progress in writing the Inflector and checking its output.
Whenever I run the Inflector, it saves certain statistics to a file.
I then have a script for refreshing my local database with the output of the Inflector, which also updates the database for the live website with those statistics.
This enables me to easily keep that webpage up-to-date.

<figure class="float-right">
<img alt="Declension chart (for Britannia, Britanniae) inside a tabs component" width="380" style="aspect-ratio: 570 / 644;" src="./images/2023/britannia-forms-without-background.webp" />
<figcaption>Generated forms for a proper noun</figcaption>
</figure>

On the front-end of velut, I created a component for displaying inflected forms in nested `<dl>` elements (HTML description lists), and a “tabs” component that the description lists are displayed inside.
This is keyboard-accessible, following [guidance from the Web Accessibility Initiative](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/) for the tabs, and is usable even if you don’t have JavaScript enabled in your browser.

<!-- (I’m not usually a fan of tabs or carousel components on webpages — I prefer to have everything shown in one scrolling container, so I can scroll to what I want.
But tabs are nice here because the forms on hidden tabs are almost entirely guessable when you’ve seen the forms on any other tab.) -->

Some parts of speech (proper nouns, conjunctions, and pronouns) now have their inflected forms shown in this way on the live website.

When I have checked all non-proper nouns, I will publish those forms on the website, too.
Then I’ll do the remaining words — prepositions, interjections, adjectives, adverbs, and verbs.
I expect to finish checking the inflected forms of all lemmata in velut in the first half of 2025.

<div aria-describedby="blog">

<figure class="float-left">
<img alt="Rainbow flag of the intersex-inclusive design, with a flagpole and a sky background" width="380" style="aspect-ratio: 847 / 671;" src="./images/2023/intersex-progress-flag.webp" />
<figcaption>One of my CSS flags</figcaption>
</figure>

### Blog

I published several [articles this year](./years/2023), including a [guide to moving my velut website to the Next.js framework](./porting-velut-to-nextjs) (which I had done in 2022) and a [collection of flags made in CSS](./css-flags).

I ported this blog from the [Eleventy](https://www.11ty.dev/) static-site-generator to [Astro](https://astro.build/), since I find the latter more intuitive to work in.
Now I can add features more easily, such as [tags for articles](./tags), an [RSS feed for the site](./rss.xml), and an RSS feed for each tag.

</div>

### Font-hosting

Alegreya is the typeface that I use across my personal projects on the duncanritchie.co.uk domain.
I was self-hosting it from my main website, [www.duncanritchie.co.uk](https://www.duncanritchie.co.uk), but if I was working on a project in development mode the fonts wouldn’t load.
This was because I don’t enable CORS (Cross-Origin Resource Sharing) on my main website.

To fix this, I moved the font-hosting to its own project, [fonts.duncanritchie.co.uk](https://fonts.duncanritchie.co.uk), and enabled CORS on that.
So now I see the right fonts on my web projects when I’m developing.
This is pretty small but really nice!

<div aria-describedby="quizzing">

<figure class="float-right">
<img alt="Me smiling with a bottle of Prosecco and a medal" width="270" style="aspect-ratio: 9 / 16;" src="./images/2023/winning-school-quiz.webp" />
<figcaption>I don’t even drink</figcaption>
</figure>

## Quizzing

I attended in several of the weekly quizzes at my local pub, and my team won one of them in January 2023.

In September, my high school held a quiz for alumni, and the team I was on won that, thanks partly to my knowledge of national flags.

</div>

## Holidays

I also had some nice trips to see friends and family — and the inhabitants of a wildlife park in the Cairngorms.

<figure>
<img alt="Large grey bird perched on a branch" width="600" style="aspect-ratio: 4 / 3;" src="./images/2023/great-grey-owl.webp" />
<figcaption>Great grey owl at the Highland Wildlife Park</figcaption>
</figure>

Boxing Day was particularly picturesque — I was in the Cairngorms again and I’ve never seen Glenmore and Loch Morlich in quite so much snow.

<figure>
<img alt="Panorama of a a snowy valley with mountains and trees and an icy footpath" width="1800" style="aspect-ratio: 2121 / 500;" src="./images/2023/glenmore-panorama.webp" />
<figcaption>Glenmore</figcaption>
</figure>

<figure>
<img alt="Blue sky and snowy mountains reflected in a loch" width="900" style="aspect-ratio: 3 / 2;" src="./images/2023/loch-morlich.webp" />
<figcaption>Loch Morlich</figcaption>
</figure>
