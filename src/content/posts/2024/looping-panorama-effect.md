---
title: A looping panorama effect in CSS
date: 2024-08-30
draft: false
tags: ['Software']
---

# A looping panorama effect in CSS

<div class="panorama-outer">
  <div class="panorama-inner glen-banchor">
    <img src="https://live.staticflickr.com/791/39238043540_037669a1aa_h.jpg" alt="360-degree panorama in Glen Banchor" width="750"/>
    <img src="https://live.staticflickr.com/791/39238043540_037669a1aa_h.jpg" alt="360-degree panorama in Glen Banchor" width="750" aria-hidden="true"/>
  </div>
</div>

I recently was making a webpage with a panoramic photograph that covered all 360 degrees of view horizontally.
To really flaunt how panoramic the picture is, I decided to add an animation to it to make it pan continuously across the screen.

## Basic technique

The image needed to be duplicated, so the left side of the second image would come into view when the first image came to its end, to maintain the continuous effect.
I put the `aria-hidden="true"` attribute on the second image, to prevent screen-reader software from announcing the same image information twice.

For the actual effect, I wrapped both images in two `<div>` elements (`.panorama-outer` and `.panorama-inner`), and applied the following CSS:

```css
.panorama-outer {
	overflow-x: hidden;
	--panorama-min-width: 800px;
}
.panorama-inner {
	position: relative;
	display: flex;
	width: calc(2 * max(100%, var(--panorama-min-width)));
}
.panorama-inner > * {
	animation: 30s infinite linear panorama;
	width: 100%;
}
.panorama-inner img {
	width: 100%;
	min-width: var(--panorama-min-width);
}
@keyframes panorama {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(calc(-1 * max(100%, var(--panorama-min-width))));
	}
}
```

The width of each image within the panorama is 100% of the available space (ie, it’s the same width as whatever element is the parent of `.panorama-outer`), unless that width is smaller than the `--panorama-min-width` variable, in which case the width is equal to that variable.
This means that if your screen is wide enough, you see all 360 degrees of the panorama, no more, no less, whatever point the animation is at.
But on smaller screens, the photo isn’t squashed to being ridiculously small.

## Play/paused states

I also added a hover style so the animation would pause when you mouse over it.

```css
.panorama-inner:hover > * {
	animation-play-state: paused;
}
```

And for users who prefer not to have weird animations on the websites they visit, I flip the play/paused states, so the panorama doesn’t move until you mouse over it.

```css
@media (prefers-reduced-motion) {
	.panorama-inner > * {
		animation-play-state: paused;
	}
	.panorama-inner:hover > * {
		animation-play-state: running;
	}
}
```

## Image masks

The panorama above is (in my opinion) the highest-quality 360-degree panorama I’ve taken.
I confess it’s not entirely seamless at the joining edge, but it’s otherwise fairly well blended and it doesn’t have gaps where I’ve failed to capture imagery.
And the lighting is pretty, with the winter sun low over a mountain.

(It’s of Glen Banchor, above Newtonmore in the Scottish Higlands, in case you were wondering.)

The webpage I was making had a different panorama, taken at Loch Mhòr (also in the Scottish Highlands).
It was poorer-quality, and had empty space at the top and bottom where I hadn’t taken enough photos of the sky and ground.
I cut the empty space out by providing a mask image, so the page background shows through.

![Mask image for Loch Mhòr panorama](/blog/images/2024/2012Apr05_panorama-mask.webp)

```css
.loch-mhor img {
	mask-image: url(/blog/images/2024/2012Apr05_panorama-mask.webp);
	mask-mode: luminance;
	mask-size: 100%;
}
```

<div class="panorama-outer">
  <div class="panorama-inner loch-mhor">
    <a href="https://www.duncanritchie.co.uk/childhood-blog/2012Apr10" title="2012 Apr 10 on my Childhood Blog"><img src="https://live.staticflickr.com/7083/7178095946_5c9daa99bd_b.jpg" alt="Panorama beside Loch Mh&#242;r" width="580"/></a>
    <a href="https://www.duncanritchie.co.uk/childhood-blog/2012Apr10" title="2012 Apr 10 on my Childhood Blog" aria-hidden="true"><img src="https://live.staticflickr.com/7083/7178095946_5c9daa99bd_b.jpg" alt="Panorama beside Loch Mh&#242;r" width="580"/></a>
  </div>
</div>

What was the webpage I was making?
I was [recreating my Childhood Blog](/blog/childhood-blog) with its [article for 2012 Apr 10](https://www.duncanritchie.co.uk/childhood-blog/2012Apr10), which was when I passed by Loch Mhòr en route to Loch Ness and I made some weird references to the latter loch’s monster because I was a weird kid.

## Cropping

The panorama can also be cropped, for example by giving the `img` elements an `aspect-ratio` property that doesn’t match the aspect ratio of the image file, and by setting `object-fit` to `cover`.
The `object-position` property can be useful for moving the image relative to the cropping.

```css
.cropped img {
	aspect-ratio: 1600 / 240; /* The ratio should be greater than the image’s, to crop the top/bottom off. */
	object-fit: cover; /* The image should fill the space without distortion, so there’ll be cropping. */
	object-position: center 48%; /* The first value here doesn’t really matter because there’s no cropping at the left/right sides. The second value controls the vertical offset, and the cropping is in that dimension. */
}
```

## Commentary

I like it more when the panorama is good-quality, without an obvious join.
What do I think when a composite image is merged nicely? ’S blended!

The panning effect is like the old `<marquee>` text element in HTML, but more customisable and (to be quite frank) more reasonable.
I don’t think I’d want to see text constantly sliding across the screen, and I certainly wouldn’t need a specific HTML element for that when we have modern CSS!
But for a panorama which joins back on itself, the looping makes sense.

Another difference is that a `<marquee>` element’s content doesn’t join back on itself.
There’s always a space after the end of the content: all the content leaves the screen before the start of the content appears again.

<figure>
<marquee scrollamount="2" style="background: var(--page-background); padding-block: 0.25em;">
<strong>Breaking news:</strong>
Old HTML doesn’t break.
It just gets “deprecated”, which means we don’t care if it does break.
</marquee>
<figcaption>An actual <code>&lt;marquee&gt;</code> element
</figure>

## Gallery

To finish this article, let’s see some more perpetually panning panoramas.

<div class="panorama-outer">
  <div class="panorama-inner dun-skeig">
    <img src="https://live.staticflickr.com/1652/24229143554_90f4d5ee57_h.jpg" alt="360-degree panorama above the West Loch Tarbert" width="750"/>
    <img src="https://live.staticflickr.com/1652/24229143554_90f4d5ee57_h.jpg" alt="360-degree panorama above the West Loch Tarbert" width="750" aria-hidden="true"/>
  </div>
  
  <div class="panorama-inner creag-bheag">
    <img src="https://live.staticflickr.com/1688/23720370469_c4f30bea45_h.jpg" alt="360-degree panorama on a mountain in snow and heather" width="750"/>
    <img src="https://live.staticflickr.com/1688/23720370469_c4f30bea45_h.jpg" alt="360-degree panorama on a mountain in snow and heather" width="750" aria-hidden="true"/>
  </div>
  
  <div class="panorama-inner chester-meadows">
    <img src="https://live.staticflickr.com/4617/38759532655_1e03c6bbf9_h.jpg" alt="360-degree panorama on meadows in frost" width="750"/>
    <img src="https://live.staticflickr.com/4617/38759532655_1e03c6bbf9_h.jpg" alt="360-degree panorama on meadows in frost" width="750" aria-hidden="true"/>
  </div>
  
  <div class="panorama-inner carn-ban-mor">
    <img src="https://live.staticflickr.com/65535/49761754026_6d7306cd00_h.jpg" alt="360-degree panorama on a path through heath amid mountains" width="750"/>
    <img src="https://live.staticflickr.com/65535/49761754026_6d7306cd00_h.jpg" alt="360-degree panorama on a path through heath amid mountains" width="750" aria-hidden="true"/>
  </div>
  
  <div class="panorama-inner earls-eye">
    <img src="https://live.staticflickr.com/65535/51258784760_49cc527fda_h.jpg" alt="360-degree panorama on snowy meadows by the river Dee in Chester" width="750"/>
    <img src="https://live.staticflickr.com/65535/51258784760_49cc527fda_h.jpg" alt="360-degree panorama on snowy meadows by the river Dee in Chester" width="750" aria-hidden="true"/>
  </div>
</div>

(The locations for these were Dun Skeig hill fort in Kintyre, Creag Bheag mountain above Kingussie, the Meadows in Chester, Carn Ban Mor in the Highlands, and the Meadows in Chester again.)

<style>
  .panorama-outer {
    overflow-x: hidden;
    --panorama-min-width: 800px;
  }
  .panorama-inner {
    position: relative;
    display: flex;
    width: calc(2 * max(100%, var(--panorama-min-width)));
  }
  .panorama-inner > * {
    animation: 30s infinite linear panorama;
    width: 100%;
  }
  .panorama-inner img {
    width: 100%;
    min-width: var(--panorama-min-width);
  }
  .panorama-inner:hover > * {
    animation-play-state: paused;
  }
  .loch-mhor img {
    aspect-ratio: 580 / 100;
    mask-image: url(/blog/images/2024/2012Apr05_panorama-mask.webp);
    mask-mode: luminance;
    mask-size: 100%;
  }
  .glen-banchor img {
    aspect-ratio: 1600 / 176;
  }
  .dun-skeig img {
    aspect-ratio: 1600 / 227;
  }
  .creag-bheag img {
    aspect-ratio: 1600 / 339;
  }
  .chester-meadows img {
    aspect-ratio: 1600 / 689;
  }
  .carn-ban-mor img {
    aspect-ratio: 1600 / 653;
  }
  .earls-eye img {
    aspect-ratio: 1600 / 260;
    object-fit: cover;
  }
  @keyframes panorama {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-1 * max(100%, var(--panorama-min-width))));
    }
  }
  @media (prefers-reduced-motion) {
    .panorama-inner > * {
      animation-play-state: paused;
    }
    .panorama-inner:hover > * {
      animation-play-state: running;
    }
  }
</style>
