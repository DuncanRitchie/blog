---
date: 2026-02-15 20:30:00
title: Getting Json from Trello
draft: false
tags: [Software]
---

# Getting Json from Trello

Trello is a useful app for making to-do lists on Kanban-style boards, and I use it a lot.
I recently discovered that appending .json to a Trello URL gives you the Json.
This can be handy if you want to copy (for example) the names of the columns on a board, or the cards in a column, into other formats.

So if you want the data from <samp>https://trello.com/b/8uDEdjT7/blog</samp> (my board of tasks for this blog) in Json format, go to <samp>https://trello.com/b/8uDEdjT7/blog.json</samp>.
This works for boards and cards.

(Neither of those particular links will work for you if you’re not logged in as me, of course.
But you get the idea.)

<figure>
	<img src="./images/2026/trello-blog-board.png" alt="Board of columns including “Ideas for articles”, “Articles being written”, and “Articles posted”" width="750" style="aspect-ratio: 915 / 412" />
	<figcaption>My “Blog” board</figcaption>
</figure>
<figure>
	<img src="./images/2026/trello-blog-board-json.png" alt="Json screenshot with keys including “id”, “nodeId”, “name”, etc" width="750" style="aspect-ratio: 915 / 412" />
	<figcaption>Json for my “Blog” board</figcaption>
</figure>
