---
title: How I ported my Latin dictionary to Next.js
date: 2023-01-28
layout: '../layouts/Post.astro'
draft: false
tags: ['Software']
---

# How I ported my Latin diction&shy;ary to Next.js

[velut](https://www.velut.co.uk) is my website serving Latin vocabulary. I develop it in my free time, as an elaborate pet project.

The user interface is defined in [React](https://reactjs.org/) and the database is [MongoDB](https://www.mongodb.com/).

For the first couple of years, it used the <abbr title="MongoDB, Express, React, Node">MERN</abbr> technology stack, with MongoDB for the database, [Express](https://expressjs.com/) for the server, [Create React App](https://create-react-app.dev) for the front-end, and [Node](https://nodejs.org/) for the back-end language tying everything together. It also used [React Router](https://reactrouter.com) for client-side routing, [Axios](https://axios-http.com) for easier data-fetching, and [Mongoose](https://mongoosejs.com/) for easier querying of the MongoDB database.

Nowadays, velut continues to access my MongoDB database, but it uses [Next.js](https://nextjs.org), which is a framework that combines React and Express in Node with its own routing mechanism; crucially, it also allows for server-side rendering.

In this article I explain how I converted velut from its initial architecture to Next.js.

_As of writing this, velut uses Next.js 12.3.1; newer versions may be different to what’s explained below._

## Initial&shy;isation

Because I had never ported a site to Next.js before, I had a couple of false starts. Vercel (the company behind Next.js) has [several example sites](https://github.com/vercel/next.js/tree/canary/examples), including [one with a Mongoose connection](https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose). Eventually I realised that it would be easier to clone the Vercel template and copy the important bits of my velut code into it, rather than try to change the structure of the existing velut codebase to a Next.js architecture unfamiliar to me.

## Folder structure

The child folders of the root directory are:
- <samp>.github</samp>, which simply contains the GitHub workflow that makes the site redeploy to Fly whenever I push changes;
- <samp>css</samp>, which has the CSS for pages (see “Pages & components” section);
- <samp>components</samp>, which has JSX and CSS for components (again see “Pages & components” section);
- <samp>data</samp>, which includes some useful Json files;
- <samp>lib</samp>, which is for back-end functions or “business logic”;
- <samp>models</samp>, which defines the Mongoose schemata for the database results;
- <samp>pages</samp>, which determines what pages will be rendered on what routes (see “Pages & components” again); and
- <samp>public</samp>, which is the folder for static assets such as fonts and pictures.

### Pages & components

In Create React App, there’s not much distinction between a page and a component; everything is a React component that may or may not be rendered. Front-end routes (ie, URLs the user will see in their browser address-bar) are determined by the code you write using React Router, a dependency that is not bundled with Create React App. (Alternative routing libraries exist.)

Next.js, however, has a specific <samp>pages</samp> folder, and its contents matches the routing structure. A file called <samp>index.jsx</samp> inside a <samp>many</samp> folder inside <samp>pages</samp> will be rendered at <samp>www.velut.co.uk/many/</samp>, for instance.

Wildcards work too. A file called <samp>[word].jsx</samp> inside an <samp>english</samp> folder inside <samp>pages</samp> will be rendered at <samp>www.velut.co.uk/english/whatever</samp> and the string `"whatever"` will be available inside <samp>[word].jsx</samp> as the value of the URL parameter `word`.

Because (nearly) anything within <samp>pages</samp> will be a URL route, React components that are used within a page, or on multiple pages, must be in a separate directory. CSS, likewise, must be in a separate directory.

The way I’ve done it has a <samp>components</samp> folder and a <samp>css</samp> folder as siblings to <samp>pages</samp>. The <samp>components</samp> folder contains the JSX for components that are used on multiple pages (such as the footer), as well as CSS particular to those components. The <samp>css</samp> folder contains the CSS for pages in the <samp>pages</samp> directory, as well as a <samp>globals.css</samp> file that provides styles for the entire site.

This is not the most intuitive folder structure, but it works well enough.

## CSS scoping

CSS in Next.js is more awkward than I was expecting.

In Create React App, any `import 'blah.css'` statement makes the CSS apply across the app, rather than being scoped to a component. This is very convenient.

The downside is that styles that you had intended for one component can leak outside the component, if the selectors match. What’s worse, because of lazy loading, a page could look different on different visits, depending on whether you had previously visited a page that contained a conflicting CSS rule! There were a couple of instances of this in the MERN version of velut.

Fortunately, this is a very easy problem to fix: just make sure none your selectors match anything outside the intended component. A simple approach is to give all your components IDs or class-names, and prefix your selectors with those. For example, `#my-widget h2 { background: teal; } #my-widget p { font-style: italic; }` et cetera.

Of course, if you know you’re not using a class-name outside of a component, you can just use it. I had the code below in the MERN version of velut: I know that the class-names of `.title`, `.title-author`, and `.title-full` are exclusive to the `<Header>` component. Likewise I also had a CSS selector for `h1` because the only `<h1>` tag in the site is inside `<Header>`.

```jsx
import './Header.css'

let Header = (props) => {
	return (
		<header>
			<h1>
				…
				<span className="title-author"> Duncan Ritchie’s </span><br />
				<abbr className="title"> velut </abbr>
			</h1>
			<p className="title-full"> … </p>
		</header>
	)
}

export default Header
```

Next.js tries to shield us from CSS leakages by forcing to adopt one of several strategies for scoping our styles. I might not have picked the least awkward strategy, but the way I’m doing it now is CSS Modules. This transformed the above code into the following code.

```jsx
import styles from './Header.module.css'

let Header = (props) => {
	return (
		<header className={styles.header}>
			<h1>
				…
				<span className={styles.titleAuthor}> Duncan Ritchie’s </span><br />
				<abbr className={styles.title}> velut </abbr>
			</h1>
			<p className={styles.titleFull}> … </p>
		</header>
	)
}

export default Header
```

As you can see, the CSS is imported as an object that has a property corresponding to each class-name (or ID) used in a selector. The value of the property is a string such as `"Header_title__MSVhb"`, which is what ultimately gets used as the class-name.

In my source code, the CSS selectors became as follows. Note the camel-case because writing `styles.titleAuthor` is easier than `styles['title-author']`.

```css
.header h1 { … }
.header .titleAuthor { … }
.header .title { … }
.header .title::after { … }
.header p.titleFull { … }
```

The CSS the end-user receives is

```css
.Header_header__e7muk h1 { … }
.Header_header__e7muk .Header_titleAuthor__Z2GeS { … }
.Header_header__e7muk .Header_title__MSVhb { … }
.Header_header__e7muk .Header_title__MSVhb:after { … }
.Header_header__e7muk p.Header_titleFull__dS314 { … }
```

The idea of the output CSS classes being different to the source feels a little weird to me, but not too bad. It gets a bit more convoluted when a component imports from more than one CSS file, and uses a class from each in the same HTML element!

```jsx
import searchStyles from '../search/Search.module.css'
import advancedStyles from './AdvancedSearch.module.css'

…
<form className={advancedStyles.advancedSearch + ' ' + searchStyles.search}>
	…
</form>
…
```

I should probably refactor this. It would be an opportunity to try a different CSS strategy, such as Styled Components.

## Server-side rendering

Here’s what happens when a user visits a client-side–rendered website. They request a page, then receive a practically empty HTML file, along with a load of JavaScript. The browser executes the JavaScript, and that fills in the page with whatever the user is supposed to see.

With server-side rendering, this is inverted. It is the server that generates the full HTML for the page, so the first thing that the user sees for the page is the complete page. Next.js then performs a step called [“hydration”](https://en.wikipedia.org/wiki/Hydration_(web_development)), which attaches React event-handlers to the DOM nodes (the elements on the page), which re-renders elements and makes the site properly interactive with JavaScript.

Exceptions can be thrown when the rendered output on the server-side doesn’t match the initial render on the client-side — Next.js cannot hydrate the page. My “Subwords” page has a string of letters as an example of an input. Because this is generated at random on each page-visit, it needs to be generated in `getServerSideProps` (which runs on the back-end only), not anywhere like a `render` method (which runs on both back-end and front-end), otherwise the front-end will produce a value that does not match what the back-end produced.

### Form submission with HTML forms

When velut was client-side–rendered, I used React to handle the search forms that let the user look up words. For the Next.js version, I really wanted to support browsers that don’t support JavaScript. (The number of users actually visiting velut without JavaScript is probably zero or minuscule, but the principle is important to me.)

So I re-wrote the forms to use HTML form submission. I still let JavaScript take over if it’s available.

Here’s a simplified snippet. Without JavaScript, the Search form makes a `get` request to a route that redirects the user to the correct page. With JavaScript, the `handleSubmit` function performs that redirection.

```jsx
<form
	action="/redirectonsearch"
	method="get"
	onSubmit={this.handleSubmit}
	role="search"
>
	<input
		name="word"
		value={this.state.word || ''}
		onChange={this.handleInput}
		title={this.props.searchbarTitle || 'Type something here'}
		enterKeyHint="search"
	/>

	<button type="submit">
		Search!
	</button>
</form>
```

You might have noticed the Search form doesn’t have a `<label>` element. I think the context makes it obvious what the purpose of the `<input>` element is, even for people using screen-readers. But it wouldn’t be hard for me to add a label and make it visually hidden. Similarly, there’s a `<select>` menu (which I omitted from the code-snippet above) that probably should be labelled too. So I’ll do that.

### SSR & CSR on /many

velut has a [page for looking several Latin words up at once](https://www.velut.co.uk/many). If the page is rendered on the server, you have to wait for all your words to come back before you see any results. With client-side rendering, the view updates as the results come in, with a neat little progress-bar (incidentally my first use of the `<progress>` HTML element).

Here’s how I implemented the SSR/CSR distinction. The page now has two separate (but practically identical) components, called `ManyCSR` and `ManySSR`. The one you see depends on whether the URL contains `ssr=true` in the query-string. This is set when you submit your search, by means of a hidden `<input>` control. This hidden control is wrapped in `<noscript>` so it only applies when client-side JavaScript is unavailable (meaning SSR is needed).

```jsx
<noscript>
	<input hidden name="ssr" value="true" onChange="void()" />
</noscript>
```

## Head component

I set a default `<head>` for the entire site, by making a component using Next.js’s `Head` component and importing it in <samp>_app.js</samp>. Any property in the `<head>` can be overridden on any page by declaring another `Head` component in the JSX.

```jsx
function DefaultHead() {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="https://www.duncanritchie.co.uk/favicon.ico" />
      <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
      <meta name="theme-color" content="#000000" />
      <title>velut — a Latin rhyming dictionary</title>
      <meta name="Description" content="velut — a Latin dictionary with lists of rhymes, anagrams, homographs, consonyms, subwords, inflected forms, cognates, and links to other online resources." />
    </Head>
  )
}
```

For example, the About page (abridged):

```jsx
function About(props) {
  return (
    <>
      <Head>
        <title>About velut — a Latin rhyming dictionary</title>
        <meta name="Description" content="Explanation of the purpose and functionality of velut, the Latin vocabulary website" />
      </Head>

			<!-- Page content here -->
			<h1>About</h1>
			<p>I’m a software developer who loves the Latin language…</p>
		</>
  )
}
```

## <samp>_app.js</samp> & <samp>_document<wbr>.js</samp>

Next.js allows a couple of files in the <samp>pages</samp> folder that are special because they are not pages themselves, but Next.js uses them to template the actual pages. In <samp>_app.js</samp> is where I have my default `<head>` component (see previous section) and a footer for all pages.

```jsx
function App({ Component, pageProps }) {
  return (
    <>
      <DefaultHead />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
```

If you don’t have <samp>_document.js</samp>, Next.js won’t mind, but your `<html>` elements would be missing the `lang` attribute. Since the text of the velut website is mostly English (apart from the Latin words of course), I define <samp>_document.js</samp> simply like this;

```jsx
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
```

You can imagine specific pages being passed into `App` as `Component`, then `App` getting passed into `MyDocument` as `Main`. That’s what seems to happen.

## Error pages

I have files in the <samp>pages</samp> folder named <samp>404.js</samp> and <samp>500.js</samp>, which define custom pages to show for 404 (Not found) and 500 (Internal server error). So if you navigate to [www.velut.co.uk/some/path/of/gobbledegook](https://www.velut.co.uk/some/path/of/gobbledegook), you get something reasonable.

If you search for a [word that’s not in the dictionary](https://www.velut.co.uk/NotARealWord), you also get a 404 status, but this is given by the `Word` page, not <samp>404.js</samp>.

I also have an <samp>_error.js</samp> file, which applies if the server fails with any other error.

```jsx
function ErrorPage({ type = '/' }) {
  return (
    <>
      <Head>
        <title>Error on velut — a Latin rhyming dictionary</title>
      </Head>
      <div>
        <Header textBeforeTitle="Error" />
        <Search type={type} searchbarTitle="Type a Latin word" />
        <p>
          <span>Please try searching for something else!</span>
        </p>
      </div>
    </>
  )
}
```

Being able to send correct status-codes like 404 and 500 is a major reason I like server-side rendering.

## Deploy&shy;ment on Fly

The company behind Next.js is Vercel, which is also the name of their hosting platform. The Vercel platform is well-suited to host Next.js sites, and is popular for that purpose.

When I deployed velut to Vercel, it all worked fine, apart from one feature of velut: [Anagram Phrases](https://www.velut.co.uk/anagramphrases). This feature generates permutations of Latin words with all the letters you specify. It’s resource-intensive, so I moved the computation work onto a separate Node.js thread. (It should really be multi-threaded, but so far I’ve only got it on one thread.)

Vercel didn’t like that, and returned 500 statuses whenever you searched for any anagram phrases. So I added the 500 error-page mentioned in the previous section, and looked for alternatives to Vercel.

[Fly](https://fly.io/) was what I landed on. It’s a bit weird in that you use the command-line to interact with it. But it works, even for Anagram Phrases. (“If you can build it into a Dockerfile, we can run it,” says the Fly website.)

The [Toml file](https://github.com/DuncanRitchie/velut/blob/main/fly.toml) in the root folder is where Fly keeps its settings.

I set a [GitHub workflow](https://github.com/DuncanRitchie/velut/blob/main/.github/workflows/main.yml) up to deploy whenever I push changes to GitHub.

```yml
name: Fly Deploy
on: [push]
env:
  FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
jobs:
  deploy:
    name: Deploy app
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: superfly/flyctl-actions/setup-flyctl@master
      - run: flyctl deploy --remote-only
```

## TypeScript

The source-code for velut website is entirely in JavaScript (and CSS). At one point I tried to switch to TypeScript, which I know Next.js supports. For some reason, it didn’t work. Maybe I was doing it wrong. I might try again sometime in the future — type-safety is so nice!

Then again, the threading on Anagram Phrases might not play nicely with TypeScript. It’s something for future investigation.

## Comparison with other frame&shy;works

I don’t know much about alternatives to Next.js, by which I mean modern web frameworks using JavaScript/TypeScript with powerful features such as server-side rendering. But several have popped up in the past couple of years. I chose Next.js for its maturity, but in 2023 options include [Remix](https://remix.run/), [Fresh](https://fresh.deno.dev/), [Qwik](https://qwik.builder.io/), [Enhance](https://enhance.dev), and possibly even [Astro](https://astro.build/).

## Further reading

Code for velut is on [GitHub](https://github.com/DuncanRitchie/velut).

For another person’s experience porting a React website from Create React App to Next.js, I recommend this [article by Kitty Giraudel](https://kittygiraudel.com/2021/08/24/from-cra-to-next/).

Here’s a helpful [article by Monica Powell](https://aboutmonica.com/blog/server-side-rendering-react-hydration-best-practices/) on SSR and hydration.

The readme for this [GitHub repo](https://github.com/theninthsky/client-side-rendering) compares CSR to SSR, and notes that SSR makes performance worse (because the entire page gets rendered on navigation).

This [article by Josh Collinsworth](https://joshcollinsworth.com/blog/self-fulfilling-prophecy-of-react) is skeptical of the value of React beyond sheer popularity. I still like JSX (the templating language React uses), even if writing `className` and `htmlFor` instead of the attributes `class` and `for` is clumsy.

Next.js has a lot of [official documentation](https://nextjs.org/docs/getting-started), including a [guide to moving from Create React App](https://nextjs.org/docs/migrating/from-create-react-app).

And for the lolz, here’s a [song from Dylan Beattie about rewriting code](https://www.youtube.com/watch?v=xCGu5Z_vaps).

## Conclusion

velut is a complex website and Next.js is a powerful framework. I like its file-based routing system. I really like its support for both server-side and client-side rendering. Converting velut to Next.js was tricky, and the way I handled the CSS seems particularly verbose. There are other frameworks with similar capabilities. But I’m glad I made the switch from Create React App to Next.js.

## Appendices

### Timeline of velut development

<details><summary>Show timeline</summary>

<dl>
<dt>2014 Sep</dt> <dd>I <a href="https://www.duncanritchie.co.uk/aboutme#latin">began a degree</a> in Classics (ie, Latin and Ancient Greek), though I later dropped the Greek.</dd>
<dt>2016 Feb</dt> <dd>I started collecting Latin vocabulary in an Excel file.</dd>
<dt>2018 Jun 28</dt> <dd>Graduation from university with a masters in Latin.</dd>
<dt>2019 Feb</dt> <dd>I learnt React at a web development bootcamp.</dd>
<dt>2019 Apr 18</dt> <dd>I initialised a Create React App project for the <a href="https://github.com/DuncanRitchie/velut/commit/3d57a9cac7d2050c2b17d2e544cd0889e863601e">initial commit</a> in the velut repository.</dd>
<dt>2019 May 30</dt> <dd><a href="https://www.velut.co.uk">www.velut.co.uk</a> went live, even though it didn’t yet have a working database connection.</dd>
<dt>2019 Jul 02</dt> <dd>Entering a Latin word in the searchbar would return the word from the MongoDB database.</dd>
<dt>2019 Jul 09</dt> <dd>Job interview with a software company, in which I demoed the website. They offered me the job and I’m still working there!</dd>
<dt>2019 Jul 17</dt> <dd>I added a <a href="https://www.velut.co.uk/subwords">Subwords</a> page for finding all the Latin words contained in a string of letters. I thought it would be fun. I’ve since improved the code.</dd>
<dt>2019 Aug 07</dt><dd>Functionality for generating <a href="https://www.velut.co.uk/anagramphrases">multiword anagrams</a>, up to twelve words. I thought it would be fun. I have since improved the code <em>immensely</em>. (Here’s that <a href="https://github.com/DuncanRitchie/velut/commit/69353ce4292c31e49e249851624dbcd41d61d4ee">commit for Anagram Phrases</a>. There’s a lot of nesting because I hadn’t figured out recursion.)</dd>
<dt>2020 Nov 14/15</dt> <dd>Most of the <a href="https://www.velut.co.uk/advanced">Advanced Search</a> functionality.</dd>
<dt>2021 May<dt> <dd><a href="https://www.velut.co.uk/many">Page for looking several Latin words up at once</a>.</dd>
<dt>2021 Sep 19</dt> <dd>I made my <a href="https://github.com/DuncanRitchie/velut/commit/602fc2ccf8868c3c52f0264abb3354c357c1c5a2">first Next.js commit in velut</a>.</dd>
<dt>2022 May 21</dt> <dd>Nearly three hundred commits since starting Next.js, I switched <a href="https://www.velut.co.uk">www.velut.co.uk</a> over to the new site. (I like to commit little and often!)</dd>
</dl>

</details>

### Trello

I use Trello for managing my to-do lists. Below is the list of 109 cards I completed for porting velut to Next.js, in case you want a sense of what all I did in eight months.

<details><summary>Show list</summary>

- Initialise default Next.js app
- Mongoose connection
- Mongoose schemata
- Footer component
- About front-end
- `superscriptLemmaTag` element
- About back-end (words & lemmata counts)
- Global CSS
- Header component
- Basic word lookup (eg /excellentium => “Word found”, /doesnotexist => “Word not found”)
- Home front-end (/)
- Footer should not display link to current page
- Words front-end (/:word)
- Dictionaries component
- Homographs on Word
- 404 page — ie “word not found” with Search & Dictionaries
- Search bar should include search term from URL
- Word front-end should also appear at /perfect/:word, /vowels/:word, etc
- Home front-end should also appear at /perfect, /vowels, etc
- Selection a Search menu item should change the text of `dropdownSelect`
- Search component
- Make sure Arrow keys work on the Search dropdown
- Rhymes on Word
- Flags in the Lemma component
- Cognates in the Lemma component
- Forms in the Lemma component
- Lemma component
- Words back-end
- English Home front-end
- English front-end
- Lemmata on English should be sorted according to `sortLemmataOnMeaning`
- Lemmata on English should be limited to 100
- English back-end
- Flags should appear in Lemma component on pages such as English
- Text of `dropdownSelect` should match the rhyme-type navigated to (eg /anagrams/capis should show “Anagrams”)
- Lemmata on Word should be ordered as in the `LemmaArray` field
- Latin Link component
- Subwords Home front-end (/subwords)
- Subwords front-end (/subwords/:string)
- Subwords back-end
- Fix error on Subwords page where Next.js says no `MONGODB_URI` variable is defined, although it is [I just replaced the error with a `console.log`]
- Anagram Phrases Home front-end (/anagramphrases)
- Anagram Phrases front-end (/anagramphrases/:string)
- Anagram Phrases back-end
- Set a limit on the number of letters input to Anagram Phrases
- Empty input from /subwords/exemplum should go to /subwords, not /subwords/subwords
- Next.js forms practice ([tech-stack inventor](https://github.com/DuncanRitchie/nextjs-tech-stack-creator))
- Pull Redirect out of Search so Advanced Search can also use it
- Advanced Search component
- Advanced back-end
- Advanced front-end (/advanced?)
- Many back-end for SSR
- Many front-end for SSR (/many?)
- Ensure fulmar pic is Webp whenever possible; use CSS `image-set`? [Fulmar pic is always Webp]
- Favicon
- Delete /nextjs folder that was containing an early attempt at recreating velut in Next.js
- Deploy on Vercel (or an alternative) [velut.vercel.app]
- Footer should be one line on desktop, not wrapping
- Page descriptions
- Fix CSS of `.showingResultsFor` on English
- Stop search going to /[type]/consonyms when inputting the empty string from /consonyms/exemplum (for example)
- 404 page on URLs such as /gobbledegook/this/is/nonsense
- Remove `import React from 'react'` because we don’t need it in React 17
- Ensure site doesn’t throw any errors when searching for ../ etc
- Bring in package.json fields such as keywords
- Determine what should be in /api and what should not [nothing]
- Delete extraneous files from “pets” example project
- Re-organize folders
- Copy readme from main onto nextjs branch
- Add a valid robots.txt file
- `<html>` should have lang attribute
- 404 pages for missing words should have status code 404
- Fix bug on English when there are no lemmata found
- Pages for “no results found” should have status code 404 (English, Subwords, Anagram Phrases, Advanced, Many)
- Explore using a form submission to redirect without client-side JavaScript
- Convert search dropdown into `<select>` with `<option>`s
- Extract Navigation functionality out of Search<wbr>/AdvancedSearch<wbr>/Many into its own component [no longer needed]
- Correct positioning of .dropdownArrow::after — it’s a couple of pixels too high
- Make sure searches for “foo” from /subwords/bar go to /subwords/foo, not /foo
- Change URL for search from /search to /redirectonsearch (in case the user searches for the word “search”)
- Convert AdvancedSearch to HTML form
- Fix Advanced CSS
- Why is Home not getting the `home` class?
- CSS for `.link-to-current-word` — should be `{ color: #5f5f5f; }`
- Find out why About gave 500 Internal Server Error [server was simply down]
- Many should work without client-side JavaScript
- Remove double border-top from Spelling section of Advanced form
- AdvancedRubric should be `<details>` with `<summary>`
- Improve performance on `findSubwords`
- Fix navigation when… [no longer happens]
- Improve performance on `findAnagrams`
- Move processing for Anagram Phrases to a worker thread
- Research how to serve client-side–rendered content to browsers (not search engines) where appropriate
- Many should use client-side JavaScript (if available)
- If Anagram Phrases runs out of memory, a sensible error should be given (not default Next.js 500 page)
- Deploy on Fly.io!
- Switch www.velut.co.uk over from MERN site to Next.js site
- Stop Anagram Phrases throwing 500s in production [move to Fly solved this]
- Update readme for Next.js/Fly being used in production on www.velut.co.uk
- Update About section for Next.js/Fly being used in production on www.velut.co.uk
- Remove “undefined” classes (such as Word has) and unused classes
- Footer link to eg /english should render on pages like /englished (which is a 404 page, not English)
- Stop /advanced/exemplum listing all the words in the database!
- “Back” button should not be rendered without JavaScript
- “Back” button should render only if there are pages in history
- Standardise whether Search component receives `type` or `prefix` in props [it receives `type` only]
- Use arrowhead SVG on `<summary>` in Advanced
- Delete commented-out MERN code
- Refactor

</details>
