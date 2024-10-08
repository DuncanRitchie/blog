---
date: 2024-08-29
title: My Childhood Blog — now resurrected!
draft: false
tags: ['Software']
editHistory: [[2024-10-08, Link to post about source-code]]
---

<style>
	div > figure {
		margin-left: unset;
		margin-right: unset;
	}
</style>

# My Childhood Blog — now resur&shy;rected!

## Creation and fall

In my last term at primary school (in May 2007), I started to keep a diary, and every so often I would type up the articles on my parents’ computer.
This continued into my time at secondary school, and I even put it online under a pseudonym (then removed several of the more tedious or personal articles from the web version).

I added hyperlinks, photos, drawings…
It was a nice introduction to web development, or at least, it was a decent introduction to blogging, without actually learning HTML/CSS/JavaScript since I was using a website builder.

The articles started off very mundane — “At school, my first lesson was Maths” is the opening to the first entry — and I was writing every day.
Over the years, my diary entries became less frequent and evolved to contain less banality and more whimsy, drollery, hyperbole, maybe even some profundity.

<figure>
<img src="./images/2024/diary-2007May02-first-lines.webp" alt="Handwritten text reading, “At school, my first lesson was Maths. Starting with a mental test. I could not believe what I scored. 16 out of 20. My lowest score for yonks. What is a 7-sided shape called?”" width="580" style="aspect-ratio: 580 / 70"/>
<figcaption>This article is one of many that I haven’t put online.</figcaption>
</figure>

Realising that not all the articles made sense on their own, I grouped many of them into several “series” of articles, and made header images for all the series.
I also made maps for entries that talked about different places, using a combination of Google Earth, Nasa WorldWind, and PowerPoint.

<div style="justify-content: space-evenly;">
<figure style="max-width: 300px">
<img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/WB6_headerFirstSummer_300.png" alt="The text “First Summer 2007” on top of a photo of me riding a bike with a clip-art eagle under my arm" width="300" style="aspect-ratio: 300 / 300"/>
<figcaption>Header for my <a href="https://www.duncanritchie.co.uk/childhood-blog/FirstSummer">“First Summer”</a> series</figcaption>
</figure>

<figure style="max-width: 300px">
<img src="https://www.duncanritchie.co.uk/childhood-blog/images/maps/2012Nov27.png" alt="Satellite map of part of Britain with four cities and two rivers labelled" width="300" style="aspect-ratio: 300 / 187"/>
<figcaption>Map for the <a href="https://www.duncanritchie.co.uk/childhood-blog/2012Nov27">2012 Nov 27</a> article</figcaption>
</figure>
</div>

The website builder allowed me to have only a small number of pages, but that was fine.
I leant more into the idea of the blog being one (vaguely) cohesive narrative, and ordered my entries forward-chronologically, with all articles for a year on one page and with headings for the years, months, and articles themselves.
Even as a pre-teen I was ensuring my HTML was structured with consistent heading-levels!

School trips and family holidays provided some things to discuss, as did my anxieties about academic work and potential careers.
When I volunteered at a children’s drama-group (and acted myself in another), I composed articles about that.
But I found it increasingly hard to find topics I wanted to turn into blog entries.

I stopped writing on paper, and eventually decided to write my last blog article in 2014.
I archived the site and took it offline.
The website builder I was using was itself discontinued in 2020.

## Becoming a real developer

After graduating from uni in an unrelated discipline, I realised that I could pursue web development professionally and I’d be quite good at it.
(What took me so long? I was kinda good at a few subjects at school, and I had several hobbies or interests, and I had decided against studying computer science at GCSE and that decision made me not consider pursing software development later on.
At A-level I studied non-computer sciences and Latin, and I continued the Latin at uni, where I got interested in Excel as a means of storing Latin vocabulary, then I got into writing Excel formulae, then I realised that I had accidentally become an amateur software developer in an attempt to learn more Latin!
So, that was what made me embark on a career in coding.)

In the spring of 2019, [www.DuncanRitchie.co.uk](https://www.duncanritchie.co.uk) went live.
This was my first proper website under my own name (not a pseudonym), and introduced me to the world as an aspiring full-stack developer.
I added a [blog](https://www.duncanritchie.co.uk/blog) in 2022 — that’s the blog you’re reading now.

<figure class="float-left">
	<img src="./images/2024/me-in-latin-room-aged-fourteen.jpg" alt="Me in school uniform with classical articles behind me" width="270" style="aspect-ratio: 3 / 4" />
	<figcaption>Me aged 14 in a class-room</figcaption>
</figure>

## Deciding to bring my old blog back

In March this year, my high school had a reunion for the class of 2014.
I had barely seen anything of my school-mates, nor had I been inside the school (except for an [alumni quiz in 2023](http://www.duncanritchie.co.uk/blog/good-things-2023#quizzing)), for a decade.
A wave of nostalgia hit me, and I remembered my childhood diary/blog.

So I set about resurrecting it.

I wasn’t going to add more articles to it, because I had the newer blog.
I wasn’t going to republish everything, because nobody would want to read the boring stuff and I wouldn’t want people to read the stuff that really wasn’t any good.

But I had put a lot of effort into writing the articles, typing them up, adding photos, and creating the maps.
There was some of it that made me laugh, or that I felt proud of.

<figure class="float-right">
<img src="https://www.duncanritchie.co.uk/childhood-blog/images/in-articles/DB6_drawingJay.png" alt="Dawing of a Eurasian jay in pencil and crayon" width="240" style="aspect-ratio: 360 / 244; margin: 0.5rem 0 0.5rem 0.5rem;"/>
<figcaption>One of my better drawings</figcaption>
</figure>

## Static site generation

Digging through an external hard drive, I found all the HTML for my old website and nearly all the image files.
I created a new Astro project (Astro being the static-site-generator that I use for my other blog) and copied the HTML and images into it.
All the source HTML for the articles was in one file.

Then it was a matter of writing TypeScript code to read the HTML (as a text string!), figure out what all the articles are, group the articles into the series they belonged in, and generate a webpage for each article and for each series (while ensuring all the headings were present and correct).
In this way, [/2007Jun05](https://www.duncanritchie.co.uk/childhood-blog/2007Jun05) shows the article for the 5th of June 2007, [/FirstSummer](https://www.duncanritchie.co.uk/childhood-blog/FirstSummer) shows all articles for the “First Summer” series, etc.

I also made a [homepage](https://www.duncanritchie.co.uk/childhood-blog/) listing the series and articles, and a [statistics page](https://www.duncanritchie.co.uk/childhood-blog/stats) with word counts.

A fun little challenge was ensuring that hyperlinks between articles (or from an article to a series) still worked, with relative links being used when the target was on the same page.
I solved this by making sure all internal links were relative in the source HTML (eg `<a href="#2007May02">`).
When each webpage is generated, a function looks for the links (using a regular expression!) and checks whether the target is on the page (using another regular expression!). If it’s not on the page, the link gets amended to point to a different page.
It’s a very simple way of doing it, but simple code that works is better than fancy code that nobody understands after it’s been written.

To remove material from the blog, I don’t need to delete it from the source HTML.
I just comment it out.
My code for retrieving the articles strips out all HTML comments before any further processing.

```ts
function deleteHtmlComments(html: string): string {
	// Regex fun fact: *? is like * but non-greedy, so .*? will not include -->
	// so this function will preserve “ Not a comment ” in
	// <!-- Comment 1 --> Not a comment <!-- Comment 2 -->
	// Another regex fun fact: . doesn’t match line-breaks, so we need (.|\n|\r)
	return html.replaceAll(/<!--(.|\n|\r)*?-->/g, '')
}
```

Two particular examples of things I found useful in Astro are the `set:html` attribute (which is used for injecting raw HTML into a page) and the `import.meta.env.BASE_URL` environment variable (which is the `"/childhood-blog"` part of the web address).
I wrote a little function (`addLinkBase`) to make it easier to create URLs from the variable.

(In the simplified code snippet below, `date` is a string such as `"2014Sep30"`, `prettyPrintDate` makes the date slightly more readable, and `getArticleWithHeadings` returns the full HTML for one article, including the relevant headings for the year/month/series the article is in.)

```astro
<h1>
	<img src={addLinkBase('images/logos/CBlog-logo.webp')} alt="Childhood Blog" />
	Article for {prettyPrintDate(date)}
</h1>
<Fragment set:html={getArticleWithHeadings(date)} />
```

## Visual styles

For CSS and the general look of my new (old) blog, I reused what I have for my personal site (including what I have for my current blog).
The old design made sense at the time, as a kid who didn’t know CSS and who was blogging before the roll-out of modern CSS features (eg Flexbox and Grid).
But if I’m now putting my name on it, and hosting it on my own domain, and rethinking how the blog works anyway (with the static site generation etc), I’d prefer the design to look less dated and more consistent with my other projects.

The old site had a 580px-wide container for the main content.
That’s not a restriction I needed to keep; I could make the site look good on mobile and larger screens!

For example, where I have a list of articles or a list of series, I put the class `auto-grid` on the list.
This gives the list a grid layout where the number and the size of columns is automatically adjusted according to the width of the container and a custom variable `--min-column-width`, which allows the minimum column width to be customised for different lists.
I use the same technique on the homepage of my current blog, and it’s a nice way of filling space.

```css
.auto-grid {
	/* Autosizing grid columns CSS is adapted from https://css-tricks.com/look-ma-no-media-queries-responsive-layouts-using-css-grid/#aa-the-article-list */
	display: grid;
	--min-column-width: 12ch;
	grid-template-columns: repeat(
		auto-fit,
		minmax(min(var(--min-column-width), 100%), 1fr)
	);
	gap: calc(1rem + 1.25vw);
}

/* Reset browser styles for <ul> */
ul.auto-grid {
	list-style: none;
	padding-left: 0;
}
```

<figure style="width: 100%;">
<ul class="auto-grid" style="--min-column-width: 12ch; margin: 0.5rem; gap: 0.5rem;">
<!-- <li> <a href="https://www.duncanritchie.co.uk/childhood-blog/FirstSummer"> <img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/WB6_headerFirstSummer_300.png" alt="" width="150" style="aspect-ratio: 1 / 1; width: 100%;"> <br> First Summer 2007 </a> </li><li> <a href="https://www.duncanritchie.co.uk/childhood-blog/FirstHalfterm"> <img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/WB6_headerFirstHalfterm_300.png" alt="" width="150" style="aspect-ratio: 1 / 1; width: 100%;"> <br> First halfterm in my new school </a> </li><li> <a href="https://www.duncanritchie.co.uk/childhood-blog/SecondHalfterm"> <img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/WB6_headerSecondHalfterm_300.png" alt="" width="150" style="aspect-ratio: 1 / 1; width: 100%;"> <br> Second halfterm </a> </li><li> <a href="https://www.duncanritchie.co.uk/childhood-blog/RedwingSpring"> <img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/WB6_headerRedwingSpring_300.png" alt="" width="150" style="aspect-ratio: 1 / 1; width: 100%;"> <br> Redwing spring </a> </li><li> <a href="https://www.duncanritchie.co.uk/childhood-blog/AdScholamCumHieme"> <img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/WB6_headerAdScholamCumHieme_300.png" alt="" width="150" style="aspect-ratio: 1 / 1; width: 100%;"> <br> Ad Scholam Cum Hieme </a> </li><li> <a href="https://www.duncanritchie.co.uk/childhood-blog/ScotlandAndHalloween"> <img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/WB7_headerScotlandAndHalloween_300.png" alt="" width="150" style="aspect-ratio: 1 / 1; width: 100%;"> <br> Scotland &amp; Hallowe'en </a> </li><li> <a href="https://www.duncanritchie.co.uk/childhood-blog/Easter2010"> <img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/WB7_headerEaster2010_300.png" alt="" width="150" style="aspect-ratio: 1 / 1; width: 100%;"> <br> Easter 2010 </a> </li><li> <a href="https://www.duncanritchie.co.uk/childhood-blog/TheGeneralElection"> <img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/WB7_headerTheGeneralElection_300.png" alt="" width="150" style="aspect-ratio: 1 / 1; width: 100%;"> <br> the General Election </a> </li><li> <a href="https://www.duncanritchie.co.uk/childhood-blog/NewYear20102011"> <img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/WB6_headerNewYear20102011_300.png" alt="" width="150" style="aspect-ratio: 1 / 1; width: 100%;"> <br> New Year 2010-2011 </a> </li><li> <a href="https://www.duncanritchie.co.uk/childhood-blog/SriLanka"> <img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/WB6_headerSriLanka_300.png" alt="" width="150" style="aspect-ratio: 1 / 1; width: 100%;"> <br> Sri Lanka </a> </li> -->
<!-- <li> <a href="https://www.duncanritchie.co.uk/childhood-blog/DeTailOnTheBirds"> <img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/WB7_headerDeTailOnTheBirds_300.png" alt="" width="150" style="aspect-ratio: 1 / 1; width: 100%;"> <br> De Tail on the Birds </a> </li> -->
<li> <a href="https://www.duncanritchie.co.uk/childhood-blog/ExamsAndTheTitanic"> <img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/WB7_headerExamsAndTheTitanic_300.png" alt="" width="150" style="aspect-ratio: 1 / 1; width: 100%;"> <br> Exams and the Titanic </a> </li>
<li> <a href="https://www.duncanritchie.co.uk/childhood-blog/Paris"> <img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/headerParis_300.png" alt="" width="150" style="aspect-ratio: 1 / 1; width: 100%;"> <br> Paris </a> </li>
<!-- <li> <a href="https://www.duncanritchie.co.uk/childhood-blog/Easter2012"> <img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/headerEaster2012_300.png" alt="" width="150" style="aspect-ratio: 1 / 1; width: 100%;"> <br> Easter 2012 </a> </li> -->
<li> <a href="https://www.duncanritchie.co.uk/childhood-blog/2012Argyll"> <img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/WB6_header2012Argyll_300.png" alt="" width="150" style="aspect-ratio: 1 / 1; width: 100%;"> <br> 2012 Argyll </a> </li>
<li> <a href="https://www.duncanritchie.co.uk/childhood-blog/ACestrianPedestrian"> <img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/WB6_headerACestrianPedestrian_300.png" alt="" width="150" style="aspect-ratio: 1 / 1; width: 100%;"> <br> A Cestrian Pedestrian </a> </li>
<li> <a href="https://www.duncanritchie.co.uk/childhood-blog/Cusp"> <img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/WB6_headerCusp_300.png" alt="" width="150" style="aspect-ratio: 1 / 1; width: 100%;"> <br> Cusp </a> </li>
<li> <a href="https://www.duncanritchie.co.uk/childhood-blog/SouthAfrica"> <img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/WB6_headerSouthAfrica_300.png" alt="" width="150" style="aspect-ratio: 1 / 1; width: 100%;"> <br> South Africa </a> </li>
<!-- <li> <a href="https://www.duncanritchie.co.uk/childhood-blog/WordsAndTheFirebird"> <img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/WB7_headerWordsAndTheFirebird_300.png" alt="" width="150" style="aspect-ratio: 1 / 1; width: 100%;"> <br> Words and 'The Firebird' </a> </li><li> <a href="https://www.duncanritchie.co.uk/childhood-blog/WarAndMasque"> <img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/WB7_headerWarAndMasque_300.png" alt="" width="150" style="aspect-ratio: 1 / 1; width: 100%;"> <br> War and 'Masque' </a> </li><li> <a href="https://www.duncanritchie.co.uk/childhood-blog/SewingUpLooseEnds"> <img src="https://www.duncanritchie.co.uk/childhood-blog/images/series-headers/WB7_headerSewingUpLooseEnds_300.png" alt="" width="150" style="aspect-ratio: 1 / 1; width: 100%;"> <br> Sewing up Loose Ends </a> </li> -->
</ul>
<figcaption>Some series of articles presented in <code>auto-grid</code> (with <code>gap</code> and <code>margin</code> as 0.5rem) — try resizing your browser window to see the cells shrink and grow</figcaption>
</figure>

### Colours

<figure class="float-right">
	<img src="https://www.duncanritchie.co.uk/childhood-blog/images/in-articles/CB5_graphicCuckooProfile_300.png" alt="Vector illustration of a cuckoo" width="300" style="aspect-ratio: 300 / 152; margin: 0.25rem; transform: rotateY(180deg);">
	<figcaption>I drew this cuckoo in PowerPoint.</figcaption>
</figure>

My Childhood Blog used to be in light grey body text on a black background, with headings in cyan, hyperlinks in yellow, and additional notes in teal.
The colour-scheme was partly inspired by cuckoos, and I still think it looks good.
However, I’m using the styles of my current blog and personal website now, so the colours have changed almost completely.

I had created all the graphics in accordance with the old colour-scheme, but I was pleasantly surprised to find they still look decent in the new design of the site.
Actually, I think the maps look better than they used to, because the satellite imagery is in darker shades of the blues and greens of my website background!

## Yearly photos

Since the blog was using the same visual styles as other work of mine (especially my other blog), I started to feel like the two blogs looked <em>too</em> similar.
I don’t want people thinking they’re one blog.

To emphasize that the Childhood Blog articles were written when I was much younger, I put a photo of myself after each post, with the picture being from the article’s year.
Self-indulgent? Maybe, but then again, this whole project is!

<figure style="width: calc(100% - 1rem); padding-inline: 0.5rem;">
<ol class="auto-grid photos-of-me" style="--min-column-width: 4rem; gap: 0.5rem; margin: 0;" start="2007">
<li><img src="https://www.duncanritchie.co.uk/childhood-blog/images/me-by-year/2007.webp" alt="Me aged ten in front of a tree" /></li>
<li><img src="https://www.duncanritchie.co.uk/childhood-blog/images/me-by-year/2008.webp" alt="Me aged twelve holding a sprig of heather" /></li>
<li><img src="https://www.duncanritchie.co.uk/childhood-blog/images/me-by-year/2009.webp" alt="Me aged thirteen in front of the White Cliffs of Dover" /></li>
<li><img src="https://www.duncanritchie.co.uk/childhood-blog/images/me-by-year/2010.webp" alt="Me aged fourteen behind a sign for Duncanston village" /></li>
<li><img src="https://www.duncanritchie.co.uk/childhood-blog/images/me-by-year/2011.webp" alt="Me aged fourteen sitting on a grassy hillside" /></li>
<li><img src="https://www.duncanritchie.co.uk/childhood-blog/images/me-by-year/2012.webp" alt="Me aged fifteen overlooking the Seine in Paris" /></li>
<li><img src="https://www.duncanritchie.co.uk/childhood-blog/images/me-by-year/2013.webp" alt="Me aged sixteen in front of a blue screen" /></li>
<li><img src="https://www.duncanritchie.co.uk/childhood-blog/images/me-by-year/2014.webp" alt="Me aged eighteen in a student’s dormitory" /></li>
</ol>
<figcaption>The eight photos representing the eight years that the blog spans</figcaption>
</figure>

And I added some borders around those photos and other aspects of the site that weren’t the articles’ content.
This helps distinguish the entries themselves from the various headers and footers, and further differentiates the Childhood Blog from my current blog.

## Source code

One slight regret I have is that I included all the source HTML in the Git repository.
This makes me not want to make all the code visible, because I don’t really want people seeing the articles that I’ve deleted.
So if you’re wanting to see the project on GitHub, you’re out of luck.

(Separating the source HTML out of the repo, while still ensuring that the website could be built from it, would have been too complicated for what I was aiming for here.
This is just an old childhood project that I’m putting online, after all.
I’ve written new code for it, sure, but the code might not be very innovative or hugely different to what I’ve written elsewhere.)

Having said that, I made a page on my Childhood Blog for displaying [some of the source code](https://www.duncanritchie.co.uk/childhood-blog/source).
I knew I could import a HTML page as a text string by appending `?raw` on the filepath, since that’s how I get the source HTML for all the articles.
I did the same with a TypeScript file and it worked.
Then I could pass that string into Astro’s built-in `<Code/>` component and it would display the code all nicely; it even has syntax highlighting.

```ts
import htmlAsString from '../data/EntireBlog.html?raw'
import typescriptAsString from '../lib/lib?raw'
```

Oddly enough, my `?raw` trick doesn’t work on .astro files, which define Astro components and pages.
More investigation is required if I’m going to show those parts of the code.
I could simply copy and paste all my Astro code into text files and import those into the source-code page, but then they wouldn’t update automatically when I edit the code.
<ins>Update: I [wrote a script](./displaying-own-source-code) to do this.</ins>

Anyway, here’s an example of code for an Astro component, displayed in a `<details>` element like how I do it on the source-code page.
The component itself is for displaying code in a `details` element, and is what I use on the source-code page.

<details open>
<summary>/src/components/CodeInDetails.astro</summary>

```astro
---
import { Code } from 'astro:components'

export interface Props {
	summary: string
	code: string
}

const { summary, code } = Astro.props
---

<details open>
	<summary>{summary}</summary>
	<!-- Assuming the code language is TypeScript -->
	<Code code={code} lang="ts" theme="slack-dark" />
</details>
```

</details>

## Evaluating the project

I’m very happy with how my Childhood Blog works now.
It shows off a lot of my writing from my adolescence, while being presented in a more modern way.
I’m making use of technologies such as Astro, TypeScript, and CSS Grid, which I would not have known when I initially made the blog.
(Indeed, I could not have known them: they would not exist for years.)

I like that I don’t have to create the webpage for each article and series myself: I just automate it through the static site generator.
To change the blog content, I simply edit the HTML file that contains it all.
Word counts and other statistics will always be up-to-date.

The fact that I kept backups of all my files, including the PowerPoint presentations that I constructed many of the maps in, made recreating the Childhood Blog a lot easier.
Admittedly I’ve lost two of the maps from 2013; only cropped versions remain.
And some of the pictures look a bit small; a lot of them are only 300px wide.
(I could probably resave them at a higher resolution if I really wanted to.)
But still, I was delighted with how much I could rediscover.

So, if you want to read some of my writing from when I was a kid, you can now!
My Childhood Blog is live at [www.DuncanRitchie.co.uk/childhood-blog](http://www.DuncanRitchie.co.uk/childhood-blog).

Or you can see more recent posts of mine, by following the links below to stay on my current blog.

<figure style="max-width: 270px">
	<img src="https://www.duncanritchie.co.uk/childhood-blog/images/in-articles/WB6_photoFourQuartersOfTheSun_patchworkcropped300.jpg" alt="Boy smiling in a yellow costume; the background is pixellated" width="270" style="aspect-ratio: 3 / 4;">
	<figcaption>Me aged twelve in 2008</figcaption>
</figure>
