---
date: 2022-05-09
title: Vim
layout: ../../layouts/Post.astro
draft: false
tags: ['Software']
---

# Vim

I’ve been editing files on a Linux server, using the command-line program Vim. It’s not the most intuitive pieces of software, so I wrote this note to myself.

I’ve learnt some things about Vim. There’s a “command mode” which you need to be in to quit, and an “insert mode” which you need to be in to edit the file.
To go to insert mode from command mode, type <kbd>i</kbd>, and to go the other way press <kbd>Esc</kbd> until the word <samp>INSERT</samp> disappears from the bottom of the terminal. 

To save and exit Vim, enter command mode then type <kbd>:</kbd><kbd>w</kbd><kbd>q</kbd><kbd>Enter</kbd>.
Or, do what I did before I learnt how to toggle between the modes, and close the terminal and reconnect to the server — Vim stores your changes in a .swp file and when you reopen the file in Vim, it prompts you to replace the file on disk with the swap file!

(To delete swap files, you can do `find . -type f -name "*.sw[klmnop]" -delete` as I found out from [this Super&nbsp;User post](https://superuser.com/a/805168).)
