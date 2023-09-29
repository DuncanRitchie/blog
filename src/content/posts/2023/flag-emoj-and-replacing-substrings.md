---
title: Flag emoji and replacing substrings
date: 2023-09-29
draft: false
tags: ['Software']
---

# Flag emoji and replacing substrings

I came across an [article from Jorik Tangelder](https://dev.to/jorik/country-code-to-flag-emoji-a21) (via Chris Ferdinandi’s [Go Make Things newsletter](https://gomakethings.com/getting-emoji-from-country-codes-with-vanilla-javascript/)) sharing a nifty function for converting two-letter country codes (ISO 3166-1 alpha-2 codes) into emoji glyphs, so “GB” can become “🇬🇧”.
(Go see that article for the function.)

It might help me compile emoji for [lists of my favourite Eurovision songs](https://www.duncanritchie.co.uk/blog/tags/eurovision), for example.

Unfortunately, Windows doesn’t display country flag emoji outside of Firefox.
There are workarounds for that, but I wouldn’t expect most people to do a workaround, and if I’m looking at my blog I want to see it how other people see it.

But the really interesting thing for me to learn was in the comments, where various people (including Jorik Tangelder himself) were trying to improve on the code.

It was there I learnt that you can use a function inside `String.replace`.
This works particularly well when using a regular expression.
So you’re not limited to replacing every occurrence of a substring (every match of the regex) with the same value.
You can generate the new value depending on the occurrence.

```js
'This test is fantastic'.replace(/t.st/g, (substring) =>
	substring.toUpperCase(),
)
// => "This TEST is fanTASTic"
```

I didn’t know you could do that, but I think I’ll be using it a lot!
