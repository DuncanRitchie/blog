---
title: Aliases for import paths in Nest.js
date: 2023-06-29
draft: false
tags: ['Software']
---

# Aliases for import paths in Nest.js

I was working on a [Nest.js](https://nestjs.com/) API, and I had a few import statements that looked like `import { foo } from '../../../../bar/bat/qux/foo';` with sequences of `../` as it traversed the directory tree up to the /src folder that contains the /bar folder so it can come down to `foo`.

This works fine, but looks a bit ugly.
A colleague recommended I use TypeScript path aliases to rewrite the statements as `import { foo } from '@/bar/bat/qux/foo';`

We’re using Nest.js v9.0.0 and Jest 29.5.0.

Here’s how I did that:

- Check that tsconfig.json has `"baseUrl": "./"` (it does).
- Add to tsconfig.json the `src` folder and any subfolders/files in it you want, like this:

```json
"paths": {
	"@/*": ["src/*"],
	"@core/*": ["src/core/*"],
	"@db-entities": ["src/db-entities/index"],
	"@shared/*": ["src/shared/*"]
}
```

- Check that the `"jest"` object in package.json has `"rootDir": "src"` (it does).
- Add to the `"jest"` object in package.json:

```json
"moduleNameMapper": {
      "^@/(.*)$": "<rootDir>/../src/$1",
      "^@core/(.*)$": "<rootDir>/../src/core/$1",
      "^@db-entities(.*)$": "<rootDir>/../src/db-entities$1",
      "^@shared/(.*)$": "<rootDir>/../src/shared/$1"
}
```

- If you have a config file for end-to-end tests, such as jest-e2e.json, add the same `moduleNameMapper` property to it:

```json
"moduleNameMapper": {
      "^@/(.*)$": "<rootDir>/../src/$1",
      "^@core/(.*)$": "<rootDir>/../src/core/$1",
      "^@db-entities(.*)$": "<rootDir>/../src/db-entities$1",
      "^@shared/(.*)$": "<rootDir>/../src/shared/$1"
}
```

- Folders in /src can now be referenced with `@/`, as in `@/employees/dto/employee.def` for example.
- The /src/shared folder in particular can be referenced with `@/shared` (as per the previous point) or `@shared` — we prefer the latter because it’s a character shorter.
- Aliases are used likewise for the /src/core folder and the /src/db-entities/index.ts file.
