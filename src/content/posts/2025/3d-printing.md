---
title: Learning 3D printing
date: 2025-11-07 23:30:00
draft: false
tags: [Software]
---

<figure class="float-right">
<img
	src="./images/2025/3d-printer.webp"
	alt="3D printer printing a small orange cube"
	width="420"
	style="aspect-ratio: 3 / 4;"
/>
<figcaption>Printing a 20mm cube in orange PLA plastic.</figcaption>
</figure>

# Learning 3D printing

In August and September 2025, I undertook a training course in advanced manufacturing at the 3D&nbsp;360 school in Leigh.
This included tuition in concepts such as virtual/augmented reality, robotics, Big Data, cybersecurity, and the Internet of Things, but also included more hands-on education in computer-aided design and 3D printing.

<figure>
<img
	src="./images/2025/3d360-certificate.webp"
	alt="Certificate congratulating Duncan Ritchie on completing the 3D 360 Advanced Manufacturing bootcamp"
	width="480"
	style="aspect-ratio: 725 / 450;"
/>
<figcaption>And I got a certificate!</figcaption>
</figure>

A somewhat unbelievable perk of the course is that you get your own 3D printer to assemble, and it’s yours to keep if you’re successful in that and you complete the rest of the course.

So I now have my own 3D printer, a Creality Ender&nbsp;3.

So far, I’ve printed some accessories for the printer itself — a cover for the base fan, a back panel for the screen, and some clips for keeping cables tidy.
I’ve printed an articulated lizard and a balancing bird.
I’ve also printed some designs of my own, such as a keyring fob (bearing my fulmar logo and my name), a Christmas ornament in the shape of a snowman, and a dinosaur, which is surprisingly cute.
My next design will be a trophy for a quiz I help to run among my friends.

<div class="float-left" style="max-width: 360px;">
<figure>
<img
	src="./images/2025/snowman-infill.webp"
	alt="Snowman being 3D-printed, at this point a hollow white sphere with struts criss-crossing inside"
	width="360"
	style="aspect-ratio: 4 / 3;"
/>
<figcaption>The struts in the print’s interior are called infill.</figcaption>
</figure>
<figure>
<img
	src="./images/2025/snowman.webp"
	alt="Completed plastic snowman made of three white truncated spheres with arms and facial features, plus a loop coming out of the head"
	width="360"
	style="aspect-ratio: 3 / 4;"
/>
<figcaption>I deliberately avoided overhang in this design — after all, a real snowman is made from piling snow on top of snow, without supports.</figcaption>
</figure>
</div>

A family member whose company makes laboratory equipment gave me a digital model of one of their products.
The real thing is very small, so an enlarged physical replica could be useful in demonstations.
For me, more trivially, the white plastic of the print resembled snow; it’s actually what inspired me to make a snowman ornament specifically.

To do my <abbr title="computer-aided design">CAD</abbr>, I use a program called [Autodesk Fusion](https://www.autodesk.com/uk/products/fusion-360/personal-form).
However, I did my dinosaur in [Zbrush](https://www.maxon.net/en/zbrush) while at 3D 360 — Zbrush is good for making shapes that look more organic than geometric.
Either piece of CAD software can export an STL file, which I then “slice” with the open-source program [Cura](https://curaslicer.com/).
(Slicing means generating “Gcode” instructions for how my printer should print the model.)
My printer reads from a micro-SD memory card containing my sliced models.

The printer has an extruder, which is the part that pulls plastic filament from a spool into a tube (the Bowden tube) and thus into the nozzle of the print head.
The print head can move precisely in three dimensions to wherever the plastic needs to be deposited, and the nozzle is heated to around 200°C for the material to melt.
On leaving the nozzle, the plastic cools and hardens into shape.
The material is put down layer by layer, from bottom to top, so the first layer is on the buildplate (a flat metal surface heated to around 60°C) and subsequent layers lie on top of the previous layers.

<div class="float-right" style="max-width: 420px;">
<figure>
<img
	src="./images/2025/dino-with-supports.webp"
	alt="Yellow plastic dinosaur with yellow plastic supports under the head, tail, and belly"
	width="420"
	style="aspect-ratio: 2 / 1;"
/>
<figcaption>My dinosaur needed quite a lot of supports under its head, tail, etc.</figcaption>
</figure>
<figure>
<img
	src="./images/2025/dino.webp"
	alt="Yellow plastic dinosaur on a stack of white Post-it notes"
	width="420"
	style="aspect-ratio: 4 / 3;"
/>
<figcaption>The supports created are fairly easy to remove.</figcaption>
</figure>
</div>

The base of the printed object should have enough contact with the buildplate for the object to stick in place while it’s being printed.
Similarly, care should be taken about areas of “overhang” (parts of your design jutting out sideways), because any material being laid down needs to have something underneath it.
Fortunately, slicer software can generate supports automatically, and can re-orient the design for more buildplate adhesion and less overhang.

The plastic I have is all PLA — polylactic acid.
It’s very popular for 3D printing because it’s cheap and somewhat durable and it’s sold in a variety of colours, and of course because it melts nicely in the Bowden tube and sets when it’s cooled down.
Being made from plant material, it’s reasonably eco-friendly.
(To get rid of it, there are specialist recycling facilities, or you can put it in compost/landfill and it will eventually bio-degrade.
At the moment, of course, I’m more interested in making models and playing with the printer than in binning much stuff.)

<figure style="max-width: 420px;" class="float-left">
<img
	src="./images/2025/printer-bed-and-screen.webp"
	alt="3D printer showing the screen while a cube is being printed"
	width="420"
	style="aspect-ratio: 4 / 3;"
/>
<figcaption>The screen here shows that the plastic is being heated to 205°C and the bed that the print is sitting on is at 50°C. In my experience, it’s fine to be ten degrees off from this for PLA.</figcaption>
</figure>

It feels pretty weird to be able to create my own plastic knick-knacks.
Pretty fun, though.

As a software developer, I’m familiar with writing code that makes cool things happen on my computer (or indeed on other people’s devices through the magic of the internet).
As an amateur photographer, I know I can look at real-world scenes and create 2D digital representations of them with my camera.
But being able to model an object on screen, and have my printer create a physical manifestation of that… that’s like a third dimension being opened up to me.

At the start of this year, or indeed the start of this summer, I would never have anticipated that I would get into CAD or 3D printing.
And to be fair, I’m still not sure what I’ll do with this skill.
I still expect my next job to probably be in software development.
But I might now find work in 3D printing or a related discipline; and even if I don’t, it’s more evidence that I’m capable of working in modern technologies that are very useful in today’s world.

<figure class="float-right">
<img
	src="./images/2025/autodesk-fusion-snowman-detail.webp"
	alt="CAD sketch of my snowman’s arm and shoulder, showing measurements"
	width="400"
	style="aspect-ratio: 1918 / 1078;"
/>
<figcaption>Sketching out my snowman.</figcaption>
</figure>

Even if it feels like a gimmick now, it might turn into something more than that.
And even if it stays a gimmick, it’s a fun gimmick.

I think my quiz friends will like my trophy!

_If you’re near Leigh, you can enrol on 3D&nbsp;360’s [advanced manufacturing bootcamp](https://3d360printer.co.uk/training-courses/dfe-funded-skills-bootcamps/) yourself.
You could even tell them I sent you — they might give me some free filament as a referral reward!_

## More about the things I’ve printed

<figure>
<div id="printed-objects">
<img
	src="./images/2025/printed-objects.webp"
	alt="Several plastic objects in front of my 3D printer"
	width="960"
	style="aspect-ratio: 2 / 1;"
/>
<img
	src="./images/2025/printed-objects-letters.svg"
	alt="Letters A to N corresponding to the fourteen objects"
	width="960"
	style="aspect-ratio: 2 / 1;"
/>
</div>
<figcaption>Mouse-over or tap the photo to label the prints from A to N.</figcaption>
</figure>

The fourteen prints in the photo above are listed in the table below.

<div style="overflow-x: auto;">
<table style="min-width: 440px;">
<thead>
<tr>
<th>#</th>
<th>Item</th>
<th>Size</th>
<th>Colour</th>
<th>Credit</th>
</tr>
</thead>
<tbody>
<tr style="--print-colour: blue"><td>A</td><td>Keyring fob with fulmar relief on one side (and “Duncan Ritchie 2025” on the reverse)</td><td>50mm width</td><td>royal blue</td><td>Me</td></tr>
<tr style="--print-colour: white"><td>B</td><td>Snowman, with a loop above its head for hanging</td><td>108mm height</td><td>white</td><td>Me</td></tr>
<tr style="--print-colour: orange"><td>C</td><td>Balancing bird, balancing on the snowman</td><td>50mm width</td><td>orange</td><td><a href="https://www.thingiverse.com/thing:6652740">ngonjuan on Thingiverse</a></td></tr>
<tr style="--print-colour: white"><td>D</td><td>3D 360 test cube</td><td>20mm width</td><td>white</td><td>3D 360</td></tr>
<tr style="--print-colour: chocolate"><td>E</td><td>3D 360 test cube</td><td>20mm width</td><td>brown</td><td>3D 360</td></tr>
<tr style="--print-colour: black"><td>F</td><td>Articulated lizard (which printed in one piece, without supports), draped over the three cubes</td><td>80mm length</td><td>black</td><td><a href="https://www.thingiverse.com/thing:3505006">McGybeer on Thingiverse</a></td></tr>
<tr style="--print-colour: orange"><td>G</td><td>3D 360 test cube</td><td>20mm width</td><td>orange</td><td>3D 360</td></tr>
<tr style="--print-colour: white"><td>H</td><td>“Benchy” boat, which like the cube is useful as a test</td><td>60mm length</td><td>white</td><td><a href="https://www.thingiverse.com/thing:763622">Creative Tools on Thingiverse</a></td></tr>
<tr style="--print-colour: black"><td>I</td><td>Fan cover, screwed onto printer</td><td>115mm width</td><td>black</td><td><a href="https://www.thingiverse.com/thing:3505548">linhartr22 on Thingiverse</a></td></tr>
<tr style="--print-colour: yellow"><td>J</td><td>Dinosaur</td><td>100mm length</td><td>yellow</td><td>Me</td></tr>
<tr style="--print-colour: black"><td>K</td><td>Three cable clips, clipped onto printer; one is visible and another is partly visible behind the temperature tower</td><td>15mm height</td><td>black</td><td><a href="https://www.thingiverse.com/thing:4311647">sahansudeepa on Thingiverse</a></td></tr>
<tr style="--print-colour: deepskyblue"><td>L</td><td>Cable holder with screw holes (a black copy is screwed onto the back of the printer, not shown)</td><td>40mm height</td><td>sky blue</td><td><a href="https://www.thingiverse.com/thing:2949858">saitrix on Thingiverse</a></td></tr>
<tr style="--print-colour: orange"><td>M</td><td>Temperature tower; this has eight storeys each printed at a different temperature</td><td>82mm height</td><td>orange</td><td>3D 360?</td></tr>
<tr style="--print-colour: black"><td>N</td><td>Back panel for the display unit, screwed onto printer, hard to see</td><td>102mm width</td><td>black</td><td><a href="https://www.thingiverse.com/thing:2858209">Rocco81-92 on Thingiverse</a></td></tr>
</tbody>
</table>
</div>

<style>
	#printed-objects {
		display: grid;
		grid-template-areas: "cover";
	}
	#printed-objects > * {
		grid-area: cover;
	}
	#printed-objects:not(:hover):not(:active) > :last-of-type {
		display: none;
	}
	#printed-objects-list {
		list-style-type: upper-latin;
	}
	/* Adapted from “Colours on legacy HTML attributes” article */
	tr td:nth-of-type(4)::before {
		content: '';
		display: inline-block;
		background: var(--print-colour);
		width: 1em;
		height: 1em;
		vertical-align: -0.1625em;
		box-shadow: inset 0 -1px 2px 0 black;
		margin-right: 0.5ch;
	}
	@supports (width: 1cap) {
		tr td:nth-of-type(4)::before {
			width: 1cap;
			height: 1cap;
			vertical-align: -0.025cap;
		}
	}
</style>
