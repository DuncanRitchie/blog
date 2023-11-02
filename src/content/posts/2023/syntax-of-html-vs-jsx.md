---
title: Syntax of HTML vs JSX
date: 2023-11-02
draft: false
tags: ['Software']
---

<style>
	figure {
		display: grid;
		grid-template-columns: repeat(var(--col-count, 2), 1fr);
		gap: 0.5rem;
		border: none;
		text-align: left;
	}
	figure pre::before {
		position: absolute;
		translate: 0 -1.5rem;
		color: var(--body-text);
	}
	figure pre:nth-of-type(1)::before {
		content: 'HTML';
	}
	figure pre:nth-of-type(2)::before {
		content: 'JSX';
	}
	figure pre:nth-of-type(3)::before {
		content: 'TSX';
	}
	figure:has(> pre:nth-of-type(3)) {
		--col-count: 3;
	}
</style>

# Syntax of HTML vs JSX

HTML is the standard language for describing the content of a webpage.
Web browsers parse it into a tree of elements called the Document Object Model (DOM) which is used for tracking changes to the webpage’s content after page-load.

JavaScript is the standard language for controlling custom behaviour of a webpage; it can run inside as well as outside the browser.

When developing web front-ends with JavaScript, several popular frameworks (most notably React) enable you to write in a syntax called JSX, which looks like HTML (and has the same purpose, creating DOM elements) but is combined with the powerfulness of JavaScript. 
JSX is not proper JavaScript and is not supported in browsers, but it’s definitely worth knowing if you’re doing any sort of work with React, Preact, or similar frameworks.

So here’s a list of ways that the syntax of HTML differs from that of JSX.
For clarity, I say that HTML/DOM elements have attributes, whereas JSX elements have props (which are used to set the DOM attributes).

(A point about HTML: I give all attributes with double quotes, since that’s my usual style.
For many of the examples, it’s permissible to substitute single quotes or not use quotes at all.)

## List of differences

### Interpolation

Values from JavaScript can be interpolated into JSX using curly brackets.

<figure>

```html
<p>I’m 27 years old.</p>
```

```jsx
<p>I’m {myAge} years old.</p>
```

</figure>

### Case-sensitivity

Attributes are case-insensitive but props are case-sensitive.
So `onClick` in JSX cannot be written as `onclick` or `ONCLICK` as it can in HTML.

<figure>

```html
<button onclick="doSomething()">Do something</button>
```

```jsx
<button onClick={doSomething}>Do something</button>
```

</figure>

### Hyphenated attributes

Hyphenated attributes correspond to camel-case props.
(However, `aria-*` and `data-` attributes are exceptions: they stay hyphenated.)

<figure>

```html
<form accept-charset="utf-8">
```

```jsx
<form acceptCharset="utf-8">
```

</figure>

There aren’t many camel-case props like this.

### `class` and `for`

Two attributes are renamed for JSX.
They are `class` and `for`, which are keywords in JavaScript and therefore cannot be used as the names of JSX props.
The JSX equivalents are `className` and `htmlFor`.

<figure>

```html
<label class="action" for="example">
```

```jsx
<label className="action" htmlFor="example">
```

</figure>

### CSS in `style` object

The `style` prop can be an object.
Note the double curly brackets: the outer curlies are for the interpolation of JavaScript, the inner curlies denote the JavaScript object that is the interpolated value.
Camel-casing of hyphenated phrases applies here too.

<figure>

```html
<h1 style="color: blue; font-size: 2rem">
```

```jsx
<h1 style={{color: 'blue', fontSize: '2rem'}}>
```

</figure>

Interpolation works here too, of course.

### JSX fragments

A JavaScript function cannot return more than one value.
For this reason, if you want to return more than one element in JSX, there must always be one element wrapping everything else.
We can use fragments (`<></>`) for this purpose, which make for valid JSX without adding an extra element to the DOM.

<figure>

```html
<h1>Heading</h1>
<p>Paragraph</p>
```

```jsx
<>
	<h1>Heading</h1>
	<p>Paragraph</p>
</>
```

</figure>

Fragments can be written more explicitly as `<Fragment></Fragment>`.
This is useful if you want to add props such as `key` which are used by React but do not become attributes in the HTML (and therefore do not need to be on an HTML element).

<figure>

```html
<h1>Heading</h1>
<p>Paragraph</p>
```

```jsx
<Fragment key={keyForThisFragment}>
	<h1>Heading</h1>
	<p>Paragraph</p>
</Fragment>
```

</figure>

### Whitespace

Whitespace is treated differently in HTML than in JavaScript.
It’s mostly fine.
But, if you have a line-break in your JSX before an opening tag, and you want a space to show up before that element, you need to interpolate a space.

<figure>

```html
<p>
	Hello everyone!
	<a href="aboutme.html">I’m Duncan Ritchie.</a>
</p>
```

```jsx
<p>
	Hello everyone!{' '}
	<a href='aboutme.html'>I’m Duncan Ritchie.</a>
</p>
```

</figure>

### Closing and self-closing tags

Self-closing tags (void elements) are those that cannot have elements inside them.
They must be self-closed in JSX.

<figure>

```html
<br>
```

```jsx
<br />
```

</figure>

Non-self-closing tags can self-close in JSX.

<figure>

```html
<a name="section-1" id="section-1"></a>
```

```jsx
<a name="section-1" id="section-1" />
```

</figure>

### Code comments

In HTML, there’s only one syntax for comments, and a comment is a DOM node, so you cannot put it inside another tag.

But in JSX, a comment with `//` can go at the end of any line, including inside a tag.
This makes commenting on a particular attribute easier.

<figure>

```html
<!-- "text" is the default type for inputs. -->
<!-- enterkeyhint="search" makes a magnifying-glass icon appear on a mobile keyboard. -->
<input
	type="text"
	enterkeyhint="search"
/>
```

```jsx
<input
	type="text" // The default type for inputs.
	enterKeyHint="search" // Makes a magnifying-glass icon appear on a mobile keyboard.
/>
```

</figure>

You can also use `/* */` syntax for JSX comments, as you can in normal JavaScript.

JSX comments created using `<!-- -->` (the HTML syntax) will appear in the DOM when the browser receives the page.
(Of course, comments don’t appear on the rendered page, but they’ll be visible if the visitor uses the browser’s developer tools or “View Page Source” feature.) In contrast, JSX comments in the JavaScript styles only exist in JSX and will not be in the output HTML.

You can read more about comments in JSX in an [article by Dmitri Pavlutin](https://dmitripavlutin.com/react-comments/).

### TypeScript JSX

In the case of numeric props, JSX can accept a JavaScript number (`123`) or string (`'123'`).

However, JSX can also work with TypeScript.
If you’re using JSX with TypeScript (TSX), some props must be numbers, not strings.

<figure style="--col-count: 3;">

```html
<textarea rows="12">
```

```jsx
<textarea rows={'12'}>
// or
<textarea rows={12}>
```

```tsx
<textarea rows={12}>
```

</figure>

## Further links

[Maisie Johnson](https://blog.maisie.ink/jsx-html-differences/) and [Amey Raut](http://ameyraut.com/what-is-the-difference-between-jsx-and-html/) both have good articles on JSX.

And of course, you can peruse official documentation, such as for [React](https://react.dev/learn/writing-markup-with-jsx).

The React docs actually recommend using a HTML-to-JSX conversion tool, rather than manually fixing the things I’ve listed above.
I haven’t found the need for a tool like that, but it could be useful if you have huge amounts of HTML you need to put into JSX.
