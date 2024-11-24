---
date: 2024-11-24
title: Header-cells and hover styles on my verb tables on velut
draft: false
tags: [Software, velut]
---

<style>
  td[lang] {
    font-style: normal;
  }

  #comparison {
    overflow-x: auto;
  }

  #comparison td {
    padding: 0;
    border: 0;
    vertical-align: top;
  }

  .with-highlight thead th:hover,
  .with-highlight:has(td:nth-child(2):hover) thead th:nth-child(2),
  .with-highlight:has(td:nth-child(3):hover) thead th:nth-child(3),
  .with-highlight:has(td:nth-child(4):hover) thead th:nth-child(4),
  .with-highlight:has(td:nth-child(5):hover) thead th:nth-child(5),
  .with-highlight:has(td:nth-child(6):hover) thead th:nth-child(6),
  .with-highlight:has(td:nth-child(7):hover) thead th:nth-child(7),
  .with-highlight tbody tr:has(:hover) th {
    background-color: var(--colour1);
    background-color: color-mix(in srgb, var(--colour1), transparent 67%)
  }

  .with-highlight tbody td:hover {
    background-color: var(--colour2);
    background-color: color-mix(in srgb, var(--colour2), transparent 67%)
  }
</style>

# Header-cells and `:hover` styles on my verb tables on velut

As alluded to in [a previous blogpost](./col-elements-on-verb-tables), I’ve made a component on my Latin vocabulary site ([velut](https://www.velut.co.uk)) for displaying inflected forms of verbs.

(I’ve actually made two components, one for non-participle forms and one for participles.
But they function similarly.)

<figure>
<img src="./images/2024/verb-table-amo-without-background_with-syncopated-forms.webp" alt="Table showing all single-word forms of amō except participles" width="900" style="aspect-ratio: 1412 / 795; margin: 0.25rem; max-width: calc(100% - 0.5rem);" />
<figcaption>Table of non-participle forms for a regular verb, as it will appear on velut</figcaption>
</figure>

In this article, I explain how to associate cells in HTML tables with their header-cells, how I first applied that to velut’s verb form tables, and how I came to change my approach.

There are good and bad things about what I’m doing.

## Hover effect

A nice thing that I want to highlight: you can hover over any cell and the appropriate header-cells will be highlighted!

<figure>
<img src="./images/2024/verb-table-amo-without-background_with-syncopated-forms_with-highlight.webp" alt="The same table, but one cell and its headers are highlighted" width="900" style="aspect-ratio: 1412 / 795; margin: 0.25rem; max-width: calc(100% - 0.5rem);" />
<figcaption>Hovering <q lang="la">amāvissēs/amāssēs</q> emphasizes that it’s the second singular pluperfect active subjunctive.</figcaption>
</figure>

I initially achieved this by giving matching `class` attributes to all the cells (with each class being a grammatical tag such as “indicative”, "active", "present"), and writing a rather gnarly-looking CSS selector to target the right header-cells without targeting unwanted header-cells.
Take a look at the code, if you dare.

<details>
<summary>Original CSS for the hover effect</summary>

<!-- prettier-ignore -->
```css
/*
Highlight th cells when matching td/th are hovered.
The selector *= means “contains” and $= means “ends with”, so this will highlight
th cells with classes that end with the substrings that the hovered cell’s class contains.
We’re writing [class*='CLASS'] and not .CLASS because we’re using CSS Modules
which mangles the CSS when we use the simpler syntax.
Consequently we need to be careful that 'future' doesn’t match as a substring of 'futureperfect'
& 'perfect' doesn’t match as a substring of 'imperfect', 'pluperfect', 'futureperfect'.
*/
.verbFormsTable table:has([class*='indicative']:hover) th[class$='indicative'],
.verbFormsTable table:has([class*='active']:hover) th[class$='active'],
.verbFormsTable table:has([class*='passive']:hover) th[class$='passive'],
.verbFormsTable table:has([class*='singular']:hover) th[class$='singular'],
.verbFormsTable table:has([class*='singular first']:hover) th[class$='singular first'],
.verbFormsTable table:has([class*='singular second']:hover) th[class$='singular second'],
.verbFormsTable table:has([class*='singular third']:hover) th[class$='singular third'],
.verbFormsTable table:has([class*='plural']:hover) th[class$='plural'],
.verbFormsTable table:has([class*='plural first']:hover) th[class$='plural first'],
.verbFormsTable table:has([class*='plural second']:hover) th[class$='plural second'],
.verbFormsTable table:has([class*='plural third']:hover) th[class$='plural third'],
.verbFormsTable tbody:has([class*='present']:hover) th[class$='present'],
.verbFormsTable tbody:has([class*='imperfect']:hover) th[class$='imperfect'],
.verbFormsTable tbody:has([class*='future']:not([class*='futureperfect']):hover) th[class$='future'],
.verbFormsTable tbody:has([class*=' perfect']:hover) th[class$=' perfect'],
.verbFormsTable tbody:has([class*='pluperfect']:hover) th[class$='pluperfect'],
.verbFormsTable tbody:has([class*='futureperfect']:hover) th[class$='futureperfect'],
.verbFormsTable table:has([class*='subjunctive']:hover) th[class$='subjunctive'],
.verbFormsTable table:has([class*='imperative']:hover) th[class$='imperative'],
.verbFormsTable table:has([class*='infinitive']:hover) th[class$='infinitive']:not(:empty),
.verbFormsTable table:has([class*='active present']:hover) thead th[class$='active present'],
.verbFormsTable table:has([class*='active perfect']:hover) thead th[class$='active perfect'],
.verbFormsTable table:has([class*='active future']:hover) thead th[class$='active future'],
.verbFormsTable table:has([class*='passive present']:hover) thead th[class$='passive present'],
.verbFormsTable table:has([class*='gerund']:hover) th[class$='gerund'],
.verbFormsTable table:has([class*='supine']:hover) th[class$='supine'],
.verbFormsTable table:has([class*='gerund accusative']:hover) th[class$='gerund accusative'],
.verbFormsTable table:has([class*='gerund genitive']:hover) th[class$='gerund genitive'],
.verbFormsTable table:has([class*='gerund dative']:hover) th[class$='gerund dative'],
.verbFormsTable table:has([class*='gerund ablative']:hover) th[class$='gerund ablative'],
.verbFormsTable table:has([class*='supine accusative']:hover) th[class$='supine accusative'],
.verbFormsTable table:has([class*='supine ablative']:hover) th[class$='supine ablative'] {
  background-image: linear-gradient(to bottom right, #efe1ab, transparent);
  border-top-color: #34311a;
  border-left-color: #34311a;
  color: #34311a;
}
```

</details>

Okay, the CSS might be difficult to understand.
(I swear there are good reasons why some of the lines have `table`, some have `tbody`, and some have `table` and `thead`!)
But the effect is a usability win for people that aren’t blind.

## Screen-reader support

But there’s a problem with my verb tables.
They will not be very accessible to screen-readers (software that narrates webpages to blind users), or to other forms of assistive technology.

The [blog of Adrian Rosselli](https://adrianroselli.com/2023/02/avoid-spanning-table-headers.html) recommends not even trying to make a complicated table (with spanning header-cells, etc).
Screen-readers will struggle, however the table is marked up.
I can add all the `<col>` or `<colgroup>` elements I want, or a lot of the attributes that can exist on elements in complex tables, and it won’t save the screen-reader experience.

It may be clear to sighted users that a form is grammatically what it is, but screen-readers do not reliably announce what headers a cell has.
So blind people visiting velut might hear the wrong headers announced.

## The `headers` and `id` way

The HTML specification says we can explicitly associate data-cells with their header-cells using `id` on all the `<th>` cells and `headers` on all the `<td>` cells (and also on some header-cells), where `headers` is a space-delimited list of all the header-cells’ IDs.
This seems like something screen-readers could support fairly easily.
[Apparently they don’t.](https://adrianroselli.com/2022/01/accessible-cart-tables.html)
(I haven’t tested for myself, but I believe Rosselli.)

I _might_ do the `headers` thing anyway.

That hover effect from before was achieved with `class` attributes and some tortuous CSS.
The `headers` approach would provide an alternative implementation of the hover effect, with potentially cleaner code, and _may_ be an accessibility benefit if screen-readers get their act together (by announcing the contents of a cell’s header-cells).
In that way, the same HTML attributes would reveal any cell’s headers through both the hover effect (for sighted users) and the screen-reader’s announcement (for blind users).

## Realising I need a middle approach

Then I realised, I don’t know whether the `headers` attribute on a `<th>` cell is allowed to include its own `id`.
With my current approach, hovering a `<th>` highlights it and its own headers, just like how hovering any of its `<td>` cells highlights the headers. I like this.
But can I make a `<th>` its own header, to maintain this behaviour?

Then I realised I could just include `th:hover` in the CSS selector, so any header-cell getting hovered gets highlighted.
The `headers` attribute wouldn’t need to include the same cell’s `id`.

But then I thought — maybe it doesn’t matter much anyway.
Screen-readers are going to be problematic regardless of any `headers` attributes.
And if screen-readers weren’t buggy, they’d handle the `colspan` and `rowspan` attributes correctly and be able to match every cell to all of its header-cells — meaning I wouldn’t need `headers` and `id` attributes, or any other special markup!

I really like being able to create user interfaces that are accessible to blind and other disabled people, not just sighted able-bodied neurotypicals.
But for my verb tables, I’ve decided not to worry so much about screen-reader support.

Putting accessibility to the side, my CSS (as you saw above) was still very ugly and difficult to debug.
(Though I believe it was free of bugs!)

And it could get even worse with `headers`/`id` attributes.

Every `id` attribute needs to be unique for the page the element’s on.
If I have several instances of my verb table components on a page, constructing unique IDs could get messy.
One benefit of my first approach (using class-names) is that I don’t need to worry about uniqueness — everything first-person gets a class-name of `first`, etc.

But a class-name of `first` (for example) is _not unique enough_, because two columns are headed “first” (one under “singular”, one under “plural”)!
Hence the gnarly CSS selector to avoid the wrong “first” header being highlighted.

## A middle approach

I decided to refactor in the following way.
I manually assigned every header-cell a pseudo-ID that’s unique in the `<table>` element (it doesn’t have to be unique in the page), and programmatically assigned every cell (both `<th>` and `<td>`) a list of its header-cells’ pseudo-IDs.
When a cell is hovered, the header-cells are highlighted via their pseudo-IDs.

When creating your own HTML attributes for purposes like this, it’s customary to start them with `data-` so people seeing the code realise it’s a non-standard attribute.

So the HTML for a header-cell in the top row looks like this:

```html
<th data-id="singular" data-headers="singular" colspan="3">singular</th>
```

And the HTML for a header-cell below that header-cell looks like this:

```html
<th data-id="first-singular" data-headers="singular first-singular">first</th>
```

And a data-cell in that column looks like this, referencing the two header-cells whose HTML is above (`singular` and `first-singular`), and also referencing the header-cells for the row (`active` and `present-active`):

```html
<td data-headers="singular first-singular active present-active">amō</td>
```

The CSS is then as followers:

<!-- prettier-ignore -->
```css
.verbFormsTable table:has([data-headers*='singular']:hover) th[data-id='singular'],
.verbFormsTable table:has([data-headers*='first-singular']:hover) th[data-id='first-singular'],
.verbFormsTable table:has([data-headers*='second-singular']:hover) th[data-id='second-singular'],
.verbFormsTable table:has([data-headers*='third-singular']:hover) th[data-id='third-singular'],
/* and so on for every header-cell */
{
	/* Highlighting styles go here. */
}
```

This is much easier to understand!
Each cell has a list of its header-cells as `data-headers`.
Whenever a cell is hovered, the header-cells with matching `data-id` attributes are highlighted, within the same `<table>` element.

(Just to clarify, what looks like one table of verb forms is actually several `<table>` elements stacked on top of each other.
So first-singular forms in the indicative table will not cause problems for first-singular forms in the subjunctive table, etc.
My [prior article](./col-elements-on-verb-tables) explains why it’s multiple tables — I wanted the header rows to be in multiple `<thead>` elements.)

## CSS comparison

<details>
<summary>CSS for the hover effect, before and after</summary>

(You may need to scroll right to see all the code.)

<div id="comparison">
<table>
<thead>
<tr><th>With class-names</th><th>With custom attributes</th></tr>
</thead>
<tbody>
<tr>
<td>

<!-- prettier-ignore -->
```css
/*
Highlight th cells when matching td/th are hovered.
The selector *= means “contains” and $= means “ends with”, so this will highlight
th cells with classes that end with the substrings that the hovered cell’s class contains.
We’re writing [class*='CLASS'] and not .CLASS because we’re using CSS Modules
which mangles the CSS when we use the simpler syntax.
Consequently we need to be careful that 'future' doesn’t match as a substring of 'futureperfect'
& 'perfect' doesn’t match as a substring of 'imperfect', 'pluperfect', 'futureperfect'.
*/
.verbFormsTable table:has([class*='indicative']:hover) th[class$='indicative'],
.verbFormsTable table:has([class*='active']:hover) th[class$='active'],
.verbFormsTable table:has([class*='passive']:hover) th[class$='passive'],
.verbFormsTable table:has([class*='singular']:hover) th[class$='singular'],
.verbFormsTable table:has([class*='singular first']:hover) th[class$='singular first'],
.verbFormsTable table:has([class*='singular second']:hover) th[class$='singular second'],
.verbFormsTable table:has([class*='singular third']:hover) th[class$='singular third'],
.verbFormsTable table:has([class*='plural']:hover) th[class$='plural'],
.verbFormsTable table:has([class*='plural first']:hover) th[class$='plural first'],
.verbFormsTable table:has([class*='plural second']:hover) th[class$='plural second'],
.verbFormsTable table:has([class*='plural third']:hover) th[class$='plural third'],
.verbFormsTable tbody:has([class*='present']:hover) th[class$='present'],
.verbFormsTable tbody:has([class*='imperfect']:hover) th[class$='imperfect'],
.verbFormsTable tbody:has([class*='future']:not([class*='futureperfect']):hover) th[class$='future'],
.verbFormsTable tbody:has([class*=' perfect']:hover) th[class$=' perfect'],
.verbFormsTable tbody:has([class*='pluperfect']:hover) th[class$='pluperfect'],
.verbFormsTable tbody:has([class*='futureperfect']:hover) th[class$='futureperfect'],
.verbFormsTable table:has([class*='subjunctive']:hover) th[class$='subjunctive'],
.verbFormsTable table:has([class*='imperative']:hover) th[class$='imperative'],
.verbFormsTable table:has([class*='infinitive']:hover) th[class$='infinitive']:not(:empty),
.verbFormsTable table:has([class*='active present']:hover) thead th[class$='active present'],
.verbFormsTable table:has([class*='active perfect']:hover) thead th[class$='active perfect'],
.verbFormsTable table:has([class*='active future']:hover) thead th[class$='active future'],
.verbFormsTable table:has([class*='passive present']:hover) thead th[class$='passive present'],
.verbFormsTable table:has([class*='gerund']:hover) th[class$='gerund'],
.verbFormsTable table:has([class*='supine']:hover) th[class$='supine'],
.verbFormsTable table:has([class*='gerund accusative']:hover) th[class$='gerund accusative'],
.verbFormsTable table:has([class*='gerund genitive']:hover) th[class$='gerund genitive'],
.verbFormsTable table:has([class*='gerund dative']:hover) th[class$='gerund dative'],
.verbFormsTable table:has([class*='gerund ablative']:hover) th[class$='gerund ablative'],
.verbFormsTable table:has([class*='supine accusative']:hover) th[class$='supine accusative'],
.verbFormsTable table:has([class*='supine ablative']:hover) th[class$='supine ablative'] {
  background-image: linear-gradient(to bottom right, #efe1ab, transparent);
  border-top-color: #34311a;
  border-left-color: #34311a;
  color: #34311a;
}
```

</td>
<td>

<!-- prettier-ignore -->
```css
/* Highlight <th> cells when matching th/td are hovered.
Every <th> has a data-id attribute, which is unique within its <table>.
Every cell (<td> & <th>) has a data-headers attribute, which lists all the IDs of the cell’s header cells.
So every header cell should have a line of the selector below, in the format
table:has([data-headers*='ID']:hover) th[data-id='ID']
The selector *= means “contains”.
Slightly special handling needs to be on `future` to stop `futureperfect` matching it.
 */
.verbFormsTable table:has([data-headers*='indicative']:hover) th[data-id='indicative'],
.verbFormsTable table:has([data-headers*='subjunctive']:hover) th[data-id='subjunctive'],
.verbFormsTable table:has([data-headers*='imperative']:hover) th[data-id='imperative'],
.verbFormsTable table:has([data-headers*='infinitive']:hover) th[data-id='infinitive'],
.verbFormsTable table:has([data-headers*='gerund']:hover) th[data-id='gerund'],
.verbFormsTable table:has([data-headers*='supine']:hover) th[data-id='supine'],
.verbFormsTable table:has([data-headers*='singular']:hover) th[data-id='singular'],
.verbFormsTable table:has([data-headers*='plural']:hover) th[data-id='plural'],
.verbFormsTable table:has([data-headers*='active']:hover) th[data-id='active'],
.verbFormsTable table:has([data-headers*='passive']:hover) th[data-id='passive'],
.verbFormsTable table:has([data-headers*='first-singular']:hover) th[data-id='first-singular'],
.verbFormsTable table:has([data-headers*='second-singular']:hover) th[data-id='second-singular'],
.verbFormsTable table:has([data-headers*='third-singular']:hover) th[data-id='third-singular'],
.verbFormsTable table:has([data-headers*='first-plural']:hover) th[data-id='first-plural'],
.verbFormsTable table:has([data-headers*='second-plural']:hover) th[data-id='second-plural'],
.verbFormsTable table:has([data-headers*='third-plural']:hover) th[data-id='third-plural'],
.verbFormsTable table:has([data-headers*='active-present']:hover) th[data-id='active-present'],
.verbFormsTable table:has([data-headers*='active-imperfect']:hover) th[data-id='active-imperfect'],
.verbFormsTable
  table:has([data-headers*='active-future']:not([data-headers*='futureperfect']):hover)
  th[data-id='active-future'],
.verbFormsTable table:has([data-headers*='active-perfect']:hover) th[data-id='active-perfect'],
.verbFormsTable table:has([data-headers*='active-pluperfect']:hover) th[data-id='active-pluperfect'],
.verbFormsTable table:has([data-headers*='active-futureperfect']:hover) th[data-id='active-futureperfect'],
.verbFormsTable table:has([data-headers*='passive-present']:hover) th[data-id='passive-present'],
.verbFormsTable table:has([data-headers*='passive-imperfect']:hover) th[data-id='passive-imperfect'],
.verbFormsTable table:has([data-headers*='passive-future']:hover) th[data-id='passive-future'],
.verbFormsTable table:has([data-headers*='passive-perfect']:hover) th[data-id='passive-perfect'],
.verbFormsTable table:has([data-headers*='accusative-gerund']:hover) th[data-id='accusative-gerund'],
.verbFormsTable table:has([data-headers*='genitive-gerund']:hover) th[data-id='genitive-gerund'],
.verbFormsTable table:has([data-headers*='dative-gerund']:hover) th[data-id='dative-gerund'],
.verbFormsTable table:has([data-headers*='ablative-gerund']:hover) th[data-id='ablative-gerund'],
.verbFormsTable table:has([data-headers*='accusative-supine']:hover) th[data-id='accusative-supine'],
.verbFormsTable table:has([data-headers*='ablative-supine']:hover) th[data-id='ablative-supine'],
.verbFormsTable table:has([data-headers*='masculine']:hover) th[data-id='masculine'],
.verbFormsTable table:has([data-headers*='feminine']:hover) th[data-id='feminine'],
.verbFormsTable table:has([data-headers*='neuter']:hover) th[data-id='neuter'],
.verbFormsTable table:has([data-headers*='nominative']:hover) th[data-id='nominative'],
.verbFormsTable table:has([data-headers*='vocative']:hover) th[data-id='vocative'],
.verbFormsTable table:has([data-headers*='accusative']:hover) th[data-id='accusative'],
.verbFormsTable table:has([data-headers*='genitive']:hover) th[data-id='genitive'],
.verbFormsTable table:has([data-headers*='dative']:hover) th[data-id='dative'],
.verbFormsTable table:has([data-headers*='ablative']:hover) th[data-id='ablative'],
.verbFormsTable table:has([data-headers*='singular-masculine']:hover) th[data-id='singular-masculine'],
.verbFormsTable table:has([data-headers*='plural-masculine']:hover) th[data-id='plural-masculine'],
.verbFormsTable table:has([data-headers*='singular-feminine']:hover) th[data-id='singular-feminine'],
.verbFormsTable table:has([data-headers*='plural-feminine']:hover) th[data-id='plural-feminine'],
.verbFormsTable table:has([data-headers*='singular-neuter']:hover) th[data-id='singular-neuter'],
.verbFormsTable table:has([data-headers*='plural-neuter']:hover) th[data-id='plural-neuter'] {
  background-image: linear-gradient(to bottom right, #efe1ab, transparent);
  border-top-color: #34311a;
  border-left-color: #34311a;
  color: #34311a;
}
```

</td>
</tr>
</tbody>
</table>
</div>

</details>

Turns out that when I refactored, I made the very long CSS selector even longer.
Oops.
But it is less complicated and therefore easier to read, because it’s pretty much just `.verbFormsTable table:has([data-headers*='ID']:hover) th[data-id='ID']` for every ID!

The complexity that was in the CSS selector is now in the JavaScript for generating the `data-headers` and `data-id` values.
I reckon that’s better because my new attributes give a clearer sense of what cells have what headers than my old `class` attributes did.
If a cell isn’t being highlighted when it should (or is being highlighted when it shouldn’t), I can check the HTML output — either an attribute is wrong or an ID is missing from the CSS, and I can see which it is.

## Future work

As I said before, I’ve kinda abandoned the idea of trying to make my verb tables really accessible to assistive technology.
Screen-readers don’t always handle `colspan` or `rowspan` correctly, and the fallback for that is the `headers`/`id` approach but they don’t understand that either.

However, if the `headers` thing gains support, my refactoring work with my `data-headers`/`data-id` attributes will make it easier for me to add the `headers` and `id` attributes.
I would simply need to generate a unique ID for every `<table>` element on the page, and append it to the cell IDs.
(Generating the unique IDs is challenging enough that I haven’t done it already, but it’s not so difficult that I wouldn’t plan to do it.)

For `<th>` cells, I would also remove the cell’s ID from its own `headers` attribute, since a cell being its own header doesn’t make sense to me semantically.

I’d most likely keep the `data-` attributes, since the CSS uses them.

(A lot of the time, I like to use accessibility attributes in my CSS selectors, because it can be a hassle to maintain one set of attributes for accessibility/functionality and a separate set of attributes for styling.
If a hyperlink already has an `aria-current="page"` attribute, I don’t need to add `class="link-to-current-page"` to style it, for example.
But with the verb tables, the added table IDs would make the CSS even more convoluted if I had to adapt the CSS for them.)

So, here’s my current HTML for a header-cell that has a header-cell above it:

```html
<th data-id="first-singular" data-headers="singular first-singular">first</th>
```

And here’s what I might change it to:

```html
<th
	data-id="first-singular"
	data-headers="singular first-singular"
	id="table001-first-singular"
	headers="table001-singular"
>
	first
</th>
```

My CSS will continue to highlight the correct header-cells through the `data-` attributes.
Screen-readers that support `headers` will understand that the header-cell `table001-first-singular` has `table001-singular` for a header.

And for `<td>` cells, the header information would be especially useful.
Somebody using a screen-reader might come to the <q lang="la">amāvissēs</q> cell, for example, and ask the technology what the headers are.
It would read out the text content of the header-cells: “subjunctive active pluperfect singular second”.

However, I’m not making those changes until the `headers` attribute is well-supported.

## An “accessible” table

The table below is probably easy to navigate using a screen-reader.
One header row, one header column, no spans anywhere.

It has highlighting styles on hover, just for the sake of it.

I have omitted most of the rows, for brevity.
(You’d need 19 non-header rows just for the indicatives, subjunctives, and imperatives.)

<table class="with-highlight">
  <thead>
    <tr>
      <td></td>
      <th>first singular</th>
      <th>second singular</th>
      <th>third singular</th>
      <th>first plural</th>
      <th>second plural</th>
      <th>third plural</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>indicative active present</th>
      <td lang="la">amō</td>
      <td lang="la">amās</td>
      <td lang="la">amat</td>
      <td lang="la">amāmus</td>
      <td lang="la">amātis</td>
      <td lang="la">amant</td>
    </tr>
    <tr>
      <th>indicative active imperfect</th>
      <td lang="la">amābam</td>
      <td lang="la">amābās</td>
      <td lang="la">amābat</td>
      <td lang="la">amābāmus</td>
      <td lang="la">amābātis</td>
      <td lang="la">amābant</td>
    </tr>
    <tr>
      <th>indicative active future</th>
      <td lang="la">amābō</td>
      <td lang="la">amābis</td>
      <td lang="la">amābit</td>
      <td lang="la">amābimus</td>
      <td lang="la">amābitis</td>
      <td lang="la">amābunt</td>
    </tr>
  </tbody>
</table>

Anything more complicated is going to cause problems for screen-readers, however it’s marked up.
So I haven’t tried.
I’m not even convinced screen-readers will handle the simple table correctly!

In fairness, I could present all the inflected forms for verbs in “accessible” tables such as that one, and it wouldn’t be _completely_ awful.
I _might_ be able to make it look more like what I have currently, by making some of the text visually hidden (but still available to assistive tech) and by inserting extra elements that look like cells spanning multiple rows and columns.

But it looks so much more elegant (to sighted readers) to have header-cells that span multiple columns and rows, and for them to be proper `<th>` elements.
And I’m still not convinced screen-readers can handle the “accessible” table.

_Note: I have not yet published tables for non-deponent verbs (such as <a lang="la" href="https://www.velut.co.uk/amo-">amō</a>) on velut. But I have published tables for all deponent and semi-deponent verbs, such as <a lang="la" href="https://www.velut.co.uk/opi-nor">opīnor</a>, <a lang="la" href="https://www.velut.co.uk/praeterferor">praeterferor</a>, and <a lang="la" href="https://www.velut.co.uk/gaudeo-">gaudeō</a>. So that’s how you can see my hover effect in action, before I publish the non-deponent tables._
