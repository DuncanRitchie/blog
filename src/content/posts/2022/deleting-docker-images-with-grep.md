---
title: Deleting Docker images with grep
date: 2022-10-26
draft: false
tags: ['Software']
---

# Deleting Docker images with `grep`

To delete old Docker images on a Linux server with names that contain a substring:

```
docker rmi $(docker images | grep 'substring-to-find-in-images')
```

This gives error-messages if images are used in running containers, but deletes the other images.

(via a user called Rambler on [Stack Overflow](https://stackoverflow.com/a/40084197))
