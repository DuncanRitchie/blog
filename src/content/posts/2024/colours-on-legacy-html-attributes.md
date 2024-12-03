---
date: 2024-12-03
title: Colours on legacy HTML attributes
draft: false
tags: [Funny, Software]
# Note to self: code containing straight quotes needs to be marked up using back-ticks.
# If normal HTML is used (eg <code attr="value">), Astro makes the quotes curly!
# So “colour swatches” are marked up as:
# <span class="colour-swatch" style="--colour: #ffff00;">`#ffff00`</span>
# and not
# <code class="colour-swatch" style="--colour: #ffff00;">#ffff00</code>
---

# Colours on legacy HTML attributes

_In this article, colour codes are preceded by squares in the appropriate colour._

Nowadays, CSS is used to specify what colours to use on elements on a webpage.
The colours can be expressed in various ways, such as:

- a hexadecimal code, <span class="colour-swatch" style="--colour: #ffff00;">`#ffff00`</span>;
- a red-green-blue function, <span class="colour-swatch" style="--colour: rgb(255, 255, 0);">`rgb(255, 255, 0)`</span>;
- a red-green-blue-alpha function, <span class="colour-swatch" style="--colour: rgb(255, 255, 0, 1);">`rgba(255, 255, 0, 1)`</span>;
- a particular colour name, <span class="colour-swatch" style="--colour: yellow;">`yellow`</span>;
- several other colour expressions.

In the early days of HTML, however, before CSS existed or was widely adopted, colours were specified using attributes such as `bgcolor` in the HTML.
Browsers still honour these attributes, so old webpages can be rendered correctly.
Reasonably, they can be any hexadecimal code or colour name allowed in CSS.

However, I’ve just learnt that these legacy attributes (`bgcolor` etc) can also take arbitrary strings that do _not_ represent colours in CSS, but are still converted to colours in the legacy system.
This behaviour has been adopted across browsers.

Of course, devs in 2024 probably should not be using these attributes professionally.
And even if you do need to use them (for compatibility with some really old browser or something), your colour values probably aren’t going to be very weird — you might have <span class="colour-swatch" style="--colour: #e00000;">`bgcolor="e00000"`</span> rather than <span class="colour-swatch" style="--colour: #e00000;">`bgcolor="Hey look at this! I’m red!"`</span>.

But I found it funny that the legacy colours system worked the way it did, and still works, so I thought I’d play around and write about it.

## How the legacy colours work

A table-cell coded as <span class="colour-swatch" style="--colour: green;">`<td bgcolor="green">`</span> will have the same green for its background colour as <span class="colour-swatch" style="--colour: green;">`<td style="background: green">`</span>, because it’s a named colour.

But a table-cell coded as <span class="colour-swatch" style="--colour: #00a000;">`<td bgcolor="some random string">`</span> will have a background colour, though <span class="colour-swatch" style="--colour: transparent;">`<td style="background: some random string">`</span> would not.

(Incidentally the <span class="colour-swatch" style="--colour: #00a000;">`some random string`</span> colour is <span class="colour-swatch" style="--colour: #00a000;">`#00a000`</span>, a slightly brighter green than <span class="colour-swatch" style="--colour: green;">`green`</span> which is <span class="colour-swatch" style="--colour: green;">`#008000`</span>.)

Essentially what happens when the browser sees the attribute is it tries to match it to a CSS named colour (eg, <span class="colour-swatch" style="--colour: green;">`green`</span> or <span class="colour-swatch" style="--colour: deepskyblue;">`deepskyblue`</span> or <span class="colour-swatch" style="--colour: rebeccapurple;">`rebeccapurple`</span>).
If that fails, it tries to make a hexadecimal code out of the value.

Characters other than `0123456789abcdef` (not case-sensitive) are replaced with `0`.
Extra `0`s are appended if needed for the string length to be a multiple of three.
The string is split into three for the red/green/blue channels.
To make each channel into two digits, a leading zero may be added to each channel, then excess leading zeroes are discarded from each channel, then excess characters are discarded from the end of each channel.

So a value like <span class="colour-swatch" style="--colour: #d00ca0;">`Duncan`</span> gets interpreted as <span class="colour-swatch" style="--colour: #d00ca0;">`#d00ca0`</span> and rendered a deep pink.
A value like <span class="colour-swatch" style="--colour: #d000c0;">`Duncan Ritchie`</span> becomes `d00ca00000c00e` and then `d00ca 00000 c00e0` and then <span class="colour-swatch" style="--colour: #d000c0;">`#d000c0`</span>, which is a slightly bluer deep pink.

More details are on this [Stack Overflow thread](https://stackoverflow.com/questions/8318911/why-does-html-think-chucknorris-is-a-color), which links to this [blogpost by some-one called Sam](http://scrappy-do.blogspot.com/2004/08/little-rant-about-microsoft-internet.html).

Apparently the source-code for WebKit browsers contains a function <code>parseColorString<wbr/>With<wbr/>CrazyLegacyRules</code> to handle this.
I can see why the rules might get called crazy!
But I love ’em because they mean I can write this article.

## Three-digit values

Another effect of the rules is that three-digit values are treated differently in the legacy system than in CSS.
In the old system `bgcolor="639"` means <span class="colour-swatch" style="--colour: #060309;">`#060309`</span> (a slightly purplish black), but `bgcolor="#639"` (or `#639` anywhere in CSS) means <span class="colour-swatch" style="--colour: #663399;">`#663399`</span> (a nice mid purple also known as <span class="colour-swatch" style="--colour: rebeccapurple;">`rebeccapurple`</span>).

The single digit for each red/green/blue channel represents that digit out of 255 in the legacy system, but represents a duplicated digit in CSS.

### Tangent about <span class="colour-swatch" style="--colour: rebeccapurple;">`rebeccapurple`</span>

For those that don’t know, <span class="colour-swatch" style="--colour: rebeccapurple;">`rebeccapurple`</span> is the only CSS named colour that wasn’t copied from lists of colour names in earlier technologies.
It was added to the web standards in 2014 as a tribute to Rebecca Meyer, who loved the colour purple and died of brain cancer on her sixth birthday.
Her father [Eric Meyer](https://meyerweb.com/) has been a major figure in CSS for decades, often blogging about web technology; [his articles about Rebecca](https://meyerweb.com/eric/thoughts/category/personal/rebecca/) are also well worth reading, if you want to cry a lot.

<!-- SVG code copied from https://github.com/CSS-Next/logo.css/blob/main/css.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 1000 1000" role="img" aria-labelledby="css-logo-title css-logo-description" class="float-right">
  <title id="css-logo-title">CSS Logo</title>
  <desc id="css-logo-description">A purple square with rounded corners and the letters CSS inside in white</desc>
  <path fill="#639" d="M0 0H840A160 160 0 0 1 1000 160V840A160 160 0 0 1 840 1000H160A160 160 0 0 1 0 840V0Z"/>
  <path fill="#fff" d="M253 817V649c0-67 43-103 108-103 64-1 104 41 102 112h-74c2-27-10-47-30-46-25 0-32 17-32 49v146c0 31 10 46 32 47 23 0 32-23 30-49h74c4 73-42 116-107 115-63 0-103-35-103-103Zm237-12h69c1 32 11 52 33 52s30-13 30-43c0-25-11-39-38-52l-26-12c-46-22-65-49-65-103 0-60 38-102 100-102s95 43 96 113h-67c0-29-6-49-28-49-20 0-30 10-30 35s9 35 33 45l24 11c51 24 73 55 73 113 0 69-39 107-103 107s-100-44-101-115Zm226 0h70c0 32 11 52 32 52s30-13 30-43c0-25-10-39-38-52l-26-12c-46-22-64-49-64-103 0-60 37-102 100-102s94 43 96 113h-67c-1-29-7-49-29-49-20 0-29 10-29 35s8 35 32 45l25 11c50 24 72 55 72 113 0 69-39 107-103 107s-100-44-101-115Z"/>
</svg>

A couple of weeks ago, CSS officially [adopted a logo](https://nerdy.dev/a-community-css-logo) in the colour <span class="colour-swatch" style="--colour: rebeccapurple;">`rebeccapurple`</span>.
Of the main web languages, I’d say CSS is the most personal — it’s not so much about raw functionality as it is about giving user-interfaces a human touch, to make visiting a site (or using an app) more delightful — less for machines than for _people_.
So a backstory as sentimental as <span class="colour-swatch" style="--colour: #663399;">`#663399`</span>’s is a great fit for a CSS logo.
It’s about the CSS community caring about people.

(Sorry if my prose is a bit purple; I’m genuinely proud of the software profession here.
It’s a lovely legacy for the Meyers to have, in addition to Eric’s work on web standards.)

## Playground comparing legacy to CSS

Let’s get back to the legacy of the old HTML attributes.

Wanna play around with the colour rules?
Here’s a field that you can enter text into.
Underneath is a table whose cells will change their background colour to match.
The left cell uses the legacy `bgcolor` attribute; the right cell uses modern CSS (with a `#` inserted if needed).

A cell will be transparent (<span class="colour-swatch" style="--colour: transparent;">`#00000000`</span>) if the value cannot be interpreted.
If the colour is dark, hover over the cell to see the text better (it’ll turn white).

<label>
<span>Background colour:</span>
<input type="text" id="legacy-and-css-input" />
</label>

<div>
<table id="legacy-and-css">
<tbody>
<tr>
<td id="legacy-cell">

`bgcolor=""`

Background colour is:

</td>

<td id="css-cell">

`style="background: #"`

Background colour is:

</td>
</tr>
</tbody>
</table>
</div>

## Playground for comparing many legacy values

Type several words into this field (or paste a load of text!), and cells will be generated with `bgcolor` matching each word.

By using (or abusing) CSS `display` properties, I’ve made the cells able to fill each line and wrap onto new lines.
(I would have used regular `<div>`s for this, but `<div>`s cannot have `bgcolor`.)

I also have preset texts that you can use:

- the list of named colours in CSS;
- the [Oxford 3000](https://www.oxfordlearnersdictionaries.com/wordlists/oxford3000-5000) (Oxford Dictionaries’ list of words most useful to English learners), sorted by word-length;
- this page’s own text; and,
- all six-letter strings containing letters `a`,`f`, or `i` because the colours are pretty.

<label>
Enter your words here:
<textarea id="colours-input"></textarea>
</label>

<div class="buttons">
	<button type="button" onclick="setColoursText('')">Clear</button>
	<button type="button" onclick="setColoursText(namedColours)">Set to CSS colours</button>
	<button type="button" onclick="setColoursText(oxford3000Sorted)">Set to Oxford 3000</button>
	<button type="button" onclick="setColoursText(textContentOfPage)">Set to this page’s text</button>
	<button type="button" onclick="setColoursText(combinationsOfAFI)">Set to a,f,i combinations</button>
	<button type="button" onclick="sortColoursTextByLightness()">Sort by lightness</button>
</div>

<div>
	<table id="colours-table"></table>
</div>

## More examples

The strings <span class="colour-swatch" style="--colour: #00a000;">`grass`</span>, <span class="colour-swatch" style="--colour: #0eaf00;">`leaf`</span>, <span class="colour-swatch" style="--colour: #00ac00;">`pistachio`</span>, <span class="colour-swatch" style="--colour: #0eed00;">`weed`</span>, <span class="colour-swatch" style="--colour: #0ea000;">`health`</span>, <span class="colour-swatch" style="--colour: #00e000;">`strength`</span> all produce green colours.
The strings <span class="colour-swatch" style="--colour: #ce000e;">`cerise`</span>, <span class="colour-swatch" style="--colour: #ca0e00;">`scarlet`</span>, <span class="colour-swatch" style="--colour: #e00000;">`vermilion`</span>, <span class="colour-swatch" style="--colour: #da0e00;">`dangerous`</span>, <span class="colour-swatch" style="--colour: #a00000;">`warning`</span>, and <span class="colour-swatch" style="--colour: #ea0e00;">`weakness`</span> produce red.

<span class="colour-swatch" style="--colour: #ea0000;">`Healthy`</span> and <span class="colour-swatch" style="--colour: #00ea00;">`unhealthy`</span> are red and green, but the opposite way round to how people (at least in the West) see red as bad and green as good.
(The addition of `un` shifts the `ea` from the red channel to the green, so <span class="colour-swatch" style="--colour: #ea0000;">`#ea0000`</span> and <span class="colour-swatch" style="--colour: #00ea00;">`#00ea00`</span> are the hex codes.)

<span class="colour-swatch" style="--colour: #eaed0c;">`Coldplay song that reached Number 4 in the United Kingdom and Number 1 in Iceland`</span> is Yellow.<br/>
<span class="colour-swatch" style="--colour: #a000a0;">`Raise Your Glass`</span>, <span class="colour-swatch" style="--colour: #b000e0;">`Blow Me`</span>, and <span class="colour-swatch" style="--colour: #e0a0ce;">`Never Gonna Not Dance Again`</span> are Pink.<br/>
<span class="colour-swatch" style="--colour: #0e00e0;">`One Love`</span>, <span class="colour-swatch" style="--colour: #0000e0;">`Hurt Lovers`</span>, and <span class="colour-swatch" style="--colour: #0f0cba;">`If You Come Back`</span> are Blue.

The Iliad and Odyssey famously do not call the sea “blue”, but rather [“wine-dark”](https://en.wikipedia.org/wiki/Wine-dark_sea), several times.
What do they mean by this?
How can the sea be wine-dark?
Well, <span class="colour-swatch" style="--colour: #00e0a0;">`wine-dark`</span> comes out as a fairly sensible (albeit bright) turquoise, and <span class="colour-swatch" style="--colour: #000fed;">`wine-faced`</span> (a more literal translation) is even bluer.
But maybe I should be using the Greek, <span class="colour-swatch" style="--colour: #000;" lang="grc">`οἶνοψ`</span>, which of course comes out as black because it has no Latin characters.
But it’s certainly a dark colour!

## Conclusion

Is this article of much practical benefit?
Not unless you’re debugging HTML code from the ’90s.

But it’s been fun for me to look into this legacy colour system from the early years of the internet.
It’s nice to be reminded of a particular shade of purple, which really was intended to be a legacy (and not just some Netscape engineers getting over-excited with what strings they can parse into colours).
And I hope it was entertaining for you seeing what colours you can get out of this webpage’s playgrounds!

<script>
	//
	// DOM ELEMENTS
	//
	const legacyAndCssInput = document.getElementById('legacy-and-css-input')
	const legacyCell = document.getElementById('legacy-cell')
	const cssCell = document.getElementById('css-cell')

	const coloursInput = document.getElementById('colours-input')
	const coloursTable = document.getElementById('colours-table')

	// Insert a colour swatch into the “This article was written…” <aside> text, just for the hell of it.
	const authorCredit = document.querySelector('aside p')
	authorCredit.innerHTML = authorCredit.innerHTML.replace('Duncan Ritchie', '<span class="colour-swatch" style="--colour: #d000c0;">Duncan Ritchie</span>')

	//
	// EVENT LISTENERS ON INPUTS
	// (buttons have onClick attributes)
	//
	legacyAndCssInput.addEventListener('input', handleLegacyAndCss)
	legacyAndCssInput.addEventListener('blur', handleLegacyAndCss)

	coloursInput.addEventListener('input', handleColoursTable)
	coloursInput.addEventListener('blur', handleColoursTable)

	//
	// FUNCTIONS
	//

	// Converts rgb(102, 51, 153) to #663399
	// Inspired by https://stackoverflow.com/a/5624139
	function rgbToHex(rgbString) {
		function channelToHex(channel) {
			const asNumber = parseInt(channel) || 0
			const hex = asNumber.toString(16)
			return hex.length === 1 ? '0' + hex : hex
		}
		// Delete the opening bracket and anything preceding it, then split on the commas.
		const channels = rgbString.replace(/.+\(/, '').split(',')
		// The channels correspond to red, green, blue, & optionally alpha.
		if (channels.length < 3 || channels.length > 4) {
			console.error('channels.length should be 3 or 4', {rgbChannels})
			return 
		}
		// If alpha is present, it’s in range 0–1 and needs to be multiplied by 255 for `channelToHex`.
		if (channels.length === 4) {
			channels[3] = parseInt(channels[4]) * 255
		}
		return `#${channels.map(channelToHex).join('')}`
	}
	
	function handleLegacyAndCss(event) {
		const value = event.target.value.replaceAll(/[<>"]/g, '')
		legacyCell.setAttribute('bgcolor', value)

		const newLegacyColour = window.getComputedStyle(legacyCell).getPropertyValue('background-color')
		legacyCell.innerHTML = `<p><code>bgcolor="${value}"</code></p><p>Background colour is: <code>${rgbToHex(newLegacyColour)}</code> / <code>${newLegacyColour}</code></p>`

		// Prefix the colour with # if it’s a 
		const isHashNeeded = !value.startsWith('#') && /(^([0-9a-f]{3}){1,2}$)|(^([0-9a-f]{4}){1,2}$)/i.test(value)
		const cssStyle = isHashNeeded ? 'background: #' + value : 'background: ' + value
		cssCell.setAttribute('style', cssStyle)

		const newCssColour = window.getComputedStyle(cssCell).getPropertyValue('background-color')
		cssCell.innerHTML = `<p><code>style="${cssStyle}"</code></p><p>Background colour is: <code>${rgbToHex(newCssColour)}</code> / <code>${newCssColour}</code></p>`
	}

	function handleColoursTable(event) {
		const target = event?.target ?? coloursInput
		const words = target.value.replaceAll(/[<>"]/g, '').split(/\s/).filter(Boolean)

		coloursTable.innerHTML = 
			`<tbody><tr>`
			+ words
			.map(word => `<td bgcolor="${word}">${word}</td>`)
			.join("")
			+ `</tr><tbody>`;
	}

	function setColoursText(newText) {
		coloursInput.value = newText
		handleColoursTable()
	}

	// This should be passed into .sort() or .toSorted(), to sort the array from light colours to dark.
	function comparatorByAverageColourChannel(a, b) {
		// If an array represents transparent, it should be sorted to the end of the array.
		// We can detect it by its alpha channel, [3], being present and equal to zero.
		if (a[1][3] === 0) return 1
		if (b[1][3] === 0) return -1
		// This doesn’t take human perception into account, but it’s good enough.
		const aChannelsSum = a[1][0] + a[1][1] + a[1][2]
		const bChannelsSum = b[1][0] + b[1][1] + b[1][2]
		return bChannelsSum - aChannelsSum
	}

	function sortColoursTextByLightness() {
		const oldColours = coloursInput.value.split(/\s+/).filter(Boolean)
		const sorted = oldColours.map(colour => [colour, textToRGBArray(colour)]).toSorted(comparatorByAverageColourChannel).map(a => (console.log(a[0], a[1]), a[0]))
		setColoursText(sorted.join(' '))
	}

	// Eg 'blue' => 'rgb(0, 0, 255)' or 'bleu' => 'rgb(176, 224, 0)'
	function textToRGB(text) {
		// Create a new element with `bgcolor` attribute.
		const newCell = document.createElement('TD')
		newCell.bgColor = text
		document.body.append(newCell)
		// Query its background colour.
		const newCssColour = window.getComputedStyle(newCell).getPropertyValue('background-color')
		// Clean up.
		newCell.remove()
		// Return the colour.
		return newCssColour
	}

	function textToRGBArray(text) {
		const rgbString = textToRGB(text)
		const channels = rgbString.replace(/.+\(/, '').split(',')
		return channels.map(channel => parseInt(channel))
	}

	// Eg 'blue' => '#0000ff' or 'bleu' => 'b0e000'
	function textToHex(text) {
		return rgbToHex(textToRGB(text))
	}

	//
	// PRESET TEXTS FOR COLOURS TEXTAREA
	//

	const textContentOfScript = document.querySelector('body main script').textContent
	const textContentOfPage = document.body.textContent.replace(textContentOfScript, '').replaceAll('<', '').replaceAll('>', '')

	// This is all possible six-letter strings made of the letters a,f,i.
	// It works by generating base-3 numbers (from 000000 to 222222) and replacing the digits with the letters.
	const combinationsOfAFI = Array(3**6).fill(0).map((_, i) => {
		return i.toString(3).padStart(6, '0').replaceAll('0','i').replaceAll('1','a').replaceAll('2','f')
	}).join(' ')

	// Taken from MDN.
	const namedColours = `aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan darkblue darkcyan darkgoldenrod darkgray darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen darkslateblue darkslategray darkslategrey darkturquoise darkviolet deeppink deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen fuchsia gainsboro ghostwhite gold goldenrod gray green greenyellow grey honeydew hotpink indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen lightskyblue lightslategray lightslategrey lightsteelblue lightyellow lime limegreen linen magenta maroon mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin navajowhite navy oldlace olive olivedrab orange orangered orchid palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru pink plum powderblue purple rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown seagreen seashell sienna silver skyblue slateblue slategray slategrey snow springgreen steelblue tan teal thistle tomato transparent turquoise violet wheat white whitesmoke yellow yellowgreen`

	// Taken from https://www.oxfordlearnersdictionaries.com/external/pdf/wordlists/oxford-3000-5000/The_Oxford_3000.pdf (via https://www.oxfordlearnersdictionaries.com/wordlists/oxford3000-5000)
	// Words have been de-duplicated (without case-sensitivity, so only one of “May”/“may” survives) and any numbers removed.
	const oxford3000 = `a abandon ability able about above abroad absolute absolutely academic accept acceptable access accident accommodation accompany according account accurate accuse achieve achievement acknowledge acquire across act action active activity actor actress actual actually ad adapt add addition additional address administration admire admit adopt adult advance advanced advantage adventure advertise advertisement advertising advice advise affair affect afford afraid after afternoon afterwards again against age aged agency agenda agent aggressive ago agree agreement ah ahead aid aim air aircraft airline airport alarm album alcohol alcoholic alive all allow almost alone along already also alter alternative although always amazed amazing ambition ambitious among amount an analyse analysis ancient and anger angle angry animal ankle anniversary announce announcement annoy annoyed annoying annual another answer anxious any anybody any anyone anything anyway anywhere apart apartment apologize app apparent apparently appeal appear appearance apple application apply appointment appreciate approach appropriate approval approve approximately April architect architecture area argue argument arise arm armed arms army around arrange arrangement arrest arrival arrive art article artificial artist artistic as ashamed ask asleep aspect assess assessment assignment assist assistant associate associated association assume at athlete atmosphere attach attack attempt attend attention attitude attract attraction attractive audience August aunt author authority autumn available average avoid award aware away awful baby back background backwards bacteria bad badly bag bake balance ball ban banana band bank bar barrier base baseball based basic basically basis basketball bath bathroom battery battle be beach bean bear beat beautiful beauty because become bed bedroom bee beef beer before beg begin beginning behave behaviour behind being belief believe bell belong below belt bend benefit bent best bet better between beyond bicycle big bike bill billion bin biology bird birth birthday biscuit bit bite bitter black blame blank blind block blog blonde blood blow blue board boat body boil bomb bond bone book boot border bored boring born borrow boss both bother bottle bottom bowl box boy boyfriend brain branch brand brave bread break breakfast breast breath breathe breathing bride bridge brief bright brilliant bring broad broadcast broken brother brown brush bubble budget build building bullet bunch burn bury bus bush business businessman busy but butter button buy by bye cable cafe cake calculate call calm camera camp campaign camping campus can cancel cancer candidate cannot cap capable capacity capital captain capture car card care career careful carefully careless carpet carrot carry cartoon case cash cast castle cat catch category cause CD ceiling celebrate celebration celebrity cell cent central centre century ceremony certain certainly chain chair chairman challenge champion chance change channel chapter character characteristic charge charity chart chat cheap cheat check cheerful cheese chef chemical chemistry chest chicken chief child childhood chip chocolate choice choose church cigarette cinema circle circumstance cite citizen city civil claim class classic classical classroom clause clean clear clearly clever click client climate climb clock close closed closely cloth clothes clothing cloud club clue coach coal coast coat code coffee coin cold collapse colleague collect collection college colour coloured column combination combine come comedy comfort comfortable command comment commercial commission commit commitment committee common commonly communicate communication community company compare comparison compete competition competitive competitor complain complaint complete completely complex complicated component computer concentrate concentration concept concern concerned concert conclude conclusion condition conduct conference confidence confident confirm conflict confuse confused confusing connect connected connection conscious consequence conservative consider consideration consist consistent constant constantly construct construction consume consumer contact contain container contemporary content contest context continent continue continuous contract contrast contribute contribution control convenient conversation convert convince convinced cook cooker cooking cool copy core corner corporate correct correctly cost costume cottage cotton could council count country countryside county couple courage course court cousin cover covered cow crash crazy cream create creation creative creature credit crew crime criminal crisis criterion critic critical criticism criticize crop cross crowd crowded crucial cruel cry cultural culture cup cupboard cure curly currency current currently curtain curve curved custom customer cut cycle dad daily damage dance dancer dancing danger dangerous dark data date daughter day dead deal dear death debate debt decade December decent decide decision declare decline decorate decoration decrease deep deeply defeat defence defend define definite definitely definition degree delay deliberate deliberately delicious delight delighted deliver delivery demand demonstrate dentist deny department departure depend depressed depressing depth describe description desert deserve design designer desire desk desperate despite destination destroy detail detailed detect detective determine determined develop development device diagram dialogue diamond diary dictionary die diet difference different differently difficult difficulty dig digital dinner direct direction directly director dirt dirty disadvantage disagree disappear disappointed disappointing disaster disc discipline discount discover discovery discuss discussion disease dish dishonest dislike dismiss display distance distribute distribution district divide division divorced do doctor document documentary dog dollar domestic dominate donate door double doubt down download downstairs downwards dozen draft drag drama dramatic draw drawing dream dress dressed drink drive driver driving drop drug drum drunk dry due during dust duty DVD each ear early earn earth earthquake easily east eastern easy eat economic economy edge edit edition editor educate educated education educational effect effective effectively efficient effort egg eight eighteen eighty either elderly elect election electric electrical electricity electronic element elephant eleven else elsewhere email embarrassed embarrassing emerge emergency emotion emotional emphasis emphasize employ employee employer employment empty enable encounter encourage end ending enemy energy engage engaged engine engineer engineering enhance enjoy enormous enough enquiry ensure enter entertain entertainment enthusiasm enthusiastic entire entirely entrance entry environment environmental episode equal equally equipment error escape especially essay essential establish estate estimate ethical euro evaluate even evening event eventually ever every everybody everyday everyone everything everywhere evidence evil exact exactly exam examination examine example excellent except exchange excited excitement exciting excuse executive exercise exhibition exist existence expand expect expectation expected expedition expense expensive experience experienced experiment expert explain explanation explode exploration explore explosion export expose express expression extend extent external extra extraordinary extreme extremely eye face facility fact factor factory fail failure fair fairly faith fall false familiar family famous fan fancy fantastic far farm farmer farming fascinating fashion fashionable fast fasten fat father fault favour favourite fear feather feature February fee feed feedback feel feeling fellow female fence festival few fiction field fifteen fifth fifty fight fighting figure file fill film final finally finance financial find finding fine finger finish fire firm first firstly fish fishing fit fitness five fix fixed flag flame flash flat flexible flight float flood floor flour flow flower flu fly flying focus fold folding folk follow following food foot football for force foreign forest forever forget forgive fork form formal former fortunately fortune forty forward found four fourteen fourth frame free freedom freeze frequency frequently fresh Friday fridge friend friendly friendship frighten frightened frightening frog from front frozen fruit fry fuel full fully fun function fund fundamental funding funny fur furniture further furthermore future gain gallery game gang gap garage garden gas gate gather general generally generate generation generous genre gentle gentleman geography get ghost giant gift girl girlfriend give glad glass global glove go goal god gold golf good goodbye goods govern government grab grade gradually graduate grain grand grandfather grandmother grandparent grant grass grateful great green greet grey ground group grow growth guarantee guard guess guest guide guilty guitar gun guy gym habit hair half hall hand handle hang happen happily happiness happy hard hardly harm harmful hat hate have he head headache headline health healthy hear hearing heart heat heating heaven heavily heavy heel height helicopter hell hello help helpful her here hero hers herself hesitate hey hi hide high highlight highly hill him himself hire his historic historical history hit hobby hockey hold hole holiday hollow holy home homework honest honour hope horrible horror horse hospital host hot hotel hour house household housing how however huge human humorous humour hundred hungry hunt hunting hurricane hurry hurt husband I ice idea ideal identify identity if ignore ill illegal illness illustrate illustration image imaginary imagination imagine immediate immediately immigrant impact impatient imply import importance important impose impossible impress impressed impression impressive improve improvement in inch incident include included including income increase increasingly incredible incredibly indeed independent indicate indirect individual indoor indoors industrial industry infection influence inform informal information ingredient initial initially initiative injure injured injury inner innocent insect inside insight insist inspire install instance instead institute institution instruction instructor instrument insurance intelligence intelligent intend intended intense intention interest interested interesting internal international internet interpret interrupt interview into introduce introduction invent invention invest investigate investigation investment invitation invite involve involved iron island issue it item its itself jacket jam January jazz jeans jewellery job join joke journal journalist journey joy judge judgement juice July jump June junior just justice justify keen keep key keyboard kick kid kill killing kilometre kind king kiss kitchen knee knife knock know knowledge lab label laboratory labour lack lady lake lamp land landscape language laptop large largely last late later latest laugh laughter launch law lawyer lay layer lazy lead leader leadership leading leaf league lean learn learning least leather leave lecture left leg legal leisure lemon lend length less lesson let letter level library licence lie life lifestyle lift light like likely limit limited line link lion lip liquid list listen listener literature little live lively living load loan local locate located location lock logical lonely long long-term look loose lord lorry lose loss lost lot loud loudly love lovely low lower luck lucky lunch lung luxury machine mad magazine magic mail main mainly maintain major majority make male mall man manage management manager manner many map March mark market marketing marriage married marry mass massive master match matching material mathematics maths matter maximum may maybe me meal mean meaning means meanwhile measure measurement meat media medical medicine medium meet meeting melt member memory mental mention menu mess message metal method metre middle midnight might mild mile military milk million mind mine mineral minimum minister minor minority minute mirror miss missing mission mistake mix mixed mixture mobile model modern modify moment Monday money monitor monkey month mood moon moral more morning most mostly mother motor motorcycle mount mountain mouse mouth move movement movie much mud multiple multiply mum murder muscle museum music musical musician must my myself mysterious mystery nail name narrative narrow nation national native natural naturally nature near nearly neat necessarily necessary neck need needle negative neighbour neighbourhood neither nerve nervous net network never nevertheless new news newspaper next nice night nightmare nine nineteen ninety no nobody noise noisy none nor normal normally north northern nose not note nothing notice notion novel November now nowhere nuclear number numerous nurse nut obey object objective obligation observation observe obtain obvious obviously occasion occasionally occur ocean o’clock October odd of off offence offend offensive offer office officer official often oh oil OK old old-fashioned on once one onion online only onto open opening operate operation opinion opponent opportunity oppose opposed opposite opposition option or orange order ordinary organ organization organize organized organizer origin original originally other otherwise ought our ours ourselves out outcome outdoor outdoors outer outline outside oven over overall owe own owner pace pack package page pain painful paint painter painting pair palace pale pan panel pants paper paragraph parent park parking parliament part participant participate particular particularly partly partner party pass passage passenger passion passport past path patient pattern pay payment peace peaceful pen pencil penny pension people pepper per percentage perfect perfectly perform performance perhaps period permanent permission permit person personal personality personally perspective persuade pet petrol phase phenomenon philosophy phone photo photograph photographer photography phrase physical physics piano pick picture piece pig pile pilot pin pink pipe pitch place plain plan plane planet planning plant plastic plate platform play player pleasant please pleased pleasure plenty plot plus pocket poem poet poetry point pointed poison poisonous police policeman policy polite political politician politics pollution pool poor pop popular popularity population port portrait pose position positive possess possession possibility possible possibly post poster pot potato potential pound pour poverty powder power powerful practical practice practise praise pray prayer predict prediction prefer pregnant preparation prepare prepared presence present presentation preserve president press pressure pretend pretty prevent previous previously price priest primary prime prince princess principle print printer printing priority prison prisoner privacy private prize probably problem procedure process produce producer product production profession professional professor profile profit program programme progress project promise promote pronounce proof proper properly property proposal propose prospect protect protection protest proud prove provide psychologist psychology pub public publication publish pull punish punishment pupil purchase pure purple purpose pursue push put qualification qualified qualify quality quantity quarter queen question queue quick quickly quiet quietly quit quite quotation quote race racing radio railway rain raise range rank rapid rapidly rare rarely rate rather raw reach react reaction read reader reading ready real realistic reality realize really reason reasonable recall receipt receive recent recently reception recipe recognize recommend recommendation record recording recover recycle red reduce reduction refer reference reflect refuse regard region regional register regret regular regularly regulation reject relate related relation relationship relative relatively relax relaxed relaxing release relevant reliable relief religion religious rely remain remark remember remind remote remove rent repair repeat repeated replace reply report reporter represent representative reputation request require requirement rescue research researcher reservation reserve resident resist resolve resort resource respect respond response responsibility responsible rest restaurant result retain retire retired return reveal review revise revolution reward rhythm rice rich rid ride right ring rise risk river road robot rock role roll romantic roof room root rope rough round route routine row royal rub rubber rubbish rude rugby rule run runner running rural rush sad sadly safe safety sail sailing sailor salad salary sale salt same sample sand sandwich satellite satisfied satisfy Saturday sauce save saving say scale scan scared scary scene schedule scheme school science scientific scientist score scream screen script sculpture sea search season seat second secondary secondly secret secretary section sector secure security see seed seek seem select selection self sell send senior sense sensible sensitive sentence separate September sequence series serious seriously servant serve service session set setting settle seven seventeen seventy several severe sex sexual shade shadow shake shall shallow shame shape share sharp she sheep sheet shelf shell shelter shift shine shiny ship shirt shock shocked shoe shoot shooting shop shopping short shot should shoulder shout show shower shut shy sick side sight sign signal significant significantly silence silent silk silly silver similar similarity similarly simple simply since sincere sing singer singing single sink sir sister sit site situation six sixteen sixty size ski skiing skill skin skirt sky slave sleep slice slide slight slightly slip slope slow slowly small smart smartphone smell smile smoke smoking smooth snake snow so soap soccer social society sock soft software soil solar soldier solid solution solve some somebody someone something sometimes somewhat somewhere son song soon sorry sort soul sound soup source south southern space speak speaker special specialist species specific specifically speech speed spell spelling spend spending spicy spider spirit spiritual split spoken sponsor spoon sport spot spread spring square stable stadium staff stage stair stamp stand standard star stare start state statement station statistic statue status stay steady steal steel steep step stick sticky stiff still stock stomach stone stop store storm story straight strange stranger strategy stream street strength stress stretch strict strike string strong strongly structure struggle student studio study stuff stupid style subject submit substance succeed success successful successfully such sudden suddenly suffer sugar suggest suggestion suit suitable sum summarize summary summer sun Sunday supermarket supply support supporter suppose sure surely surface surgery surprise surprised surprising surround surrounding survey survive suspect swear sweater sweep sweet swim swimming switch symbol sympathy symptom system table tablet tail take tale talent talented talk tall tank tape target task taste tax taxi tea teach teacher teaching team tear technical technique technology teenage teenager telephone television tell temperature temporary ten tend tennis tent term terrible test text than thank thanks that the theatre their theirs them theme themselves then theory therapy there therefore they thick thief thin thing think thinking third thirsty thirteen thirty this though thought thousand threat threaten three throat through throughout throw Thursday thus ticket tidy tie tight till time tin tiny tip tired title to today toe together toilet tomato tomorrow tone tongue tonight too tool tooth top topic total totally touch tough tour tourism tourist towards towel tower town toy track trade tradition traditional traffic train trainer training transfer transform transition translate translation transport travel traveller treat treatment tree trend trial trick trip tropical trouble trousers truck true truly trust truth try T-shirt tube Tuesday tune tunnel turn TV twelve twenty twice twin two type typical typically tyre ugly ultimately umbrella unable uncle uncomfortable unconscious under underground understand understanding underwear unemployed unemployment unexpected unfair unfortunately unhappy uniform union unique unit united universe university unknown unless unlike unlikely unnecessary unpleasant until unusual up update upon upper upset upstairs upwards urban urge us use used used useful user usual usually vacation valley valuable value van variety various vary vast vegetable vehicle venue version very via victim victory video view viewer village violence violent virtual virus vision visit visitor visual vital vitamin voice volume volunteer vote wage wait waiter wake walk wall want war warm warn warning wash washing waste watch water wave way we weak weakness wealth wealthy weapon wear weather web website wedding Wednesday week weekend weigh weight welcome well west western wet what whatever wheel when whenever where whereas wherever whether which while whisper white who whole whom whose why wide widely wife wild wildlife will willing win wind window wine wing winner winter wire wise wish with within without witness woman wonder wonderful wood wooden wool word work worker working world worldwide worried worry worse worst worth would wound wow wrap write writer writing written wrong yard yeah year yellow yes yesterday yet you young your yours yourself youth zero zone`
	
	const oxford3000Sorted = oxford3000.split(' ').toSorted((a,b) => a.length - b.length).join(' ')
</script>

<style>
	.colour-swatch {
		margin-left: 0.0625em;
		/* Swatch should stay on the same line as the <code>, but <code> itself can wrap. */
		white-space: nowrap;
	}
	.colour-swatch code {
		white-space: normal;
	}
	.colour-swatch::before {
		content: '';
		display: inline-block;
		background: var(--colour);
		width: 1em;
		height: 1em;
		vertical-align: -0.1625em;
		box-shadow: inset 0 -1px 2px 0 black;
	}
	@supports (width: 1cap) {
		.colour-swatch::before {
			width: 1cap;
			height: 1cap;
			vertical-align: -0.025cap;
		}
	}

	div:has(table) {
		overflow-x: auto;
	}
	table {
		width: 100%;
		margin-top: 1rem;
	}
	td:hover {
		color: white;
	}

	label:has(input) {
		width: 100%;
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}
	input {
		padding: 0.25em 0.5em;
		flex-grow: 1
	}

	#legacy-and-css td {
		width: 50%;
	}

	#colours-table tbody {
		display: flex;
		flex-wrap: wrap;
	}
	#colours-table tr {
		display: contents;
	}
	#colours-table td {
		display: block;
		flex-grow: 1;
		text-align: center;
	}

	.buttons {
		flex-wrap: wrap;
	}
</style>
