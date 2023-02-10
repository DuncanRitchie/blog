---
date: 2021-09-29
title: Difficulties I’ve had with object-oriented codebases
draft: false
tags: ['Software']
---

# Difficulties I’ve had with object-oriented codebases

I have of course been guilty of some of these myself.

- Lack of documentation (or out-of-date documentation) about how to get started as a developer on a project.
- Two classes that seem like they could be structured similarly, but are not, without comments as to why.
- Deeply nested code-blocks (eg a for-loop inside another for-loop inside an if/else inside a try/catch/finally).
- Variable names that don’t obviously describe what the variable is.
- Variables with similar names within the same scope.
- Folder structures where it is difficult to reason about where the files are.
- Complicated regular expressions without a comment explaining their purpose.
- Frameworks that use code generation to create unnecessary layers of abstraction that become difficult to reason about (this is Liferay).
- IDEs that don’t distinguish between Java and JavaScript (this is Eclipse).
- Unhelpful error messages — I once received something along the lines of “Error in BeanLocator invocation” because I’d mistyped a bracket. (Again, this is Liferay. Perhaps this isn’t a problem with the codebase per se, but it does relate to how convoluted object-oriented frameworks can get.)
- Lack of automated tests, which would explain the desired behaviour of different parts of the codebase as well as highlighting where things are broken.
