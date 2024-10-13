---
date: 2022-12-20
title: HTML elements and where I’ve used them
draft: false
tags: ['Software']
editHistory: [
	[2023-02-10, 'Said I’ve used <th>'],
	[2023-02-28, 'Said I’ve used <th> & <slot>'],
	[2023-02-28, 'Colour-coding in list'],
	[2023-03-01, 'Buttons for toggling visibility of list-items'],
	[2023-03-07, 'Said I’ve used <blockquote> & <cite>'],
	[2023-04-02, 'Improved description of <abbr>'],
	[2023-05-19, 'Said I’ve used <hgroup>'],
	[2023-06-03, 'Explained that <menu> is tantamount to deprecated'],
	[2023-06-04, 'Added <search>'],
	[2023-08-07, 'Said I’ve used <hr>'],
	[2023-11-02, 'Said I’ve used <tbody> & <output>'],
	[2023-11-04, 'Added <math> & <svg>'],
	[2023-11-04, 'Used <data> & said I’ve used it'],
	[2024-08-22, 'I’ve used <fieldset> and <legend>'],
	[2024-08-30, 'I’ve used <marquee> although it’s deprecated'],
	[2024-10-13, 'I’ve used <col> & <colgroup>'],
	[2024-10-13, 'More detail on <address>, <th>, <var>'],
]
---

<style>
:root {
	/* An extra gradient to make the elements look more 3D. */
	--gradient-overlay-3d: linear-gradient(rgba(0,0,0,0.125), transparent 16.7%, rgba(255,255,255,0.125) 33.3%, transparent 50%, rgba(0,0,0,0.25));

  /* Fills for the definition list items.
	These are actually solid colour fills, because --gradient-overlay-3d is commented out in them.
	But I’ve implemented them as gradients, in case I wanted to uncomment the var(--gradient-overlay-3d),
  and so that I can have the “used” colour derived from the “usable-unused” made darker. */
	--used-gradient:
		/* var(--gradient-overlay-3d), */
		linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
		linear-gradient(var(--colour1), var(--colour1));
	--usable-unused-gradient:
		/* var(--gradient-overlay-3d), */
		linear-gradient(var(--colour1), var(--colour1));
	--deprecated-gradient:
		/* var(--gradient-overlay-3d), */
		linear-gradient(var(--colour2), var(--colour2));
	--experimental-gradient: var(--deprecated-gradient);
}

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

/* <meter> & <progress> elements contain pseudo-elements that are difficult to style consistently across browsers.
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

.filter-buttons {
	display: flex;
	gap: 0.25em;
	flex-wrap: wrap;
}

button[data-elements-class] {
	padding-left: 1em;
}

button[data-elements-class] span {
	display: inline-block;
	width: 1em;
	height: 1em;
	transform: translateX(-0.5em);
	vertical-align: -0.1875em;
	filter: drop-shadow(0.5px 0.5px var(--nav-text)) drop-shadow(-0.5px -0.5px var(--nav-text)) drop-shadow(-0.5px 0.5px var(--nav-text)) drop-shadow(0.5px -0.5px var(--nav-text));
	/* background-color: var(--colour2); */
}

button[data-elements-class] span::before {
	content: '';
	display: inline-block;
	width: 1em;
	height: 1em;
	/* Cross shape from BennettFeely.com/clippy */
	clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
}

button[data-elements-class][aria-pressed="true"] span::before {
	clip-path: unset;
	background-color: var(--colour6);
	/* Custon tick shape from BennettFeely.com/clippy */
	clip-path: polygon(16% 51%, 0 69%, 32% 100%, 100% 20%, 80% 0%, 33% 66%);
}

dl div {
	padding-left: 1rem;
	/* This is purely so pseudo-elements have the same height as their parents. */
	position: relative;
}

dd {
	margin-left: 2rem;
}

dl div::before {
	content: '';
	position: absolute;
	transform: translateX(-1rem);
	width: 0.25rem;
	height: calc(100% + 1em);
	/* If a class has been set on <div>, the yellow should be hidden by background-image.
	So if yellow appears, a class is missing. */
	background-color: yellow;
}

dl div.used::before,
button[data-elements-class="used"] span::before {
	background-image: var(--used-gradient);
}

dl div.deprecated::before,
button[data-elements-class="deprecated"] span::before {
	background-image: var(--deprecated-gradient);
}

dl div.experimental::before,
button[data-elements-class="experimental"] span::before {
	background-image: var(--experimental-gradient);
}

dl div.usable-unused::before,
button[data-elements-class="usable-unused"] span::before {
	background-image: var(--usable-unused-gradient);
}
</style>

# HTML elements and where I’ve used them

This is simply a catalogue of HTML elements and an example of somewhere I’ve used them, if I have ever used them.

I got the full list of elements from the sidebar of [MDN’s documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element), then added <code>&lt;math&gt;</code> and <code>&lt;svg&gt;</code> (which are part of MathML and SVG respectively but can be used to embed those formats in HTML).

If I’ve created an element using Markdown or some UI library that doesn’t involve me explicitly typing out the HTML tags, I don’t consider myself to have used it.

I will probably update this page (perhaps using <code>&lt;ins&gt;</code> elements) if I use an element I haven’t used before.

## Counts

Of <data value="total">137</data> elements, <data value="deprecated">27</data> are deprecated and <data value="experimental">1</data> is experimental.
The other <data value="usable">109</data> I consider to be usable, if the right opportunity presents itself.
Some elements are very esoteric and there is no need for a web developer to have used all of them.
But I find it interesting to keep count; I’ve used <data value="used">86</data>.

<label for="meter">
	HTML elements that are neither deprecated nor experimental
	<small>
		<data value="usable">109</data>
		of
		<data value="total">137</data>
		(<data value="usable-percent-of-total">79.6</data>%)
	</small>
</label>
<meter id="meter"	min="0"
	value="109" max="137"
	data-value="usable" data-max="total"
	style="--percentage: 79.6%"
></meter>

<label for="progress">
	Usable elements that I’ve used
	<small>
		<data value="used">86</data>
		of
		<data value="usable">109</data>
		(<data value="used-percent-of-usable">78.9</data>%)
	</small>
</label>
<progress id="progress"	min="0"
	value="86" max="109"
	data-value="used" data-max="usable"
	style="--percentage: 78.9%"
></progress>

## Filters

<!-- The empty <span>s are for the tick/cross shapes. -->
<div class="filter-buttons">
	<button type="button" aria-pressed="true" data-elements-class="used">
		<span></span>Elements I’ve used
	</button>
	<button type="button" aria-pressed="true" data-elements-class="usable-unused">
		<span></span>Usable elements I’ve not used
	</button>
	<button type="button" aria-pressed="true" data-elements-class="deprecated">
		<span></span>Deprecated elements
	</button>
	<button type="button" aria-pressed="true" data-elements-class="experimental">
		<span></span>Experimental elements
	</button>
</div>

## List

<dl>

<div class="used" id="a">
	<dt><code>&lt;a&gt;</code></dt>
	<dd>
		<p>
			The element that puts the “hyper” into HyperText Markup Language, this is on pretty much every webpage I’ve ever made.
		</p>
	</dd>
</div>

<div class="used" id="abbr">
	<dt><code>&lt;abbr&gt;</code></dt>
	<dd>
		<p>
			Here’s an example of this element: <abbr title="United Kingdom">UK</abbr>.
			The code for that is <code>&lt;abbr title="United Kingdom"&gt;UK&lt;/abbr&gt;</code>.
		</p>
		<p>
			On desktop, you can mouse-over the element to see the title.
			On a mobile device, you can’t do that, so it’s not very useful.
			So I generally prefer to write out abbreviations in the text, without a special element, as in “I live in the UK (United Kingdom).”
		</p>
		<p>
			But the header of my Latin dictionary, <a href="https://www.velut.co.uk">velut</a>, has both approaches, with one expansion of the abbreviation in English and one in Latin:
		<pre><code>&lt;p&gt;
	&lt;abbr title="Useful Tables of Excellent Latin Vocabulary"&gt;
		velut
	&lt;/abbr&gt;
&lt;/p&gt;
&lt;p lang="la"&gt;
	Vocābulōrum Excellentium Latīnōrum Ūtilēs Tabulae
&lt;/p&gt;</code></pre>
		</p>
		<p>
			(As an extra nicety, both expansions also appear in the text of the “About” page of velut.
			Mobile-users who can’t read Latin can understand the abbreviation from there.)
		</p>
	</dd>
</div>

<div class="deprecated" id="acronym">
	<dt><code>&lt;acronym&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			I’ve not used this.
			I guess I could have used it for the “velut” example above, if it weren’t deprecated.
		</p>
	</dd>
</div>

<div class="usable-unused" id="address">
	<dt><code>&lt;address&gt;</code></dt>
	<dd>
		<p>
			I’ve not used this, but it’s the tag I’m the most surprised that I haven’t used.
			Somehow I’ve not needed an element to wrap contact information, such as an email address or social media links (or indeed a street address).
		</p>
		<p>
			My <a href="https://github.com/DuncanRitchie/DuncanRitchie">GitHub profile readme</a> ends with some contact information, including my city, LinkedIn profile, and personal website.
			I tried wrapping it in <code>&lt;address&gt;</code> just for the sake of it, but GitHub stripped out the tag when it rendered the file.
		</p>
	</dd>
</div>

<div class="deprecated" id="applet">
	<dt><code>&lt;applet&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			I’ve not used this; it’s deprecated.
		</p>
	</dd>
</div>

<div class="used" id="area">
	<dt><code>&lt;area&gt;</code></dt>
	<dd>
		<p>
			Years ago I made a graphic with clickable regions, using <code>&lt;area&gt;</code> and <code>&lt;map&gt;</code>.
			I’ve not done anything similar since.
		</p>
	</dd>
</div>

<div class="used" id="article">
	<dt><code>&lt;article&gt;</code></dt>
	<dd>
		<p>
			I use this on <a href="https://www.duncanritchie.co.uk">my personal website</a>, because I need an element for grouping the heading and paragraphs within each section.
		</p>
	</dd>
</div>

<div class="used" id="aside">
	<dt><code>&lt;aside&gt;</code></dt>
	<dd>
		<p>
			The “This article was written…” box at the top of my blog-posts is an <code>&lt;aside&gt;</code> element.
		</p>
	</dd>
</div>

<div class="usable-unused" id="audio">
	<dt><code>&lt;audio&gt;</code></dt>
	<dd>
		<p>
			I’ve not used this.
		</p>
	</dd>
</div>

<div class="used" id="b">
	<dt><code>&lt;b&gt;</code></dt>
	<dd>
		<p>
			It’s used for the example results in the labels on the form for the <a href="https://velut.co.uk/advanced">Advanced Search page on velut</a>.
			I wanted bold styling, but not for emphasis, merely to mark the text as being different to its surrounding text.
		</p>
	</dd>
</div>

<div class="used" id="base">
	<dt><code>&lt;base&gt;</code></dt>
	<dd>
		<p>
			Very useful whenever I’m displaying a mini-website on a subpath of www.DuncanRitchie.co.uk, such as <code>&lt;base href="/blog/" /&gt;</code>.
		</p>
	</dd>
</div>

<div class="usable-unused" id="bdi">
	<dt><code>&lt;bdi&gt;</code></dt>
	<dd>
		<p>
			I’ve not used this.
		</p>
	</dd>
</div>

<div class="usable-unused" id="bdo">
	<dt><code>&lt;bdo&gt;</code></dt>
	<dd>
		<p>
			I’ve not used this.
		</p>
	</dd>
</div>

<div class="deprecated" id="bgsound">
	<dt><code>&lt;bgsound&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			I’ve not used this.
			It’s deprecated, and I wouldn’t want weird noises playing in the background while I’m looking at a webpage.
		</p>
	</dd>
</div>

<div class="deprecated" id="big">
	<dt><code>&lt;big&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			I’ve not used this; it’s deprecated.
		</p>
	</dd>
</div>

<div class="deprecated" id="blink">
	<dt><code>&lt;blink&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			I’ve not used this; it’s deprecated.
		</p>
	</dd>
</div>

<div class="used" id="blockquote">
	<dt><code>&lt;blockquote&gt;</code></dt>
	<dd>
		<p>
			I’ve used this in Markdown for documentation at my work, where I accompanied with a pure HTML <code>&lt;cite&gt;</code>.
			My most recent <a href="/blog/eurovision-2022-my-thoughts">Eurovision article</a> has it in pure HTML, but without <code>&lt;cite&gt;</code>.
		</p>
	</dd>
</div>

<div class="used" id="body">
	<dt><code>&lt;body&gt;</code></dt>
	<dd>
		<p>
			Nobody will be surprised to hear I’ve used this, on every HTML page.
		</p>
	</dd>
</div>

<div class="used" id="br">
	<dt><code>&lt;br&gt;</code></dt>
	<dd>
		<p>
			I use this twice in the header of velut: between “Duncan Ritchie’s” and “velut”, and in the Latin expansion of the acronym (between <q lang="la">Vocābulōrum Excellentium</q> and <q lang="la">Latīnōrum Ūtilēs Tabulae</q>).
			It’s a clean alternative to messing around with CSS and <code>&lt;span&gt;</code>s, which is what I would probably do if I wanted the text on one line at some screen-sizes and on two (or more) lines at others.
		</p>
	</dd>
</div>

<div class="used" id="button">
	<dt><code>&lt;button&gt;</code></dt>
	<dd>
		<p>
			Yep, I’ve definitely used this.
			<ins>The first use of it on this blog is for the <a href="#filters">filters</a> on this list.</ins>
		</p>
	</dd>
</div>

<div class="usable-unused" id="canvas">
	<dt><code>&lt;canvas&gt;</code></dt>
	<dd>
		<p>
			I’ve not used this.
		</p>
	</dd>
</div>

<div class="usable-unused" id="caption">
	<dt><code>&lt;caption&gt;</code></dt>
	<dd>
		<p>
			Despite running a website called Useful Tables of Excellent Latin Vocabulary, I’ve not made enough HTML tables to need any <code>&lt;caption&gt;</code> elements.
		</p>
	</dd>
</div>

<div class="deprecated" id="center">
	<dt><code>&lt;center&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			I’ve not used this; it’s deprecated.
		</p>
	</dd>
</div>

<div class="used" id="cite">
	<dt><code>&lt;cite&gt;</code></dt>
	<dd>
		<p>
			This can go with <code>&lt;blockquote&gt;</code>, to mark up the source of a quotation.
			I have done so on occasion.
		</p>
	</dd>
</div>

<div class="used" id="code">
	<dt><code>&lt;code&gt;</code></dt>
	<dd>
		<p>
			The code-snippets on this page are all within <code>&lt;code&gt;</code> tags.
		</p>
	</dd>
</div>

<div class="used" id="col">
	<dt><code>&lt;col&gt;</code></dt>
	<dd>
		<p>
			I use this on velut, though it’s inside a component that is not yet publicly visible (as of the time of this edit).
			Here’s a whole <a href="./col-elements-on-verb-tables">article about it</a>.
		</p>
	</dd>
</div>

<div class="used" id="colgroup">
	<dt><code>&lt;colgroup&gt;</code></dt>
	<dd>
		<p>
			<a href="#col"><code>&lt;col&gt;</code></a> elements need to be wrapped in <code>&lt;colgroup&gt;</code> for valid HTML.
			That’s the context I’ve used it in.
		</p>
		<p>
			(Apart from making HTML valid, the point of <code>&lt;colgroup&gt;</code> is for formatting a set of table columns, rather than a particular column.
			And it can have a <code>span</code> attribute instead of <code>&lt;col&gt;</code> children, if individual columns don’t need to be targeted.
			The <code>&lt;col&gt;</code> element can also have the <code>span</code> attribute, if its parent <code>&lt;colgroup&gt;</code> doesn’t.
			I haven’t yet wanted to do any of that.)
		</p>
	</dd>
</div>

<div class="deprecated" id="content">
	<dt><code>&lt;content&gt;</code> (Non-standard Deprecated)</dt>
	<dd>
		<p>
			What even is this element?
			I’ve never heard of it!
			According to <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/content">MDN</a>, it’s an obsolete forerunner to the <code>&lt;slot&gt;</code> element in Web Components.
			The more you know.
		</p>
	</dd>
</div>

<div class="used" id="data">
	<dt><code>&lt;data&gt;</code></dt>
	<dd>
		<p>
			I’m using it on this page!
			The statistics at the top of this page are wrapped in <code>&lt;data&gt;</code> tags that have <code>value</code> attributes that serve as keys.
			Then I have JavaScript that checks that the visible text matches the appropriate value for the <code>value</code> attribute.
			This helps me keep the numbers in sync with the list of tags.
		</p>
		<p>
			For example, <code>&lt;data value="deprecated"&gt;<data value="deprecated">27</data>&lt;/data&gt;</code> gets checked against a JavaScript variable called <code>deprecated</code>, which is the number of deprecated HTML tags in this list.
			You’ll get a message in your browser’s console if this isn’t <data value="deprecated">27</data>.
		</p>
		<p>
			(Is it weird that I’m using <code>value</code> attributes to specify keys for getting values, rather than the values themselves?
			Probably.
			But it works well enough, and seems to fit within the purpose of the <code>&lt;data&gt;</code> tag.)
		</p>
		<p>
			Of course, if I were using React or some other front-end library for rendering this page, I wouldn’t need to check the numbers like this and update them manually.
			But I like that I have a vanilla-JS solution here.
			And I <em>could</em> use JavaScript to set the text to the correct values, but I like that the content of this page is the same regardless of whether you have scripting enabled in your browser.
		</p>
	</dd>
</div>

<div class="usable-unused" id="datalist">
	<dt><code>&lt;datalist&gt;</code></dt>
	<dd>
		<p>
			I’ve not used this.
			Within a <code>&lt;select&gt;</code> element, a series of <code>&lt;option&gt;</code>s is a decent alternative.
		</p>
	</dd>
</div>

<div class="used" id="dd">
	<dt><code>&lt;dd&gt;</code></dt>
	<dd>
		<p>
			I’m a big fan of description lists.
			This text is inside a <code>&lt;dd&gt;</code> element right now!
		</p>
	</dd>
</div>

<div class="used" id="del">
	<dt><code>&lt;del&gt;</code></dt>
	<dd>
		<p>
			I’ve used this at work, for example for bits of documentation that are no longer current.
		</p>
	</dd>
</div>

<div class="used" id="details">
	<dt><code>&lt;details&gt;</code></dt>
	<dd>
		<p>
			The “How to use” section of the Advanced Search page on velut is hidden in a <code>&lt;details&gt;</code> element, so you don’t see it until you open the <code>&lt;summary&gt;</code>.
		</p>
	</dd>
</div>

<div class="used" id="dfn">
	<dt><code>&lt;dfn&gt;</code></dt>
	<dd>
		<p>
			I don’t use the definition element on my own Latin dictionary (maybe I should!), but I do use it on the Neo-Latin lexicon (<a href="https://www.duncanritchie.co.uk/latinitas-recens">Latinitas Recens</a>) that I created a mirror for, earlier this year.
		</p>
	</dd>
</div>

<div class="usable-unused" id="dialog">
	<dt><code>&lt;dialog&gt;</code></dt>
	<dd>
		<p>
			This is a newer element, and I’ve not used it yet.
		</p>
	</dd>
</div>

<div class="deprecated" id="dir">
	<dt><code>&lt;dir&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			I’ve not used this; it’s deprecated.
		</p>
	</dd>
</div>

<div class="used" id="div">
	<dt><code>&lt;div&gt;</code></dt>
	<dd>
		<p>
			It’s the generic block-content element; yes I’ve used it.
		</p>
	</dd>
</div>

<div class="used" id="dl">
	<dt><code>&lt;dl&gt;</code></dt>
	<dd>
		<p>
			All this text is in a description list here.
		</p>
	</dd>
</div>

<div class="used" id="dt">
	<dt><code>&lt;dt&gt;</code></dt>
	<dd>
		<p>
			And this text is under a description term.
		</p>
	</dd>
</div>

<div class="used" id="em">
	<dt><code>&lt;em&gt;</code></dt>
	<dd>
		<p>
			Another element so common I <em>really</em> don’t want to give a particular example here.
		</p>
	</dd>
</div>

<div class="usable-unused" id="embed">
	<dt><code>&lt;embed&gt;</code></dt>
	<dd>
		<p>
			I’ve not used this.
		</p>
	</dd>
</div>

<div class="used" id="fieldset">
	<dt><code>&lt;fieldset&gt;</code></dt>
	<dd>
		<p>
			My first use of <code>&lt;fieldset&gt;</code> and <code>&lt;legend&gt;</code> on this blog was when I made <a href="blog/css-flags">flags with CSS</a>.
			The fieldset wraps a set of radio buttons that change the flag design.
		</p>
	</dd>
</div>

<div class="used" id="figcaption">
	<dt><code>&lt;figcaption&gt;</code></dt>
	<dd>
		<p>
			This is very useful for captioning figures, for example the pictures accompanying the sections on the www.DuncanRitchie.co.uk main website.
		</p>
	</dd>
</div>

<div class="used" id="figure">
	<dt><code>&lt;figure&gt;</code></dt>
	<dd>
		<p>
			Yes, I’ve used it.
		</p>
	</dd>
</div>

<div class="deprecated" id="font">
	<dt><code>&lt;font&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			I’ve not used this; it’s deprecated.
		</p>
	</dd>
</div>

<div class="used" id="footer">
	<dt><code>&lt;footer&gt;</code></dt>
	<dd>
		<p>
			This isn’t used on my personal website (www.DuncanRitchie.co.uk) per se, but it is used on the subsites off it (such as this blog).
			And it’s on velut.
		</p>
	</dd>
</div>

<div class="used" id="form">
	<dt><code>&lt;form&gt;</code></dt>
	<dd>
		<p>
			Every page on velut has a <code>&lt;form&gt;</code> element for searching.
		</p>
	</dd>
</div>

<div class="deprecated" id="frame">
	<dt><code>&lt;frame&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			I’ve not used this; it’s deprecated.
		</p>
	</dd>
</div>

<div class="deprecated" id="frameset">
	<dt><code>&lt;frameset&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			I’ve not used this; it’s deprecated.
		</p>
	</dd>
</div>

<div class="used" id="h1">
	<dt><code>&lt;h1&gt;</code></dt>
	<dd>
		<p>
			I used <code>&lt;h1&gt;</code> through to <code>&lt;h4&gt;</code>, but I don’t think I’ve ever used <code>&lt;h5&gt;</code>.
			And of course I wouldn’t use <code>&lt;h6&gt;</code> without <code>&lt;h5&gt;</code> above it.
		</p>
	</dd>
</div>

<div class="used" id="head">
	<dt><code>&lt;head&gt;</code></dt>
	<dd>
		<p>
			It’s in every HTML page.
		</p>
	</dd>
</div>

<div class="used" id="header">
	<dt><code>&lt;header&gt;</code></dt>
	<dd>
		<p>
			I’m using this on velut (along with <code>&lt;footer&gt;</code>), and I intend to use it at work.
		</p>
	</dd>
</div>

<div class="used" id="hgroup">
	<dt><code>&lt;hgroup&gt;</code></dt>
	<dd>
		<p>
			Maybe I should be using this for the headers for the <a href="https://www.duncanritchie.co.uk/code#velut-projects">lists of my projects</a> on my website.
			I’m not at the moment.
		</p>
		<p>
			<ins>Update: I’m now using it for that purpose!</ins>
		</p>
	</dd>
</div>

<div class="used" id="hr">
	<dt><code>&lt;hr&gt;</code></dt>
	<dd>
		<p>
			I’ve not used horizontal rule elements on webpages, but I made some email templates for work that used them.
		</p>
	</dd>
</div>

<div class="used" id="html">
	<dt><code>&lt;html&gt;</code></dt>
	<dd>
		<p>
			Yep, I’ve used this.
		</p>
	</dd>
</div>

<div class="used" id="i">
	<dt><code>&lt;i&gt;</code></dt>
	<dd>
		<p>
			I’ve used this a lot, including on this blog, for text in foreign languages that I want italicised.
		</p>
	</dd>
</div>

<div class="used" id="iframe">
	<dt><code>&lt;iframe&gt;</code></dt>
	<dd>
		<p>
			I’ve used this at work in a prototype.
		</p>
	</dd>
</div>

<div class="deprecated" id="image">
	<dt><code>&lt;image&gt;</code> (Non-standard Deprecated)</dt>
	<dd>
		<p>
			I’ve not used this: <code>&lt;img&gt;</code> has been the standard element for images pretty much for ever, as far as I’m concerned.
		</p>
	</dd>
</div>

<div class="used" id="img">
	<dt><code>&lt;img&gt;</code></dt>
	<dd>
		<p>
			Yep, I’ve used this.
		</p>
	</dd>
</div>

<div class="used" id="input">
	<dt><code>&lt;input&gt;</code></dt>
	<dd>
		<p>
			Yep, I’ve used this.
		</p>
	</dd>
</div>

<div class="used" id="ins">
	<dt><code>&lt;ins&gt;</code></dt>
	<dd>
		<p>
			I’ve used this on markdown documents, such as my <a href="https://github.com/DuncanRitchie/velut/blob/main/plan.md">plan for re-architecting my Latin dictionary</a>.
		</p>
	</dd>
</div>

<div class="used" id="kbd">
	<dt><code>&lt;kbd&gt;</code></dt>
	<dd>
		<p>
			It marks up the word “Ctrl” on my <a href="https://www.duncanritchie.co.uk/velut-dictionary-links/">Dictionary Links for velut</a> page.
			And I’ve used it elsewhere.
		</p>
	</dd>
</div>

<div class="deprecated" id="keygen">
	<dt><code>&lt;keygen&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			I’ve never used this; it’s deprecated.
		</p>
	</dd>
</div>

<div class="used" id="label">
	<dt><code>&lt;label&gt;</code></dt>
	<dd>
		<p>
			I don’t use <code>&lt;label&gt;</code> on the main search form of velut (I don’t think it’s needed, even for accessibility), but it’s an important element for forms generally.
			I get a lot of use out of it.
		</p>
	</dd>
</div>

<div class="used" id="legend">
	<dt><code>&lt;legend&gt;</code></dt>
	<dd>
		<p>
			As I mentioned above, I used this and <code>&lt;fieldset&gt;</code> in my <a href="blog/css-flags">CSS flags</a> article.
		</p>
	</dd>
</div>

<div class="used" id="li">
	<dt><code>&lt;li&gt;</code></dt>
	<dd>
		<p>
			The list item is a very common element.
		I’ve used it in ordered and unordered lists, but not <code>&lt;menu&gt;</code>.
		</p>
	</dd>
</div>

<div class="used" id="link">
	<dt><code>&lt;link&gt;</code></dt>
	<dd>
		<p>
			This is another tag that’s on pretty much all my webpages, because having CSS in .css files and not directly in the HTML is a good idea.
		</p>
	</dd>
</div>

<div class="used" id="main">
	<dt><code>&lt;main&gt;</code></dt>
	<dd>
		<p>
			I don’t use <code>&lt;main&gt;</code> on the main pages of DuncanRitchie.co.uk (<a href="https://www.duncanritchie.co.uk">homepage</a>, <a href="https://www.duncanritchie.co.uk/code">my code</a>, <a href="https://www.duncanritchie.co.uk/aboutme">more about me</a>).
			But I do use it on a lot of my other pages, including all across this blog.
		</p>
	</dd>
</div>

<div class="used" id="map">
	<dt><code>&lt;map&gt;</code></dt>
	<dd>
		<p>
			As noted above, I’ve used <code>&lt;map&gt;</code> and <code>&lt;area&gt;</code>, but it was several years ago.
		</p>
	</dd>
</div>

<div class="used" id="mark">
	<dt><code>&lt;mark&gt;</code></dt>
	<dd>
		<p>
			The first time I used this was on my <a href="https://www.duncanritchie.co.uk/latinitas-recens">Latinitas Recens mirror</a>, for highlighting the word you searched for in the lexicon entries.
		</p>
	</dd>
</div>

<div class="deprecated" id="marquee">
	<dt><code>&lt;marquee&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			<ins>
				I used this on my <a href="./looping-panorama-effect#commentary">article about animating panoramas</a>, as a bit of a joke.
			</ins>
		</p>
	</dd>
</div>

<div class="usable-unused" id="math">
	<dt><code>&lt;math&gt;</code></dt>
	<dd>
		<p>
			I’ve never used any MathML elements (<a href="https://developer.mozilla.org/en-US/docs/Web/MathML/Element/math">MDN lists several</a>), but if I were marking up complicated maths expressions in HTML, then I would.
		</p>
	</dd>
</div>

<div class="usable-unused" id="menu">
	<dt><code>&lt;menu&gt;</code></dt>
	<dd>
		<p>
			I’ve not used this.
			I prefer to use <code>&lt;ul&gt;</code> for navigation menus.
		</p>
		<p>
			<ins>
				<a href="https://adrianroselli.com/2023/05/be-careful-using-menu.html#HTMLMenu">Adrian Roselli</a> agrees, saying that, because browsers treat <code>&lt;menu&gt;</code> the same as <code>&lt;ul&gt;</code>, you might as well consider <code>&lt;menu&gt;</code> deprecated.
				(However, it isn’t <em>officially</em> deprecated like <code>&lt;menuitem&gt;</code> is.)
			</ins>
		</p>
	</dd>
</div>

<div class="deprecated" id="menuitem">
	<dt><code>&lt;menuitem&gt;</code> (Non-standard Deprecated)</dt>
	<dd>
		<p>
			I’ve never used this; it’s deprecated.
		</p>
	</dd>
</div>

<div class="used" id="meta">
	<dt><code>&lt;meta&gt;</code></dt>
	<dd>
		<p>
			This is an element that there should be at least one of in every <code>&lt;head&gt;</code>.
		</p>
	</dd>
</div>

<div class="used" id="meter">
	<dt><code>&lt;meter&gt;</code></dt>
	<dd>
		<p>
			So far the only time I’ve used this is for the graph at the top of this blogpost, showing the proportion of HTML elements that I would consider using!
		</p>
	</dd>
</div>

<div class="used" id="nav">
	<dt><code>&lt;nav&gt;</code></dt>
	<dd>
		<p>
			I like to get a navigation-menu on pretty much every webpage I make.
			The “<a href="https://www.velut.co.uk/about">About velut</a>” page on my Latin dictionary has two — one for the table of contents (navigating within the page), and the one in the footer for navigating the website.
		</p>
	</dd>
</div>

<div class="deprecated" id="nobr">
	<dt><code>&lt;nobr&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			I’ve never used this; it’s deprecated.
		</p>
	</dd>
</div>

<div class="deprecated" id="noembed">
	<dt><code>&lt;noembed&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			I’ve never used this; it’s deprecated.
		</p>
	</dd>
</div>

<div class="deprecated" id="noframes">
	<dt><code>&lt;noframes&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			I’ve never used this; it’s deprecated.
		</p>
	</dd>
</div>

<div class="used" id="noscript">
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
</div>

<div class="usable-unused" id="object">
	<dt><code>&lt;object&gt;</code></dt>
	<dd>
		<p>
			I’ve never used this.
		</p>
	</dd>
</div>

<div class="used" id="ol">
	<dt><code>&lt;ol&gt;</code></dt>
	<dd>
		<p>
			The good ol’ “list with explicit ordering” element.
			I’ve only used it in Markdown, for instance on my blogposts where I rank <a href="./eurovision-2022">Eurovision entries</a>.
		</p>
	</dd>
</div>

<div class="usable-unused" id="optgroup">
	<dt><code>&lt;optgroup&gt;</code></dt>
	<dd>
		<p>
			I’ve not built dropdown inputs for forms that are complicated enough to need their options to be grouped, so I’ve never used <code>&lt;optgroup&gt;</code>.
		</p>
	</dd>
</div>

<div class="used" id="option">
	<dt><code>&lt;option&gt;</code></dt>
	<dd>
		<p>
			I’ve used this on velut (for the types of rhyme you can search for) and at work.
		</p>
	</dd>
</div>

<div class="used" id="output">
	<dt><code>&lt;output&gt;</code></dt>
	<dd>
		<p>
			The first time I made a form with this element was for my <a href="css-flags">CSS flags</a> article, which was published after I wrote this list.
			I have sliders for controlling the flag animation and I display the value of each slider in an <code>&lt;output&gt;</code> element beside it.
		</p>
	</dd>
</div>

<div class="used" id="p">
	<dt><code>&lt;p&gt;</code></dt>
	<dd>
		<p>
			Yes, I write in paragraphs.
		</p>
	</dd>
</div>

<div class="deprecated" id="param">
	<dt><code>&lt;param&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			I’ve never used this; it’s deprecated.
		</p>
	</dd>
</div>

<div class="used" id="picture">
	<dt><code>&lt;picture&gt;</code></dt>
	<dd>
		<p>
			This is very useful if I want different sizes of an image to load for different sizes of screen — a smaller picture on mobile, larger on desktop, etc.
		</p>
	</dd>
</div>

<div class="deprecated" id="plaintext">
	<dt><code>&lt;plaintext&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			I’ve never used this; it’s deprecated.
		</p>
	</dd>
</div>

<div class="experimental" id="portal">
	<dt><code>&lt;portal&gt;</code> (Experimental)</dt>
	<dd>
		<p>
			I’ve never used this; it’s experimental.
		</p>
	</dd>
</div>

<div class="used" id="pre">
	<dt><code>&lt;pre&gt;</code></dt>
	<dd>
		<p>
			I’m using it on this page (and on other pages) for blocks of code.
		</p>
	</dd>
</div>

<div class="used" id="progress">
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
	</dd>
</div>

<div class="used" id="q">
	<dt><code>&lt;q&gt;</code></dt>
	<dd>
		<p>
			An upcoming blogpost includes <code>&lt;q&gt;</code> elements, because I’m quoting text.
		</p>
	</dd>
</div>

<div class="deprecated" id="rb">
	<dt><code>&lt;rb&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			I’ve not used any of the “Ruby” elements for marking up the pronunciation of East Asian characters — I’ve never worked with Taiwanese writing (etc).
			And this element is deprecated, so that’s another great reason for me not to have used it.
		</p>
	</dd>
</div>

<div class="usable-unused" id="rp">
	<dt><code>&lt;rp&gt;</code></dt>
	<dd>
		<p>
			Another Ruby element.
			Not deprecated, but I’ve still not used it.
		</p>
	</dd>
</div>

<div class="usable-unused" id="rt">
	<dt><code>&lt;rt&gt;</code></dt>
	<dd>
		<p>
			Another Ruby element I’ve not used.
		</p>
	</dd>
</div>

<div class="deprecated" id="rtc">
	<dt><code>&lt;rtc&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			It’s a Ruby element and it’s deprecated.
			That’s a no from me.
		</p>
	</dd>
</div>

<div class="usable-unused" id="ruby">
	<dt><code>&lt;ruby&gt;</code></dt>
	<dd>
		<p>
			This is the element to surround any other Ruby elements and the East Asian characters they explain.
			I’ve not used it.
		</p>
	</dd>
</div>

<div class="used" id="s">
	<dt><code>&lt;s&gt;</code></dt>
	<dd>
		<p>
			I’ve used <code>&lt;del&gt;</code> for text that was on a page because it was relevant when it was written, but is no longer current after an edit.
			<s>I’ve not used <code>&lt;s&gt;</code> (or its obsolete variant <code>&lt;strike&gt;</code>).
			Maybe I should use it in the future.</s>
			Oh look, I’ve just used it now!
		</p>
	</dd>
</div>

<div class="used" id="samp">
	<dt><code>&lt;samp&gt;</code></dt>
	<dd>
		<p>
			I’ve used this on my <a href="./vim">blogpost about Vim</a>.
			I’ve also used it in documentation for some things related to my Latin dictionary, such as my <a href="https://www.duncanritchie.co.uk/velut-word-data-generator">Word Data Generator</a>.
		</p>
	</dd>
</div>

<div class="used" id="script">
	<dt><code>&lt;script&gt;</code></dt>
	<dd>
		<p>
			Of course I’ve used this.
		</p>
	</dd>
</div>

<div class="usable-unused" id="search">
	<dt><code>&lt;search&gt;</code></dt>
	<dd>
		<p>
			This tag was announced in <date datetime="2023-03-24">March 2023</date> and I therefore added it to this article.
			It exists so that the Aria landmark role of <code>search</code> has a corresponding HTML tag, which means it is pretty much equivalent to <code>&lt;div role="search"&gt;</code>.
		</p>
		<p>
			I’ve not used this element.
			On velut, I use <code>&lt;form role="search"&gt;</code>, which gives me native HTML form behaviour and the correct Aria role in one element.
			This is equivalent to wrapping <code>&lt;form&gt;</code> in <code>&lt;search&gt;</code>.
			Swapping the <code>&lt;search&gt;</code> element in is an easy change to make, but there’s not a lot of benefit.
		</p>
	</dd>
</div>

<div class="used" id="section">
	<dt><code>&lt;section&gt;</code></dt>
	<dd>
		<p>
			I’m very fond of this element.
			It’s not used on this blog, but I use it a lot elsewhere.
		</p>
	</dd>
</div>

<div class="used" id="select">
	<dt><code>&lt;select&gt;</code></dt>
	<dd>
		<p>
			It’s the dropdown-menu on the homepage of velut (and on all the word pages on velut too).
		</p>
	</dd>
</div>

<div class="deprecated" id="shadow">
	<dt><code>&lt;shadow&gt;</code> (Non-standard Deprecated)</dt>
	<dd>
		<p>
			I’ve never used this; it’s deprecated.
		</p>
	</dd>
</div>

<div class="used" id="slot">
	<dt><code>&lt;slot&gt;</code></dt>
	<dd>
		<p>
			I like the idea of Web Components.
			JavaScript frameworks like Angular and React* are very popular, but can often be overkill.
			If Web Components can reduce developers’ reliance on such frameworks, that might be cool.
			Unfortunately, they seem like a faff to set up, and they’re such a new thing that I doubt many developers have learnt how to use them.
			I certainly have never made a Web Component, so I’ve never used <code>&lt;slot&gt;</code> inside one.
		</p>
		<p>
			But!
			I converted this blog to use the Astro framework, and that uses <code>&lt;slot&gt;</code> elements.
			So now I have used them.
		</p>
		<aside>
			* I know React is technically a library, not a framework.
			I don’t think many people use it by itself though — it’s often wrapped in something like Create React App or Next.js or Gatsby or whatever.
			That would mean you’re using a framework.
		</aside>
	</dd>
</div>

<div class="used" id="small">
	<dt><code>&lt;small&gt;</code></dt>
	<dd>
		<p>
			DuncanRitchie.co.uk has a <a href="https://www.duncanritchie.co.uk/404">404 page</a> that appears if the URL is mistyped.
			The words “404 error” in the heading are <code>&lt;small&gt;</code>, because it’s technical information that supplements the more layperson-friendly “Page not found” text.
		</p>
	</dd>
</div>

<div class="used" id="source">
	<dt><code>&lt;source&gt;</code></dt>
	<dd>
		<p>
			I’ve used this inside <code>&lt;picture&gt;</code> elements to specify alternative sizes for images.
		</p>
	</dd>
</div>

<div class="deprecated" id="spacer">
	<dt><code>&lt;spacer&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			I didn’t know this element existed (or used to exist), until I wrote this blogpost.
			I’ve never used it; it’s deprecated.
		</p>
	</dd>
</div>

<div class="used" id="span">
	<dt><code>&lt;span&gt;</code></dt>
	<dd>
		<p>
			Yes, I’ve used it frequently.
		</p>
	</dd>
</div>

<div class="deprecated" id="strike">
	<dt><code>&lt;strike&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			I’ve not used it; it’s deprecated.
		</p>
	</dd>
</div>

<div class="used" id="strong">
	<dt><code>&lt;strong&gt;</code></dt>
	<dd>
		<p>
			Why would you use <code>&lt;b&gt;</code> for emphasis when <code>&lt;strong&gt;</code> is <strong>so much better</strong>?!
		</p>
	</dd>
</div>

<div class="used" id="style">
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
	</dd>
</div>

<div class="used" id="sub">
	<dt><code>&lt;sub&gt;</code></dt>
	<dd>
		<p>
			Have I used this in some documentation at work?
			Maybe, maybe not.
			I’m surprised, because expressions like “CO<sub>2</sub>” aren’t exactly obscure.
			There, I’ve used it now.
		</p>
	</dd>
</div>

<div class="used" id="summary">
	<dt><code>&lt;summary&gt;</code></dt>
	<dd>
		<p>
			The “How to use” section of the Advanced Search page on velut is hidden in a <code>&lt;details&gt;</code> element, so you don’t see it until you open the <code>&lt;summary&gt;</code>.
		</p>
	</dd>
</div>

<div class="used" id="sup">
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
</div>

<div class="used" id="svg">
	<dt><code>&lt;svg&gt;</code></dt>
	<dd>
		<p>
			I’m pretty sure that I have used inline SVG in a HTML document, even if it was just in a prototype for work.
			But I’m more likely to have separate SVG files.
		</p>
		<p>
			As with MathML, SVG has its own tags — here’s the <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg">MDN documentation for <code>&lt;svg&gt;</code></a>.
		</p>
	</dd>
</div>

<div class="used" id="table">
	<dt><code>&lt;table&gt;</code></dt>
	<dd>
		<p>
			I don’t write HTML tables very often, but I have done so.
		</p>
	</dd>
</div>

<div class="used" id="tbody">
	<dt><code>&lt;tbody&gt;</code></dt>
	<dd>
		<p>
			I’ve used this at work to wrap the non-header rows of a table.
		</p>
	</dd>
</div>

<div class="used" id="td">
	<dt><code>&lt;td&gt;</code></dt>
	<dd>
		<p>
			Yep, on the rare occasion that I make a HTML table, that table has cells.
		</p>
	</dd>
</div>

<div class="usable-unused" id="template">
	<dt><code>&lt;template&gt;</code></dt>
	<dd>
		<p>
			I’ve never explicitly used a <code>&lt;template&gt;</code> element.
		</p>
	</dd>
</div>

<div class="used" id="textarea">
	<dt><code>&lt;textarea&gt;</code></dt>
	<dd>
		<p>
			Yep, I’ve used it, both at work and on several things related to my Latin dictionary.
		</p>
	</dd>
</div>

<div class="usable-unused" id="tfoot">
	<dt><code>&lt;tfoot&gt;</code></dt>
	<dd>
		<p>
			No, I’ve never made a table with the bottom rows in a special element.
		</p>
	</dd>
</div>

<div class="used" id="th">
	<dt><code>&lt;th&gt;</code></dt>
	<dd>
		<p>
			I only recently learnt that <code>&lt;td&gt;</code> should be replaced with <code>&lt;th&gt;</code> when inside <code>&lt;thead&gt;</code> (or when it’s otherwise a header cell).
			But I have now used it, and written CSS targeting it.
		</p>
	</dd>
</div>

<div class="used" id="thead">
	<dt><code>&lt;thead&gt;</code></dt>
	<dd>
		<p>
			I can’t find or remember where I’ve used a <code>&lt;thead&gt;</code> element, but I’m pretty sure I have.
			I’m counting it.
		</p>
	</dd>
</div>

<div class="used" id="time">
	<dt><code>&lt;time&gt;</code></dt>
	<dd>
		<p>
			I use it on the dates for <a href="https://www.duncanritchie.co.uk/code#velut-projects">code-projects</a> on my website, and for the dates of my posts on this blog.
		</p>
	</dd>
</div>

<div class="used" id="title">
	<dt><code>&lt;title&gt;</code></dt>
	<dd>
		<p>
			Every webpage should have a title.
			Yes, I’ve used it.
		</p>
	</dd>
</div>

<div class="used" id="tr">
	<dt><code>&lt;tr&gt;</code></dt>
	<dd>
		<p>
			Yep, on the rare occasion that I make a HTML table, that table has rows.
		</p>
	</dd>
</div>

<div class="usable-unused" id="track">
	<dt><code>&lt;track&gt;</code></dt>
	<dd>
		<p>
			This would be for specifying subtitles for audio- or video-players.
			I’ve never used <code>&lt;audio&gt;</code> or <code>&lt;video&gt;</code>, so I’ve not used <code>&lt;track&gt;</code> either.
		</p>
	</dd>
</div>

<div class="deprecated" id="tt">
	<dt><code>&lt;tt&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			I’ve not used this; it’s deprecated.
		</p>
	</dd>
</div>

<div class="usable-unused" id="u">
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
	</dd>
</div>

<div class="used" id="ul">
	<dt><code>&lt;ul&gt;</code></dt>
	<dd>
		<p>
			I like to use <code>&lt;ul&gt;</code> inside <code>&lt;nav&gt;</code> for navigation-menus.
		</p>
	</dd>
</div>

<div class="usable-unused" id="var">
	<dt><code>&lt;var&gt;</code></dt>
	<dd>
		<p>
			This is the element for <em>algebraic</em> variables.
			I’ve not used it.
			For variables in computer code, I would use <a href="#code"><code>&lt;code&gt;</code></a>.
		</p>
	</dd>
</div>

<div class="usable-unused" id="video">
	<dt><code>&lt;video&gt;</code></dt>
	<dd>
		<p>
			I’ve not used this.
		</p>
	</dd>
</div>

<div class="used" id="wbr">
	<dt><code>&lt;wbr&gt;</code></dt>
	<dd>
		<p>
			I used this on a <a href="./web-technologies-with-confusing-names">blogpost earlier this year</a>, because I had written some words with slashes between them and I wanted to allow line-breaks after the slashes.
		</p>
	</dd>
</div>

<div class="deprecated" id="xmp">
	<dt><code>&lt;xmp&gt;</code> (Deprecated)</dt>
	<dd>
		<p>
			I’ve never used this; it’s deprecated.
		</p>
	</dd>
</div>

</dl>

<script>
	// Attach event listeners to the filtering buttons.
	const filteringButtons = document.querySelectorAll('button[data-elements-class]')
	filteringButtons.forEach((button) => {
		button.addEventListener('click', (event) => {
			const target = event.target
			const elementsClass = target.dataset.elementsClass
			const elements = document.querySelectorAll(`dl div.${elementsClass}`)

			if (target.getAttribute('aria-pressed') === 'true') {
				elements.forEach(element => {
					element.style.display = 'none'
				})
				target.setAttribute('aria-pressed', 'false')
			}
			else {
				elements.forEach(element => {
					element.style.display = 'block'
				})
				target.setAttribute('aria-pressed', 'true')
			}
		})
	})

	// Converts to percentage (without the % sign) with 1 decimal place.
	// Eg, 0.123 -> 12.3
	function getRoundedPercentage(number) {
		return Math.round(number * 10 * 100) / 10
	}

	// Each <data> element on this page exists to associate a bit of text with its expected value via a key, eg <data value="total">137</data>
	// The `checkTotals` function checks that the expected value of `total` (etc) matches the text content of the <data> element, and logs to the console if there’s a mistake.
	// Similarly, `data-value` and `data-max` values are used on the <meter> and <progress> elements to specify keys for the `value` and `max` attributes.
	// The function also checks that these attributes have the expected values.
	function checkTotals() {
		const list = document.querySelector('dl')
		const usedElements = list.querySelectorAll(`div.used`)
		const usableUnusedElements = list.querySelectorAll(`div.usable-unused`)
		const deprecatedElements = list.querySelectorAll(`div.deprecated`)
		const experimentalElements = list.querySelectorAll(`div.experimental`)
		const allElements = list.children

		if (allElements.length !== usedElements.length + usableUnusedElements.length + deprecatedElements.length + experimentalElements.length) {
			console.warn(`<dl> has ${allElements.length} children, which is not equal to the sum of the counts of used, usable-unused, deprecated, experimental elements.`)
		}

		const expectedValues = {
			'total': allElements.length,
			'used': usedElements.length,
			'usable-unused': usableUnusedElements.length,
			'deprecated': deprecatedElements.length,
			'experimental': experimentalElements.length,
			'usable': usedElements.length + usableUnusedElements.length,
			'usable-percent-of-total':
				getRoundedPercentage(
					(usedElements.length + usableUnusedElements.length)
					/ allElements.length
				),
			'used-percent-of-usable':
				getRoundedPercentage(
					usedElements.length
					/ (usedElements.length + usableUnusedElements.length)
				),
		}

		const textElementsContainingValues = document.querySelectorAll('data')

		textElementsContainingValues.forEach(textElement => {
			const valueKey = textElement.getAttribute('value')
			const valueExpected = expectedValues[valueKey]
			if (valueExpected === undefined) {
				console.warn(`Value attribute of ${valueKey} not recognised`)
			}
			else {
				const valueDisplayed = textElement.textContent
				if (valueDisplayed != valueExpected) {
					console.warn(`Text content is ${valueDisplayed} for ${valueKey} but should be ${valueExpected}`)
				}
			}
		})

		const meterAndProgress = document.querySelectorAll('meter, progress')

		meterAndProgress.forEach(element => {
			const valueKey = element.getAttribute('data-value')
			const valueExpected = expectedValues[valueKey]
			const valueDisplayed = element.getAttribute('value')
			if (valueDisplayed != valueExpected) {
				console.warn(`Value is ${valueDisplayed} for ${element.tagName} but should be ${valueExpected}`)
			}

			const maxKey = element.getAttribute('data-max')
			const maxExpected = expectedValues[maxKey]
			const maxDisplayed = element.getAttribute('max')
			if (maxDisplayed != maxExpected) {
				console.warn(`Max is ${maxDisplayed} for ${element.tagName} but should be ${maxExpected}`)
			}

			const percentageExpected = getRoundedPercentage(valueExpected / maxExpected) + '%'
			const percentageDisplayed = element.style.getPropertyValue('--percentage')
			if (percentageDisplayed !== percentageExpected) {
				console.warn(`--percentage is ${percentageDisplayed} for ${element.tagName} but should be ${percentageExpected}`)
			}
		})
	}
	checkTotals();
</script>
