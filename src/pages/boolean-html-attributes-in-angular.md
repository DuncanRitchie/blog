---
date: 2022-08-22
title: Boolean HTML attributes in Angular
layout: blog-layout.html
tags: ['Software']
---

# Boolean HTML attributes in Angular

I’ve been learning [Angular](https://angular.io) and using it to make a website at work. I made a component that could work in two different modes, so I had a boolean (`true`/`false`) variable in the component to represent which mode the component was in. Some aspects of the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) then are changed according to the variable, such as some attributes that are themselves boolean.

My adventures in figuring out how to do this inspired me to write this blogpost summarising what I found.

## Boolean HTML attributes

To make an input (enabled by default), it’s `<input />`

To make a disabled input, it’s `<input disabled />`

This is the same as `<input disabled="true" />` and `<input disabled="disabled" />`

This is also the same as `<input disabled="false" />` because it is the presence of the `disabled` attribute that makes it disabled, not its value!

(The [HTML spec](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes) says `"true"` and `"false"` are invalid values for boolean attributes, but browser behaviour is as I’ve described it.)

There are a few other boolean attributes like this, such as `required` and `hidden`. However, [Aria attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes) behave differently: `<input aria-hidden="false" />` means not hidden to assistive tech.

(For more detail about Aria/non-Aria boolean attributes, [Hidde de Vries](https://hidde.blog/boolean-attributes-in-html-and-aria-whats-the-difference/) has a good article.)

## Binding on boolean attributes in Angular

For Angular, assuming `myVariable` is a boolean variable that we are binding to:
- The syntax `<input [attr.disabled]="myVariable" />` gives HTML of `<input disabled="true" />` or `<input disabled="false" />`
- The syntax `<input [attr.disabled]="myVariable || null" />` gives HTML of `<input disabled="true" />` or `<input />` because Angular removes null or undefined attributes.

The latter behaviour is what I want, but the `|| null` looks awkward.

But wait, that’s not quite valid HTML, even if it works in browsers. So I changed it to `<input [attr.disabled]="myVariable ? 'disabled' : null" />`

This is more verbose, but we get valid HTML of `<input disabled="disabled" />` or `<input />`

## Comparison with the Angular docs

The [Angular documentation](https://angular.io/guide/binding-syntax#example-2-a-disabled-button) confirms that `<input [attr.disabled]="myVariable ? 'disabled' : null" />` is a valid way of doing it. So that’s how I did it.

Is there a nicer Angular syntax?

The docs also suggest `<input [disabled]="myVariable ? true : false">` — but I find this doesn’t work for my case, where the variable depends on URL parameters. When the component mounts, the variable is false (the default for a boolean) and then it is set to true (or false) when the URL gets read. Angular sees the initial false value and removes the `disabled` attribute to match that. But Angular doesn’t update the attribute when the variable becomes true, so the field is never disabled.

Throughout this blogpost I’ve been saying “attribute”. The Angular docs make a clear distinction between attributes (the initial values set in HTML) and properties (the live values in the DOM). This is funny because it’s the `[attr.disabled]` syntax that works for me in setting the live value.

## Caveats

- The version of Angular here is 14.0.6. I don’t know whether other versions will differ.
- There might be cases where `<input [disabled]="myVariable">` does what you want. It didn’t do what I want.
- I’ve only been using Angular for a few months. (Nevertheless, senior devs approved of my submission in the code-review for this topic. That was nice!)
- My variable isn’t actually named `myVariable`.
