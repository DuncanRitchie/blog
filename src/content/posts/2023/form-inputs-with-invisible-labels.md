---
title: Form inputs with invisible labels
date: 2023-02-28
draft: false
tags: ['Software', 'velut']
---

# Form inputs with invisible labels

## Preamble

Except in rare circumstances, every `<input>` element in a webpage should have a `<label>` element associated with it.
This is particularly useful for blind visitors using screen-reader technology, because they will hear the contents of the label when each field is announced.
This helps everyone understand how to fill the form out.

```html
<form>
	<label for="first-name">Your first name:</label>
	<input id="first-name" />
	<button>Submit</button>
</form>
```

In my post about [re-architecting my Latin website](/porting-velut-to-nextjs), I described how I had made a search-form that doesn’t require a `<label>` element, because there’s only one `<input>` element and its purpose is obvious from the context.

I also said that I would add a `<label>` element that would be accessible to screen-reader technology but not displayed visually.

Here’s the (massively simplified) mark-up I had:

```html
<form>
	<input title="Enter a Latin word" />
	<button>Search!</button>
</form>
```

## New markup

Here’s what I have now.
I kept the `title` and added a label with a CSS class to make the label visually hidden.

```html
<form>
	<label for="search-input" class="visually-hidden">Latin word</label>
	<input id="search-input" title="Latin word" />
	<button>Search!</button>
</form>
```

```css
.visually-hidden {
	border: 0;
	clip: rect(0 0 0 0);
	height: 1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	white-space: nowrap;
	width: 1px;
}
```

The CSS came from an [article by Chris Bongers](https://gomakethings.com/revisting-aria-label-versus-a-visually-hidden-class/).

I have not actually tested this combination of the `<label>` element and the `title` attribute in screen-readers. Maybe I should do that, instead of putting all faith in my interpretation of a little bit of internet research.

Anyway, let’s explore my thought process, beyond the usual recommendations about the `<label>` element.

## The `title` attribute

The `title` attribute makes the text “Latin word” appear when you hover over the input.
It would also get used as the “accessible name” of the `<input>` element, if there was no `<label>` element (or `aria-label` attribute, etc).

Mobile devices don’t allow hovering, and many screen-readers ignore the `title` attribute if there’s something overriding it or if it’s on a non-interactive element.
So there will be visitors that can’t get any benefit from the attribute.
But, it’s kinda neat for the people that can see the title.
I didn’t get rid of it.

The text of the label here is the same as the `title` attribute.
If they were different from each other, there could be a risk that someone using assistive tech could think the input was called one thing (perhaps if they were seeing the `title` attribute) but the accessible name that would actually invoke the field would be something different (since the label would take precedence).
Having the two the same prevents this problem.

I also had a worry that if the label and the `title` were different, some screen-readers might read both out.
Perhaps making them the same would make some screen-readers only read the text once.
I don’t know how likely this would be.

In any case, the text should simply be “Latin word”, rather than “Type a Latin word” which is what I previously had.
Users will know it’s a field that they can enter their Latin word into; the imperative verb “type” is unnecessary.

### More general advice on `title`

From what I can tell, pretty much the only place where you <em>need</em> a `title` attribute is on an `<iframe>` element.
(If you’re using iframes!)
In other situations, it is discouraged.
The risk is too great that some users will see (or otherwise perceive) the title, and some won’t.

If information is in the `title` only, a large proportion of visitors will miss it.
If the `title` conveys information that is also conveyed elsewhere, then the attribute is redundant.

This is particularly true when the title describes text already on the screen. There is no point in the `title` attribute in `<a href="/" title="My homepage">Home</a>`.
I confess to having been guilty of that myself on several occasions!

But, there are cases where some level of redundancy is acceptable.
I think my form example is one.
It wouldn’t really matter if the `title` attribute weren’t there, but I like it.

## The `aria-label` attribute

Another way of giving an accessible name to an `<input>` element is through an `aria-label` attribute.

```html
<form>
	<input aria-label="Latin word" />
	<button>Search!</button>
</form>
```

Screen-readers will announce “Latin word” as the name of this element, which is good!

Unfortunately, some translation software doesn’t translate `aria-label` attributes.
So if a user has neither good eyesight nor fluency in English, there’s a chance that they might hear “Latin word” instead of a translation that is more useful to them.
Using a `<label>` element solves this problem, because the text is then an element’s content rather than an attribute, so it’s more likely to be translated.

(Come to think of it, the `title` attribute might not get translated either.
Maybe someone will hear the `<label>` text translated and the `title` attribute untranslated?
I don’t know whether that would ever happen, since screen-readers generally ignore `title`.
If it did happen, I don’t have a way to fix it, apart from deleting the `title` attribute.)

## Conclusion

If text should be visible alongside a form field to tell the user what to put in it, that text should be in a `<label>` element with a `for` attribute matching the `id` of the field (which is usually an `<input>` element).

If the label would clutter the design, and if a sighted user would understand how to use the form without it, the `<label>` element can be hidden using CSS in a way that keeps it accessible to screen-readers.

There are less-recommended alternatives to a `<label>` element, such as the `title` or `aria-label` attribute on the `<input>` element.
These might be used for the accessible name of the field in the absence of `<label>`, but some translation software might not translate them because they are attributes and not an element’s text content.

The `title` attribute gets displayed if a user hovers over the element.
This can be nice for sighted mouse-users.
Its absence wouldn’t hurt (provided the field is otherwise labelled), but I don’t think its presence hurts anyone either.

This is why I’m using both a visually-hidden `<label>` element and a `title` attribute (with the same text), on the form for searching [my Latin dictionary](https://www.velut.co.uk).

## Sources

### Invisible labels

- [Chris Bongers](https://gomakethings.com/revisting-aria-label-versus-a-visually-hidden-class/)

- [WAI (on invisible labels)](https://www.w3.org/WAI/WCAG22/Techniques/html/H65)

- [Stack Overflow (one discussion)](https://stackoverflow.com/questions/43105006/should-i-use-arial-label-or-a-label-element-that-is-visually-hidden)

- [Stack Overflow (another discussion)](https://stackoverflow.com/questions/60653365/use-aria-label-to-make-a-form-accessible?rq=1)

### Labels more generally

- [WAI (on labels generally)](https://www.w3.org/WAI/tutorials/forms/labels/)

- [Make Things Accessible](https://www.makethingsaccessible.com/guides/labelling-inputs/)

- [Deque University](https://dequeuniversity.com/rules/axe/4.1/label-title-only)

### More about the `title` attribute

- [24 Accessibility](https://www.24a11y.com/2017/the-trials-and-tribulations-of-the-title-attribute/)

- [MediaCurrent](https://www.mediacurrent.com/blog/dont-rely-title-attribute-accessibility-seo)

- [TPGi](https://www.tpgi.com/using-the-html-title-attribute-updated/)
