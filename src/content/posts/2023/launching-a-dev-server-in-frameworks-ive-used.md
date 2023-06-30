---
title: Launching a dev server in frameworks I’ve used
draft: false
date: 2023-05-30
tags: ['Software']
---

<style>
	#table-wrapper {
		max-width: 100%;
		overflow: auto;
		padding-bottom: 1rem;
	}
	th {
		text-align: left;
		position: sticky;
		left: 0;
		background-image: var(--page-background);
		background-size: 100% 100vh;
		background-attachment: fixed;
		z-index: 1;
	}
	pre {
		margin-block: 0;
	}
</style>

# Launching a dev server in frameworks I’ve used

I use Angular and Nest.js at work, Astro for this blog (though I used to use Eleventy), and Next.js for my Latin dictionary website (though I used to use Create React App).

Across these frameworks, there’s some variation in the default NPM commands for starting an development server that automatically reloads when a file is saved.
There’s also a little bit of variation in the default port number, though most use 3000.

So I decided to make a list of the starting commands and URLs for the dev servers.

Note that `npm start` is equivalent to `npm run start`.

<div id="table-wrapper">
<table>

<tr>
<th>Angular</th><td>

```
npm start
```

</td>
<td>

http://localhost:4200

</td>
</tr>

<tr>
<th>Astro</th><td>

```
npm start
npm run dev
```

</td>
<td>

http://127.0.0.1:3000

</td>
</tr>
<tr>
<th>Create React App</th><td>

```
npm start
```

</td>
<td>

http://localhost:3000

</td>
</tr>
<tr>
<th>Eleventy</th><td>

```
npm run dev
```

</td>
<td>

http://localhost:8080

</td>
</tr>
<tr>
<th>Nest.js</th><td>

```
npm run start:dev
```

</td>
<td>

http://localhost:3000

</td>
</tr>
<tr>
<th>Next.js</th><td>

```
npm run dev
```

</td>
<td>

http://localhost:3000

</td>
</tr>
</table>
</div>
