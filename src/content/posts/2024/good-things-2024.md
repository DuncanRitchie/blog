---
date: 2024-12-31
title: Good things happening to me in 2024
draft: false
tags: ['Annual review']
---

<style>
	div figure {
		margin: unset;
		max-width: var(--width);
	}
</style>

# Good things happening to me in 2024

## Personal coding

### velut

Last year, I [finished writing a script](./good-things-2023#velut) for [generating inflection data](https://www.duncanritchie.co.uk/velut-inflector/) for all Latin words in [velut](https://www.velut.co.uk) (my Latin dictionary), and manually checked the output the script generated for 41.3% of my lemmata (5,834 of 14,127).
This year, I continued checking inflected forms.
I have now checked 83.5% (11,800 of 14,127) — that’s all lemmata except 2,327 verbs.
All lemmata except most of the verbs now have their forms displayed on the live website.

I also made two components specifically for displaying verb forms.
One is for participles and the other is for non-participle forms.
(I had a component for displaying any forms, which is used for other parts of speech, but it shows a lot of empty space when it’s used on verbs, because indicatives and imperatives etc have very different numbers of forms to each other.
So I designed components that are more compact.)

<figure>
	<img src="./images/2024/verb-table-amo-without-background_with-syncopated-forms.webp" alt="Table showing all single-word forms of amō except participles" width="1000" style="aspect-ratio: 1412 / 795; margin: 0.25rem; max-width: calc(100% - 0.5rem);" />
	<figcaption>Generated forms for a regular verb; forms already in velut are in blue</figcaption>
</figure>

Here’s an [article on how I use `<col>` elements](./col-elements-on-verb-tables) in my new tables.
The screenshots in that article are already out-dated because they don’t include “syncopated” verb forms such as <q lang="la">amāstī</q> — but those forms are now generated and are the forms shown in black in the screenshot above.
(Did I say I had finished writing the script that does the inflections?
Oops, I lied, software may never be completely finished!
Don’t be surprised if I’m continuing to make improvements to that script in the new year.)

I said last year I’d have published inflected forms for all my lemmata by the middle of 2025.
I’m still on track for that!
(I just need to check 388 lemmata in each of the next six months, or 90 per week.)

Since 2022, I have been working to migrate the dictionary to an architecture where I can add/edit/remove words simply by editing Json files and running some scripts.
It’s an ambitious target, but I have a good chance of finishing the migration completely in 2025!

### Childhood blog

I had a blog as a kid, before I had this blog.
It’s been offline for years, but [I resurrected it](./childhood-blog) this year with a fresh coat of paint.
I even [animated a panorama](./looping-panorama-effect) that I had made for it, and figured out [how to make it display its source code](./displaying-own-source-code).

## Other blog articles

Back on this non-childhood blog, I wrote a take on the [US presidential election](./us-voters-flip-a-coin) and looked into [a way of specifying colours in HTML](./colours-on-legacy-html-attributes).

## Volunteering

<figure class="float-right" style="max-width: 420px;">
<img src="./images/2024/pavilion-blackbird.webp" alt="Blackbird perching on rafters" width="420" style="aspect-ratio: 4 / 3;" />
<figcaption>
Merriment was had when a blackbird flew into our work-space.
(It escaped soon after.)
</figcaption>
</figure>

In the summer, I volunteered at a museum in Chester.
There was a small team of us working on finds from an archaeological dig in the local park.

I had volunteered with them in 2018, in the space between graduating uni and starting my first “bootcamp” course in software development.
Both times had pottery sherds and fragments of brick, which we were to wash and label.
This time there were also some slates; I recorded their weights and dimensions.
It wasn’t as boring as it might sound, though some of the slates had holes drilled in them.

## School reunion

The class of 2014 of my high school were invited back for a Saturday afternoon in March.

It was fascinating to hear what some of my ex-classmates have been up to — for example, one’s now a data analyst, one’s managing an art exhibition in London, and four are now married or betrothed to each other!
(To be clear, that’s two couples who both attended the school and the reunion together.)
And the kid that was the biggest class clown has become a maths teacher, which is funnier than anything I remember of him.
(I was such a swot that I didn’t have much time for mischief.)

I also enjoyed seeing how the school has changed, although they no longer teach Latin or Classical Studies.
They now offer Psychology, which is much more popular than Latin was when I was the only kid doing it for A-level.
The PE department has also diversified — if you dislike team sports, you no longer have to go swimming every week.

The classroom where I had my first Latin lesson (which was also my form room for GCSE) has been completely refurbished.
The desks are now wavy-shaped, the ceiling has been lowered, a door to a teacher’s office has been filled in, and a mural of Medusa and a crow has replaced the whiteboard.
I don’t know what difference the shape of a desk makes, but I’m glad there’s still a classical theme to the décor.

<div style="align-items: start;">
	<figure style="--width: 270px">
		<img src="./images/2024/me-in-latin-room-aged-fourteen.jpg" alt="Me aged fourteen in school uniform with classical articles behind me" width="270" style="aspect-ratio: 3 / 4" />
		<figcaption>Me in 2011 in Room 18</figcaption>
	</figure>
	<figure style="--width: 480px">
		<img src="./images/2024/former-latin-classroom.jpg" alt="Refurbished classroom with a mural and desk" width="480" style="aspect-ratio: 4 / 3" />
		<figcaption>The same corner of Room 18, without the door, or newspaper clippings, or me</figcaption>
	</figure>
</div>

And I had some nice conversations with (former) teachers and a caterer.
In fact, I spent so much time chatting that I was the last student from my year to leave!

The school produced an [official write-up of the reunion](https://www.kingschester.co.uk/news/alumni-news/rugby-reminiscing-make-memorable-reunion/).

## Quizzing

My team won a pub quiz on Valentine’s Day.
The next week, none of my teammates could make it except my dad, but we still came second.
(Our team name that time was Cat Stevens, in reference to the song “Father and Son”.)

Last year, my high school had held a [quiz for alumni](./good-things-2023#quizzing).
This was repeated this year, though my team came second this time, and the questions were different.

## Other trips out

In January, my uncle and I visited the Lowry gallery in Salford, and we walked around the canal there at dusk.
The high-rise buildings were pretty.

<div>
	<figure style="--width: 480px">
		<img src="./images/2024/salford-canal.webp" alt="Canal with a bridge and high-rise buildings around it" width="480" style="aspect-ratio: 4 / 3" />
		<figcaption>Salford</figcaption>
	</figure>
	<figure style="--width: 270px">
		<img src="./images/2024/media-city.webp" alt="Bridge leading to high-rise offices at nightfall" width="270" style="aspect-ratio: 3 / 4" />
		<figcaption>MediaCity</figcaption>
	</figure>
</div>

In April, some friends and I went to a park near me, and I took what’s probably my best photo of a jay ever.

<div>
	<figure style="--width: 480px">
		<img src="./images/2024/birkenhead-park-pond.webp" alt="Gazebo and trees beside a pond" width="270" style="aspect-ratio: 3 / 4" />
		<figcaption>Birkenhead Park</figcaption>
	</figure>
	<figure style="--width: 480px">
		<img src="./images/2024/birkenhead-park-jay.webp" alt="Jay on a branch" width="480" style="aspect-ratio: 4 / 3" />
		<figcaption>Jay</figcaption>
	</figure>
</div>
<div>
	<figure style="--width: 375px">
		<img src="./images/2024/birkenhead-park-coot.webp" alt="Coot flapping its wings while walking" width="375" style="aspect-ratio: 4 / 3" />
		<figcaption>Coot</figcaption>
	</figure>
	<figure style="--width: 375px">
		<img src="./images/2024/birkenhead-park-goldeneyes.webp" alt="Two goldeneye ducks on a pond with reflections of greenery" width="375" style="aspect-ratio: 4 / 3" />
		<figcaption>Goldeneyes</figcaption>
	</figure>
</div>

I celebrated my birthday by taking my parents (and dog) to Bettisfield and Whixall Mosses, which are areas of peat bog on the England–Wales border.
We had a good long walk and I took my worst photo of an adder ever.
Which is also my best photo of an adder ever, because I’ve only seen one ever.

<div>
	<figure style="--width: 1200px">
		<img src="./images/2024/bettisfield-moss.webp" alt="Peat bog with grass, bushes, and a pond" width="1200" style="aspect-ratio: 7482 / 1920" />
		<figcaption>Bettisfield Moss</figcaption>
	</figure>
	<figure style="--width: 375px">
		<img src="./images/2024/adder.webp" alt="Blurry photo of undergrowth with part of an adder visible" width="375" style="aspect-ratio: 4 / 3" />
		<figcaption>Adder at Bettisfield Moss</figcaption>
	</figure>
	<figure style="--width: 375px">
		<img src="./images/2024/whixall-moss.webp" alt="Peat bog with grass and bushes" width="375" style="aspect-ratio: 4 / 3" />
		<figcaption>Whixall Moss</figcaption>
	</figure>
	<figure style="--width: 375px">
		<img src="./images/2024/red-damselfly.webp" alt="Red damselfly on a leaf" width="375" style="aspect-ratio: 4 / 3" />
		<figcaption>Damselfly at Whixall Moss</figcaption>
	</figure>
</div>

In July a friend and I walked in the parade together at Liverpool Pride, which felt really special.
It was my first Pride since graduating from university, and although it was very busy and noisy, the vibe was exciting rather than overwhelming.
We then went to a café for a quieter afternoon of poetry readings and music performances, then I went back to the dockside to hear a popstar sing an ’80s/’90s medley.
And I took some photos of the city in the sunshine as it was turning to sunset.

<div>
	<figure style="--width: 440px">
		<img src="./images/2024/liverpool-pride.webp" alt="Crowd of people in Pride flags walking through Liverpool" width="440" style="aspect-ratio: 4 / 3" />
		<figcaption>Liverpool Pride</figcaption>
	</figure>
	<figure style="--width: 330px">
		<img src="./images/2024/katrina-and-balloon.webp" alt="Singer on stage with someone in the audience holding up a heart-shaped rainbow balloon" width="330" style="aspect-ratio: 1 / 1" />
		<figcaption>Katrina of Katrina and the Waves</figcaption>
	</figure>
	<figure style="--width: 248px">
		<img src="./images/2024/liverpool-sunset.webp" alt="River Mersey at sunset with a backlit gull flying past the sun" width="248" style="aspect-ratio: 3 / 4" />
		<figcaption>Sunset with a seagull</figcaption>
	</figure>
</div>

And in the winter I was in Scotland with family.
A nearby ruin looked noticeably colourful under a break in the clouds.

<div>
	<figure style="--width: 1024px">
		<img src="./images/2024/ruthven-barracks.webp" alt="Sunlit ruins of a stone building on a hill under dark clouds" width="1024" style="aspect-ratio: 5 / 2" />
		<figcaption>Ruthven Barracks</figcaption>
	</figure>
</div>
