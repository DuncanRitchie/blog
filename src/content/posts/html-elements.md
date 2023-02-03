---
date: 2022-12-20
title: HTML elements and where I’ve used them
layout: ../../layouts/Post.astro
draft: false
tags: ['Software']
---

<style>
label {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	margin: 0.125rem 0 0.5rem;
}

label small {
	line-height: 1.3333em;
	margin: 0.3333em 0 0;
}

/* <meter> & <progress> elements contain pseudo-elements that are difficult to style consistently across browers.
Instead, I’ve decided to hide as much as I can, and use a linear gradient to fill the bars to the required proportion.
Firefox still shows a green pseudo-element for the bar, which is a bit irritating but I haven’t been able to fix it. */

meter,progress {
	width: 100%;
	height: 1rem;
	appearance: none;
	border: none;
	background: none;
	background-color: white;
	box-shadow: 0 0 0.5em -0.25em #333 inset;
	/* An extra gradient to make the elements look more 3D. */
	--gradient-overlay-3d: linear-gradient(rgba(0,0,0,0.125), transparent 16.7%, rgba(255,255,255,0.125) 33.3%, transparent 50%, rgba(0,0,0,0.25));
}

/* The linear gradients referring to var(--percentage) are what fill the bars to the required proportion.
That variable is set within the HTML for each element. */

meter {
	background-image: var(--gradient-overlay-3d),
	                  linear-gradient(to right, var(--colour1) var(--percentage), var(--colour2) 0%);
}

progress {
	background-image: var(--gradient-overlay-3d),
	                  linear-gradient(to right, rgba(0,0,0,0.5) var(--percentage), transparent 0%);
	background-color: var(--colour1);
}

::-webkit-meter-bar,
::-webkit-progress-bar {
	opacity: 0;
}

::-webkit-meter-optimum-value,
::-webkit-progress-value,
::-moz-progress-bar {
	opacity: 0;
}
</style>

# HTML elements and where I’ve used them

This is simply a catalogue of HTML elements and an example of somewhere I’ve used them, if I have ever used them. I got the full list of elements from the sidebar of [MDN’s documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element).
If I’ve created an element using Markdown or some UI library that doesn’t involve me explicitly typing out the HTML tags, I don’t consider myself to have used it.

I will probably update this page (perhaps using <code>&lt;ins&gt;</code> elements) if I use an element I haven’t used before.

## Counts

Of 134 elements, 27 are deprecated and one is experimental. The other 106 I consider to be usable, if the right opportunity presents itself. Some elements are very esoteric and there is no need for a web developer to have used all of them. But I find it interesting to keep count; I’ve used 47.

<label for="meter">HTML elements that are neither deprecated nor experimental <small> 106 of 134 (79.1%)</small></label>
<meter id="meter" min="0" value="106" max="134" style="--percentage: 79.1%"></progress>

<label for="progress">Usable elements that I’ve used <small> 47 of 106 (44.3%)</small></label>
<progress id="progress" value="47" max="106" style="--percentage: 44.3%"></progress>

## Full list

<dl>

<dt><code>&lt;a&gt;</code></dt>
<dd>
	<p>
		The element that puts the “hyper” into HyperText Markup Language, this is on pretty much every webpage I’ve ever made.
	</p>
</dd>

<dt><code>&lt;abbr&gt;</code></dt>
<dd>
	<p>
		I generally prefer to write out abbreviations in the text, instead of doing <code>&lt;abbr title="abbreviation"&gt;</code>.
		But the header of my Latin dictionary, <a href="https://www.velut.co.uk">velut</a>, does both, with one expansion of the abbreviation in English and one in Latin:
	<pre><code>&lt;p&gt;
	&lt;abbr title="Useful Tables of Excellent Latin Vocabulary" lang="la"&gt;
		velut
	&lt;/abbr&gt;
&lt;/p&gt;
&lt;p lang="la"&gt;
	Vocābulōrum Excellentium Latīnōrum Ūtilēs Tabulae
&lt;/p&gt;</code></pre>
	</p>
</dd>

<dt><code>&lt;acronym&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I’ve not used this. I guess I could have used it for the “velut” example above, if it weren’t deprecated.
	</p>
</dd>

<dt><code>&lt;address&gt;</code></dt>
<dd>
	<p>
		I’ve not used this.
	</p>
</dd>

<dt><code>&lt;applet&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I’ve not used this; it’s deprecated.
	</p>
</dd>

<dt><code>&lt;area&gt;</code></dt>
<dd>
	<p>
		Years ago I made a graphic with clickable regions, using <code>&lt;area&gt;</code> and <code>&lt;map&gt;</code>.
		I’ve not done anything similar since.
	</p>
</dd>

<dt><code>&lt;article&gt;</code></dt>
<dd>
	<p>
		I use this on <a href="https://www.duncanritchie.co.uk">my personal website</a>, because I need an element for grouping the heading and paragraphs within each section.
	</p>
</dd>

<dt><code>&lt;aside&gt;</code></dt>
<dd>
	<p>
		The “This article was written…” box at the top of my blog-posts is an <code>&lt;aside&gt;</code> element.
	</p>
</dd>

<dt><code>&lt;audio&gt;</code></dt>
<dd>
	<p>
		I’ve not used this.
	</p>
</dd>

<dt><code>&lt;b&gt;</code></dt>
<dd>
	<p>
		It’s used for the example results in the labels on the form for the <a href="https://velut.co.uk/advanced">Advanced Search page on velut</a>.
		I wanted bold styling, but not for emphasis, merely to mark the text as being different to its surrounding text.
	</p>
</dd>

<dt><code>&lt;base&gt;</code></dt>
<dd>
	<p>
		Very useful whenever I’m displaying a mini-website on a subpath of www.DuncanRitchie.co.uk, such as <code>&lt;base href="/blog/" /&gt;</code>.
	</p>
</dd>

<dt><code>&lt;bdi&gt;</code></dt>
<dd>
	<p>
		I’ve not used this.
	</p>
</dd>

<dt><code>&lt;bdo&gt;</code></dt>
<dd>
	<p>
		I’ve not used this.
	</p>
</dd>

<dt><code>&lt;bgsound&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I’ve not used this.
		It’s deprecated, and I wouldn’t want weird noises playing in the background while I’m looking at a webpage.
	</p>
</dd>

<dt><code>&lt;big&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I’ve not used this; it’s deprecated.
	</p>
</dd>

<dt><code>&lt;blink&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I’ve not used this; it’s deprecated.
	</p>
</dd>

<dt><code>&lt;blockquote&gt;</code></dt>
<dd>
	<p>
		I was surprised to learn I’ve not used this, except in Markdown for documentation at my work.
	</p>
</dd>

<dt><code>&lt;body&gt;</code></dt>
<dd>
	<p>
		Nobody will be surprised to hear I’ve used this, on every HTML page.
	</p>
</dd>

<dt><code>&lt;br&gt;</code></dt>
<dd>
	<p>
		I use this twice in the header of velut: between “Duncan Ritchie’s” and “velut”, and in the Latin expansion of the acronym (between <q lang="la">Vocābulōrum Excellentium</q> and <q lang="la">Latīnōrum Ūtilēs Tabulae</q>).
		Perhaps it’s not the <em>most</em> semantic of uses of the <code>&lt;br&gt;</code> element, since it’s purely for the visual effect of having the phrases on separate lines.
		But its a clean alternative to messing around with CSS and <code>&lt;span&gt;</code>s.
	</p>
</dd>

<dt><code>&lt;button&gt;</code></dt>
<dd>
	<p>
		Yep, I’ve definitely used this, just not on this blog (yet).
	</p>
</dd>

<dt><code>&lt;canvas&gt;</code></dt>
<dd>
	<p>
		I’ve not used this.
	</p>
</dd>

<dt><code>&lt;caption&gt;</code></dt>
<dd>
	<p>
		Despite running a website called Useful Tables of Excellent Latin Vocabulary, I’ve not made enough HTML tables to need any <code>&lt;caption&gt;</code> elements.
	</p>
</dd>

<dt><code>&lt;center&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I’ve not used this; it’s deprecated.
	</p>
</dd>

<dt><code>&lt;cite&gt;</code></dt>
<dd>
	<p>
		This would go with <code>&lt;blockquote&gt;</code>, another element I’ve not used.
	</p>
</dd>

<dt><code>&lt;code&gt;</code></dt>
<dd>
	<p>
		The code-snippets on this page are all within <code>&lt;code&gt;</code> tags.
	</p>
</dd>

<dt><code>&lt;col&gt;</code></dt>
<dd>
	<p>
		Another table element I’ve not used.
	</p>
</dd>

<dt><code>&lt;colgroup&gt;</code></dt>
<dd>
	<p>
		Another table element I’ve not used.
	</p>
</dd>

<dt><code>&lt;content&gt;</code> (Non-standard Deprecated)</dt>
<dd>
	<p>
		What even is this element?
		I’ve never heard of it!
		According to <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/content">MDN</a>, it’s an obsolete forerunner to the <code>&lt;slot&gt;</code> element in Web Components.
		The more you know.
	</p>
</dd>

<dt><code>&lt;data&gt;</code></dt>
<dd>
	<p>
		I’ve never used it, but I’m more likely to find a use for it than for some of the HTML elements in this list.
	</p>
</dd>

<dt><code>&lt;datalist&gt;</code></dt>
<dd>
	<p>
		I’ve not used this.
		Within a <code>&lt;select&gt;</code> element, a series of <code>&lt;option&gt;</code>s is a decent alternative.
	</p>
</dd>

<dt><code>&lt;dd&gt;</code></dt>
<dd>
	<p>
		I’m a big fan of description lists.
		This text is inside a <code>&lt;dd&gt;</code> element right now!
	</p>
</dd>

<dt><code>&lt;del&gt;</code></dt>
<dd>
	<p>
		I’ve used this at work, for example for bits of documentation that are no longer current.
	</p>
</dd>

<dt><code>&lt;details&gt;</code></dt>
<dd>
	<p>
		The “How to use” section of the Advanced Search page on velut is hidden in a <code>&lt;details&gt;</code> element, so you don’t see it until you open the <code>&lt;summary&gt;</code>.
	</p>
</dd>

<dt><code>&lt;dfn&gt;</code></dt>
<dd>
	<p>
		I don’t use the definition element on my own Latin dictionary (maybe I should!), but I do use it on the Neo-Latin lexicon (<a href="https://www.duncanritchie.co.uk/latinitas-recens">Latinitas Recens</a>) that I created a mirror for, earlier this year.
	</p>
</dd>

<dt><code>&lt;dialog&gt;</code></dt>
<dd>
	<p>
		This is a newer element, and I’ve not used it yet.
	</p>
</dd>

<dt><code>&lt;dir&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I’ve not used this; it’s deprecated.
	</p>
</dd>

<dt><code>&lt;div&gt;</code></dt>
<dd>
	<p>
		It’s the generic block-content element; yes I’ve used it.
	</p>
</dd>

<dt><code>&lt;dl&gt;</code></dt>
<dd>
	<p>
		All this text is in a description list here.
	</p>
</dd>

<dt><code>&lt;dt&gt;</code></dt>
<dd>
	<p>
		And this text is under a description term.
	</p>
</dd>

<dt><code>&lt;em&gt;</code></dt>
<dd>
	<p>
		Another element so common I <em>really</em> don’t want to give a particular example here.
	</p>
</dd>

<dt><code>&lt;embed&gt;</code></dt>
<dd>
	<p>
		I’ve not used this.
	</p>
</dd>

<dt><code>&lt;fieldset&gt;</code></dt>
<dd>
	<p>
		This is another element on the Advanced Search page of velut.
	</p>
</dd>

<dt><code>&lt;figcaption&gt;</code></dt>
<dd>
	<p>
		This is very useful for captioning figures, for example the pictures accompanying the sections on the www.DuncanRitchie.co.uk main website. 
	</p>
</dd>

<dt><code>&lt;figure&gt;</code></dt>
<dd>
	<p>
		Yes, I’ve used it.
	</p>
</dd>

<dt><code>&lt;font&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I’ve not used this; it’s deprecated.
	</p>
</dd>

<dt><code>&lt;footer&gt;</code></dt>
<dd>
	<p>
		This isn’t used on my personal website (www.DuncanRitchie.co.uk) per se, but it is used on the subsites off it (such as this blog). And it’s on velut.
	</p>
</dd>

<dt><code>&lt;form&gt;</code></dt>
<dd>
	<p>
		Every page on velut has a <code>&lt;form&gt;</code> element for searching.
	</p>
</dd>

<dt><code>&lt;frame&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I’ve not used this; it’s deprecated.
	</p>
</dd>

<dt><code>&lt;frameset&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I’ve not used this; it’s deprecated.
	</p>
</dd>

<dt><code>&lt;h1&gt;</code></dt>
<dd>
	<p>
		I used <code>&lt;h1&gt;</code> through to <code>&lt;h4&gt;</code>, but I don’t think I’ve ever used <code>&lt;h5&gt;</code>.
		And of course I wouldn’t use <code>&lt;h6&gt;</code> without <code>&lt;h5&gt;</code> above it.
	</p>
</dd>

<dt><code>&lt;head&gt;</code></dt>
<dd>
	<p>
		It’s in every HTML page.
	</p>
</dd>

<dt><code>&lt;header&gt;</code></dt>
<dd>
	<p>
		I’m using this on velut (along with <code>&lt;footer&gt;</code>), and I intend to use it at work.
	</p>
</dd>

<dt><code>&lt;hgroup&gt;</code></dt>
<dd>
	<p>
		Maybe I should be using this for the headers for the <a href="https://www.duncanritchie.co.uk/code#velut-projects">lists of my projects</a> on my website.
		I’m not at the moment.
	</p>
</dd>

<dt><code>&lt;hr&gt;</code></dt>
<dd>
	<p>
		I’ve not used horizontal rule elements.
	</p>
</dd>

<dt><code>&lt;html&gt;</code></dt>
<dd>
	<p>
		Yep, I’ve used this.
	</p>
</dd>

<dt><code>&lt;i&gt;</code></dt>
<dd>
	<p>
		I’ve used this a lot, including on this blog, for text in foreign languages that I want italicised.
	</p>
</dd>

<dt><code>&lt;iframe&gt;</code></dt>
<dd>
	<p>
		I’ve used this at work in a prototype.
	</p>
</dd>

<dt><code>&lt;image&gt;</code> (Non-standard Deprecated)</dt>
<dd>
	<p>
		I’ve not used this: <code>&lt;img&gt;</code> has been the standard element for images pretty much for ever, as far as I’m concerned.
	</p>
</dd>

<dt><code>&lt;img&gt;</code></dt>
<dd>
	<p>
		Yep, I’ve used this.
	</p>
</dd>

<dt><code>&lt;input&gt;</code></dt>
<dd>
	<p>
		Yep, I’ve used this.
	</p>
</dd>

<dt><code>&lt;ins&gt;</code></dt>
<dd>
	<p>
		I’ve used this on markdown documents, such as my <a href="https://github.com/DuncanRitchie/velut/blob/main/plan.md">plan for re-architecting my Latin dictionary</a>.
	</p>
</dd>

<dt><code>&lt;kbd&gt;</code></dt>
<dd>
	<p>
		It marks up the word “Ctrl” on my <a href="https://www.duncanritchie.co.uk/velut-dictionary-links/">Dictionary Links for velut</a> page.
		And I’ve used it elsewhere.
	</p>
</dd>

<dt><code>&lt;keygen&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I’ve never used this; it’s deprecated.
	</p>
</dd>

<dt><code>&lt;label&gt;</code></dt>
<dd>
	<p>
		I don’t use <code>&lt;label&gt;</code> on the main search form of velut (I don’t think it’s needed, even for accessibility), but it’s an important element for forms generally. I get a lot of use out of it.
	</p>
</dd>

<dt><code>&lt;legend&gt;</code></dt>
<dd>
	<p>
		I’ve never used this (although I have used <code>&lt;<em>foot</em>er&gt;</code>).
	</p>
</dd>

<dt><code>&lt;li&gt;</code></dt>
<dd>
	<p>
		The list item is a very common element I’ve used it in ordered and unordered lists, but not <code>&lt;menu&gt;</code>.
	</p>
</dd>

<dt><code>&lt;link&gt;</code></dt>
<dd>
	<p>
		This is another tag that’s on pretty much all my webpages, because having CSS in .css files and not directly in the HTML is a good idea.
	</p>
</dd>

<dt><code>&lt;main&gt;</code></dt>
<dd>
	<p>
		I don’t use <code>&lt;main&gt;</code> on the main pages of DuncanRitchie.co.uk (<a href="https://www.duncanritchie.co.uk">homepage</a>, <a href="https://www.duncanritchie.co.uk/code">my code</a>, <a href="https://www.duncanritchie.co.uk/aboutme">more about me</a>). But I do use it on a lot of my other pages, including all across this blog.
	</p>
</dd>

<dt><code>&lt;map&gt;</code></dt>
<dd>
	<p>
		As noted above, I’ve used <code>&lt;map&gt;</code> and <code>&lt;area&gt;</code>, but it was several years ago.
	</p>
</dd>

<dt><code>&lt;mark&gt;</code></dt>
<dd>
	<p>
		The first time I used this was on my <a href="https://www.duncanritchie.co.uk/latinitas-recens">Latinitas Recens mirror</a>, for highlighting the word you searched for in the lexicon entries.
	</p>
</dd>

<dt><code>&lt;marquee&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I’ve never used this; it’s deprecated.
	</p>
</dd>

<dt><code>&lt;menu&gt;</code></dt>
<dd>
	<p>
		I’ve not used this. I prefer to use <code>&lt;ul&gt;</code> for navigation menus.
	</p>
</dd>

<dt><code>&lt;menuitem&gt;</code> (Non-standard Deprecated)</dt>
<dd>
	<p>
		I’ve never used this; it’s deprecated.
	</p>
</dd>

<dt><code>&lt;meta&gt;</code></dt>
<dd>
	<p>
		This is an element that there should be at least one of in every <code>&lt;head&gt;</code>.
	</p>
</dd>

<dt><code>&lt;meter&gt;</code></dt>
<dd>
	<p>
		So far the only time I’ve used this is for the graph at the top of this blogpost, showing the proportion of HTML elements that I would consider using!
	</p>
</dd>

<dt><code>&lt;nav&gt;</code></dt>
<dd>
	<p>
		I like to get a navigation-menu on pretty much every webpage I make.
		The “<a href="https://www.velut.co.uk/about">About velut</a>” page on my Latin dictionary has two — one for the table of contents (navigating within the page), and the one in the footer for navigating the website.
	</p>
</dd>

<dt><code>&lt;nobr&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I’ve never used this; it’s deprecated.
	</p>
</dd>

<dt><code>&lt;noembed&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I’ve never used this; it’s deprecated.
	</p>
</dd>

<dt><code>&lt;noframes&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I’ve never used this; it’s deprecated.
	</p>
</dd>

<dt><code>&lt;noscript&gt;</code></dt>
<dd>
	<p>
		A cunning use of <code>&lt;noscript&gt;</code> is in the page on velut that allows you to <a href="https://www.velut.co.uk/many">search for many Latin words at once</a>.
		This page has a client-side–rendered version that runs if your browser supports JavaScript, and a server-side–rendered version that is used if you don’t have JavaScript.
		One of the form inputs is hidden (so you never see it) and wrapped in <code>&lt;noscript&gt;</code> (to disable it when JavaScript is supported).
		When the form is submitted, the presence or absence of this field determines whether the page should be rendered server-side or not.
	</p>

<pre><code>&lt;noscript&gt;
  &lt;input hidden name="ssr" value="true" onChange="void()" /&gt;
&lt;/noscript&gt;</code></pre>
</dd>

<dt><code>&lt;object&gt;</code></dt>
<dd>
	<p>
		I’ve never used this.
	</p>
</dd>

<dt><code>&lt;ol&gt;</code></dt>
<dd>
	<p>
		The good ol’ “list with explicit ordering” element.
		I’ve only used it in Markdown, for instance on my blogposts where I rank <a href="./eurovision-2022">Eurovision entries</a>.
	</p>
</dd>

<dt><code>&lt;optgroup&gt;</code></dt>
<dd>
	<p>
		I’ve not built dropdown inputs for forms that are complicated enough to need their options to be grouped, so I’ve never used <code>&lt;optgroup&gt;</code>.
	</p>
</dd>

<dt><code>&lt;option&gt;</code></dt>
<dd>
	<p>
		I’ve used this on velut (for the types of rhyme you can search for) and at work.
	</p>
</dd>

<dt><code>&lt;output&gt;</code></dt>
<dd>
	<p>
		I’ve not used this.
		I think it’s meant for simple bits of text within <code>&lt;form&gt;</code> elements, where the text changes according to the value of an input before the form is submitted.
		But I’ve never made a form like that.
	</p>
</dd>

<dt><code>&lt;p&gt;</code></dt>
<dd>
	<p>
		Yes, I write in paragraphs.
	</p>
</dd>

<dt><code>&lt;param&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I’ve never used this; it’s deprecated.
	</p>
</dd>

<dt><code>&lt;picture&gt;</code></dt>
<dd>
	<p>
		This is very useful if I want different sizes of an image to load for different sizes of screen — a smaller picture on mobile, larger on desktop, etc.
	</p>
</dd>

<dt><code>&lt;plaintext&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I’ve never used this; it’s deprecated.
	</p>
</dd>

<dt><code>&lt;portal&gt;</code> (Experimental)</dt>
<dd>
	<p>
		I’ve never used this; it’s experimental.
	</p>
</dd>

<dt><code>&lt;pre&gt;</code></dt>
<dd>
	<p>
		I’m using it on this page (and on other pages) for blocks of code.
	</p>
</dd>

<dt><code>&lt;progress&gt;</code></dt>
<dd>
	<p>
		There’s a <code>&lt;progress&gt;</code>-bar on the JavaScript (client–side—rendered) version of the “Look-up of many words” page on velut.
		It goes from 0 to 100% as the words load on the page.
	</p>
	<p>
		There is also a <code>&lt;progress&gt;</code>-bar at the top of this page.
		I intend to update it whenever I use a HTML element for the first time.
		It might never get to 100%.
	</p>
	</p>
</dd>

<dt><code>&lt;q&gt;</code></dt>
<dd>
	<p>
		An upcoming blogpost includes <code>&lt;q&gt;</code> elements, because I’m quoting text.
	</p>
</dd>

<dt><code>&lt;rb&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I’ve not used any of the “Ruby” elements for marking up the pronunciation of East Asian characters — I’ve never worked with Taiwanese writing (etc).
		And this element is deprecated, so that’s another great reason for me not to have used it.
	</p>
</dd>

<dt><code>&lt;rp&gt;</code></dt>
<dd>
	<p>
		Another Ruby element. Not deprecated, but I’ve still not used it.
	</p>
</dd>

<dt><code>&lt;rt&gt;</code></dt>
<dd>
	<p>
		Another Ruby element I’ve not used.
	</p>
</dd>

<dt><code>&lt;rtc&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		It’s a Ruby element and it’s deprecated.
		That’s a no from me.
	</p>
</dd>

<dt><code>&lt;ruby&gt;</code></dt>
<dd>
	<p>
		This is the element to surround any other Ruby elements and the East Asian characters they explain.
		I’ve not used it.
	</p>
</dd>

<dt><code>&lt;s&gt;</code></dt>
<dd>
	<p>
		I’ve used <code>&lt;del&gt;</code> for text that was on a page because it was relevant when it was written, but is no longer current after an edit.
		<s>I’ve not used <code>&lt;s&gt;</code> (or its obsolete variant <code>&lt;strike&gt;</code>).
		Maybe I should use it in the future.</s>
		Oh look, I’ve just used it now!
	</p>
</dd>

<dt><code>&lt;samp&gt;</code></dt>
<dd>
	<p>
		I’ve used this on my <a href="./vim">blogpost about Vim</a>.
		I’ve also used it in documentation for some things related to my Latin dictionary, such as my <a href="https://www.duncanritchie.co.uk/velut-word-data-generator">Word Data Generator</a>.
	</p>
</dd>

<dt><code>&lt;script&gt;</code></dt>
<dd>
	<p>
		Of course I’ve used this.
	</p>
</dd>

<dt><code>&lt;section&gt;</code></dt>
<dd>
	<p>
		I’m very fond of this element.
		It’s not used on this blog, but I use it a lot elsewhere.
	</p>
</dd>

<dt><code>&lt;select&gt;</code></dt>
<dd>
	<p>
		It’s the dropdown-menu on the homepage of velut (and on all the word pages on velut too).
	</p>
</dd>

<dt><code>&lt;shadow&gt;</code> (Non-standard Deprecated)</dt>
<dd>
	<p>
		I’ve never used this; it’s deprecated.
	</p>
</dd>

<dt><code>&lt;slot&gt;</code></dt>
<dd>
	<p>
		I like the idea of Web Components.
		JavaScript frameworks like Angular and React* are very popular, but can often be overkill.
		If Web Components can reduce developers’ reliance on such frameworks, that might be cool.
		Unfortunately, they seem like a faff to set up, and they’re such a new thing that I doubt many developers have learnt how to use them.
		I certainly have never made a Web Component, so I’ve never used <code>&lt;slot&gt;</code>.
	</p>
	<aside>
		* I know React is technically a library, not a framework.
		I don’t think many people use it by itself though — it’s often wrapped in something like Create React App or Next.js or Gatsby or whatever.
		That would mean you’re using a framework.
	</aside>
</dd>

<dt><code>&lt;small&gt;</code></dt>
<dd>
	<p>
		DuncanRitchie.co.uk has a <a href="https://www.duncanritchie.co.uk/404">404 page</a> that appears if the URL is mistyped. The words “404 error” in the heading are <code>&lt;small&gt;</code>, because it’s technical information that supplements the more layperson-friendly “Page not found” text.
	</p>
</dd>

<dt><code>&lt;source&gt;</code></dt>
<dd>
	<p>
		I’ve used this inside <code>&lt;picture&gt;</code> elements to specify alternative sizes for images.
	</p>
</dd>

<dt><code>&lt;spacer&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I didn’t know this element existed (or used to exist), until I wrote this blogpost.
		I’ve never used it; it’s deprecated.
	</p>
</dd>

<dt><code>&lt;span&gt;</code></dt>
<dd>
	<p>
		Yes, I’ve used it frequently.
	</p>
</dd>

<dt><code>&lt;strike&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I’ve not used it; it’s deprecated.
	</p>
</dd>

<dt><code>&lt;strong&gt;</code></dt>
<dd>
	<p>
		Why would you use <code>&lt;b&gt;</code> for emphasis when <code>&lt;strong&gt;</code> is <strong>so much better</strong>?!
	</p>
</dd>

<dt><code>&lt;style&gt;</code></dt>
<dd>
	<p>
		This is useful when I don’t want to put some CSS in a file separate to the HTML.
		For example, I use them in <del>Eleventy</del> <ins>Astro</ins> when making this blog.
		So I’m using <code>&lt;style&gt;</code> elements here.
	</p>
	<p>
		I also use it on the 404-page of DuncanRitchie.co.uk.
	</p>
	</p>
</dd>

<dt><code>&lt;sub&gt;</code></dt>
<dd>
	<p>
		Have I used this in some documentation at work?
		Maybe, maybe not.
		I’m surprised, because expressions like “CO<sub>2</sub>” aren’t exactly obscure.
		There, I’ve used it now.
	</p>
</dd>

<dt><code>&lt;summary&gt;</code></dt>
<dd>
	<p>
			The “How to use” section of the Advanced Search page on velut is hidden in a <code>&lt;details&gt;</code> element, so you don’t see it until you open the <code>&lt;summary&gt;</code>.
	</p>
</dd>

<dt><code>&lt;sup&gt;</code></dt>
<dd>
	<p>
		As with <code>&lt;sub&gt;</code>, I might have never used it on personal web things.
		But I’ve almost certainly written “O(n<sup>2</sup>)” and suchlike at work.
		Or did I use Unicode ordinal characters — “O(n²)” — instead?
		(I don’t know why I would have done that.)
		I’ll count <code>&lt;sup&gt;</code> among the elements I’ve used.
	</p>
</dd>

<dt><code>&lt;table&gt;</code></dt>
<dd>
	<p>
		I don’t write HTML tables very often, but I have done so.
	</p>
</dd>

<dt><code>&lt;tbody&gt;</code></dt>
<dd>
	<p>
		I don’t think I’ve ever wrapped the non-header rows of a table in <code>&lt;tbody&gt;</code>.
	</p>
</dd>

<dt><code>&lt;td&gt;</code></dt>
<dd>
	<p>
		Yep, on the rare occasion that I make a HTML table, that table has cells.
	</p>
</dd>

<dt><code>&lt;template&gt;</code></dt>
<dd>
	<p>
		I’ve never explicitly used a <code>&lt;template&gt;</code> element.
	</p>
</dd>

<dt><code>&lt;textarea&gt;</code></dt>
<dd>
	<p>
		Yep, I’ve used it, both at work and on several things related to my Latin dictionary.
	</p>
</dd>

<dt><code>&lt;tfoot&gt;</code></dt>
<dd>
	<p>
		No, I’ve never made a table with the bottom rows in a special element.
	</p>
</dd>

<dt><code>&lt;th&gt;</code></dt>
<dd>
	<p>
		I only recently learnt that <code>&lt;td&gt;</code> should be replaced with <code>&lt;th&gt;</code> when inside <code>&lt;thead&gt;</code>.
		So I’ve not yet used <code>&lt;th&gt;</code>, but I will in future.
	</p>
</dd>

<dt><code>&lt;thead&gt;</code></dt>
<dd>
	<p>
		I can’t find or remember where I’ve used a <code>&lt;thead&gt;</code> element, but I’m pretty sure I have.
		I’m counting it.
	</p>
</dd>

<dt><code>&lt;time&gt;</code></dt>
<dd>
	<p>
		I use it on the dates for <a href="https://www.duncanritchie.co.uk/code#velut-projects">code-projects</a> on my website, and for the dates of my posts on this blog.
	</p>
</dd>

<dt><code>&lt;title&gt;</code></dt>
<dd>
	<p>
		Every webpage should have a title.
		Yes, I’ve used it.
	</p>
</dd>

<dt><code>&lt;tr&gt;</code></dt>
<dd>
	<p>
		Yep, on the rare occasion that I make a HTML table, that table has rows.
	</p>
</dd>

<dt><code>&lt;track&gt;</code></dt>
<dd>
	<p>
		This would be for specifying subtitles for audio- or video-players.
		I’ve never used <code>&lt;audio&gt;</code> or <code>&lt;video&gt;</code>, so I’ve not used <code>&lt;track&gt;</code> either.
	</p>
</dd>

<dt><code>&lt;tt&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I’ve not used this; it’s deprecated.
	</p>
</dd>

<dt><code>&lt;u&gt;</code></dt>
<dd>
	<p>
		I’ve not used this.
		I don’t really like underlining things that aren’t hyperlinks, and even when I do underline something, I would just use CSS to make that happen, because I would already have a different element to apply the style to.
	</p>
	<p>
		The MDN documentation suggests using <code>&lt;u&gt;</code> to mark spelling mistakes in user-submitted text.
		The closest thing I’ve ever done to that sort of use-case is (again) the “Look-up of many words” feature of velut.
		If the user entered a Latin word that is in my dictionary, a hyperlink is generated for that word; but if the word has not been found, the word appears without a hyperlink.
		I suppose I could use <code>&lt;u&gt;</code> to mark those words that are not in the dictionary.
		But I don’t need to, so I probably won’t.
	</p>
	</p>
</dd>

<dt><code>&lt;ul&gt;</code></dt>
<dd>
	<p>
		I like to use <code>&lt;ul&gt;</code> inside <code>&lt;nav&gt;</code> for navigation-menus.
	</p>
</dd>

<dt><code>&lt;var&gt;</code></dt>
<dd>
	<p>
		I’ve not used this.
	</p>
</dd>

<dt><code>&lt;video&gt;</code></dt>
<dd>
	<p>
		I’ve not used this.
	</p>
</dd>

<dt><code>&lt;wbr&gt;</code></dt>
<dd>
	<p>
		I used this on a <a href="./web-technologies-with-confusing-names">blogpost earlier this year</a>, because I had written some words with slashes between them and I wanted to allow line-breaks after the slashes.
	</p>
</dd>

<dt><code>&lt;xmp&gt;</code> (Deprecated)</dt>
<dd>
	<p>
		I’ve never used this; it’s deprecated.
	</p>
</dd>

</dl>
