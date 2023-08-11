---
date: 2023-08-19
title: CSS flags
tags: ['Software']
draft: false
---

<style>
.strip:nth-child(n + 61) {
  /* Hide superfluous strips that might be in the DOM. */
  /* This gets overridden by JavaScript when input#strips-child-input is used to change the number of strips. */
  flex-grow: 0;
}
:root {
  /* Variables controlled by the <form> children: */
  --animation-play-state: running;
  --flag-variant: var(--progress-flag);
  --flag-height-multiplier: 1;
  --flag-aspect-ratio: 5 / 3;
  --strips-count: 60;
  --animation-displacement-factor: 0.3333;
  --animation-wave-length: 1;
  --animation-duration: 1s;

  /* Numeric variables not directly set by <form> children: */
  --flag-height: calc(var(--flag-height-multiplier) * min(15rem, (66.6667vw / var(--flag-aspect-ratio))));
  --canvas-height:
    clamp(
      var(--flag-height) + 6rem,
      100vh - 6rem,
      45rem
    );
  --animation-strip-displacement: calc(
    var(--animation-displacement-factor) * var(--flag-height) / var(--strips-count)
  );

  /* Non-gradient variables used by some flags: */
  --chevron-width: calc(var(--flag-height) / 7);
  --chevron-width-intersex: calc(var(--flag-height) / 10);

  /* Colour palette: */
  --rainbow-pink: #ff5ca8 /* Wikimedia has #ff69b4 */;
  --rainbow-red: #e50000;
  --rainbow-orange: #f36700 /* Wikimedia has #e58d00 */;
  --rainbow-yellow: #e5ee00;
  --rainbow-green: #188102 /* Wikimedia has #028121 */;
  --rainbow-turquoise: #00c0c0 /* Wikimedia has ##00c0c0 */;
  --rainbow-blue: #0040ff /* Wikimedia has #004cff */;
  --rainbow-purple: #6c07a5 /* Wikimedia has #770088 */;
  --black: black;
  --poc-brown: #603917;
  --bi-pink: #d60270;
  --bi-purple: #9b4f96;
  --bi-blue: #0038a8;
  --trans-blue: #5bcefa;
  --trans-pink: #f5a9b8;
  --white: white;
  --intersex-purple: #7902aa;
  --intersex-yellow: #ffd800;
  --pan-pink: #ff218c;
  --pan-yellow: #ffd800;
  --pan-blue: #21b1ff;
  --asexual-grey: #a3a3a3;
  --asexual-purple: #800080;
  --nonbinary-yellow: #fff433;
  --nonbinary-purple: #9b59d0;
  --nonbinary-grey: #2d2d2d;
  --uk-blue: #012169 /* #0b267c is brighter*/;
  --uk-red: #c8102e /* #da151b is brighter */;
  --uk-yellow: #ffff00 /* for St David’s flag */;
  --ireland-green: #169b62;
  --ireland-orange: #ff883e;

  /* Flags to be used in --flag-variant: */
  /* As per Josh Comeau and @myfonj, I could also rewrite the gradients with double-position syntax:
    linear-gradient(
      to bottom,
      hsl(331deg 100% 55%) 0%    33.3%,
      hsl(50deg 100% 50%)  33.3% 66.7%,
      hsl(200deg 100% 55%) 66.7% 100%
    );
  */

  --eight-stripe-rainbow-flag: linear-gradient(
    var(--rainbow-pink) 0%,
    var(--rainbow-pink) 12.5%,
    var(--rainbow-red) 0%,
    var(--rainbow-red) 25%,
    var(--rainbow-orange) 0%,
    var(--rainbow-orange) 37.5%,
    var(--rainbow-yellow) 0%,
    var(--rainbow-yellow) 50%,
    var(--rainbow-green) 0%,
    var(--rainbow-green) 62.5%,
    var(--rainbow-turquoise) 0%,
    var(--rainbow-turquoise) 75%,
    var(--rainbow-blue) 0%,
    var(--rainbow-blue) 87.5%,
    var(--rainbow-purple) 0%,
    var(--rainbow-purple) 100%
  );

  --six-stripe-rainbow-flag: linear-gradient(
    var(--rainbow-red) 0%,
    var(--rainbow-red) 17%,
    var(--rainbow-orange) 0%,
    var(--rainbow-orange) 33%,
    var(--rainbow-yellow) 0%,
    var(--rainbow-yellow) 50%,
    var(--rainbow-green) 0%,
    var(--rainbow-green) 67%,
    var(--rainbow-blue) 0%,
    var(--rainbow-blue) 83%,
    var(--rainbow-purple) 0%,
    var(--rainbow-purple) 100%
  );

  --progress-flag:
    /* white chevron (triangle) for trans people */
    conic-gradient(
      from 225deg at calc(var(--flag-height) / 2 - 2 * var(--chevron-width)) 50%,
      var(--white) 0deg,
      var(--white) 90deg,
      transparent 0deg,
      transparent 360deg
    ),
    /* pink chevron for trans people */
    conic-gradient(
      from 225deg at calc(var(--flag-height) / 2 - var(--chevron-width)) 50%,
      var(--trans-pink) 0deg,
      var(--trans-pink) 90deg,
      transparent 0deg,
      transparent 360deg
    ),
    /* blue chevron for trans people */
    conic-gradient(
      from 225deg at calc(var(--flag-height) / 2) 50%,
      var(--trans-blue) 0deg,
      var(--trans-blue) 90deg,
      transparent 0deg,
      transparent 360deg
    ),
    /* brown chevron for LGBT+ people of colour */
    conic-gradient(
      from 225deg at calc(var(--flag-height) / 2 + var(--chevron-width)) 50%,
      var(--poc-brown) 0deg,
      var(--poc-brown) 90deg,
      transparent 0deg,
      transparent 360deg
    ),
    /* black chevron for HIV+ and black LGBT+ people */
    conic-gradient(
      from 225deg at calc(var(--flag-height) / 2 + 2 * var(--chevron-width))
        50%,
      var(--black) 0deg,
      var(--black) 90deg,
      transparent 0deg,
      transparent 360deg
    ),
    /* rainbow stripes */
    var(--six-stripe-rainbow-flag);

  --progress-intersex-flag:
    /* purple circle for intersex people */
    radial-gradient(
      circle at calc(var(--flag-height) / 4 - 0.75 * var(--chevron-width-intersex)) 50%,
      transparent 0%, /* inside */
      transparent calc(0.1 * var(--flag-height)),
      var(--intersex-purple) 0%,
      var(--intersex-purple) calc(0.125 * var(--flag-height)),
      transparent 0%,
      transparent 100% /* outside */
    ),
    /* yellow chevron (triangle) for intersex people */
    conic-gradient(
      from 225deg at calc(var(--flag-height) / 2 - 0.5 * var(--chevron-width-intersex)) 50%,
      var(--intersex-yellow) 0deg,
      var(--intersex-yellow) 90deg,
      transparent 0deg,
      transparent 360deg
    ),
    /* white chevron for trans people */
    conic-gradient(
      from 225deg at calc(var(--flag-height) / 2 + 0.5 * var(--chevron-width-intersex)) 50%,
      var(--white) 0deg,
      var(--white) 90deg,
      transparent 0deg,
      transparent 360deg
    ),
    /* pink chevron for trans people */
    conic-gradient(
      from 225deg at calc(var(--flag-height) / 2 + 1.5 * var(--chevron-width-intersex)) 50%,
      var(--trans-pink) 0deg,
      var(--trans-pink) 90deg,
      transparent 0deg,
      transparent 360deg
    ),
    /* blue chevron for trans people */
    conic-gradient(
      from 225deg at calc(var(--flag-height) / 2 + 2.5 * var(--chevron-width-intersex)) 50%,
      var(--trans-blue) 0deg,
      var(--trans-blue) 90deg,
      transparent 0deg,
      transparent 360deg
    ),
    /* brown chevron for LGBT+ people of colour */
    conic-gradient(
      from 225deg at calc(var(--flag-height) / 2 + 3.5 * var(--chevron-width-intersex)),
      var(--poc-brown) 0deg,
      var(--poc-brown) 90deg,
      transparent 0deg,
      transparent 360deg
    ),
    /* black chevron for HIV+ and black LGBT+ people */
    conic-gradient(
      from 225deg at calc(var(--flag-height) / 2 + 4.5 * var(--chevron-width-intersex)),
      var(--black) 0deg,
      var(--black) 90deg,
      transparent 0deg,
      transparent 360deg
    ),
    /* rainbow stripes */
    var(--six-stripe-rainbow-flag);

  --bisexual-flag: linear-gradient(
    var(--bi-pink) 0%,
    var(--bi-pink) 40%,
    var(--bi-purple) 0%,
    var(--bi-purple) 60%,
    var(--bi-blue) 0%,
    var(--bi-blue) 100%
  );

  --trans-flag: linear-gradient(
    var(--trans-blue) 0%,
    var(--trans-blue) 20%,
    var(--trans-pink) 0%,
    var(--trans-pink) 40%,
    var(--white) 0%,
    var(--white) 60%,
    var(--trans-pink) 0%,
    var(--trans-pink) 80%,
    var(--trans-blue) 0%,
    var(--trans-blue) 100%
  );

  --intersex-flag: radial-gradient(
    circle,
    var(--intersex-yellow) 0%, /* inside */
    var(--intersex-yellow) 23%,
    var(--intersex-purple) 0%,
    var(--intersex-purple) 31.6667%, /* theoretically, ring thickness should be 8.3333% or 50/600*/
    var(--intersex-yellow) 0%,
    var(--intersex-yellow) 100% /* outside */
  );
  --intersex-real-flag: url("https://upload.wikimedia.org/wikipedia/commons/3/38/Intersex_Pride_Flag.svg");
  --intersex-progress-real-flag: url("https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Intersex-inclusive_pride_flag.svg/1200px-Intersex-inclusive_pride_flag.svg.png?20220830232656");
  /* --progress-intersex-flag: url("https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Intersex-inclusive_pride_flag.svg/1200px-Intersex-inclusive_pride_flag.svg.png?20220830232656"); */

  --asexual-flag: linear-gradient(
    var(--black) 0%,
    var(--black) 25%,
    var(--asexual-grey, grey) 0%,
    var(--asexual-grey, grey) 50%,
    var(--white) 0%,
    var(--white) 75%,
    var(--asexual-purple, purple) 0%,
    var(--asexual-purple, purple) 100%
  );

  --pansexual-flag: linear-gradient(
    var(--pan-pink) 0%,
    var(--pan-pink) 33.3333%,
    var(--pan-yellow) 0%,
    var(--pan-yellow) 66.6667%,
    var(--pan-blue) 0%,
    var(--pan-blue) 100%
  );

  --nonbinary-flag: linear-gradient(
    var(--nonbinary-yellow) 0%,
    var(--nonbinary-yellow) 25%,
    var(--white) 0%,
    var(--white) 50%,
    var(--nonbinary-purple) 0%,
    var(--nonbinary-purple) 75%,
    var(--nonbinary-grey) 0%,
    var(--nonbinary-grey) 100%
  );

  --scotland-flag:
    /* negative diagonal white stripe */
    linear-gradient(
      to bottom left,
      transparent 0%,
      transparent 44.855%,
      var(--white) 0%,
      var(--white) 55.145%,
      transparent 0%,
      transparent 100%
    ),
    /* positive diagonal white stripe */
    linear-gradient(
      to bottom right,
      transparent 0%,
      transparent 44.855%,
      var(--white) 0%,
      var(--white) 55.145%,
      transparent 0%,
      transparent 100%
    ),
    /* blue field */
    linear-gradient(var(--uk-blue), var(--uk-blue));

  --england-flag: var(--england-stripes-flagpart), linear-gradient(white, white);

  /* URL for original file: */
  /* --uk-real-flag: url("https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg"); */
  /* URL if I could interpolate strings in HTML: */
  /* --uk-real-flag: url(import.meta.env.BASE_URL + "/images/2023/uk-flag-from-wikimedia-commons.svg"); */
  --uk-real-flag: url("/blog/images/2023/uk-flag-from-wikimedia-commons.svg");

  --uk-with-conic-diagonals-flag:
    var(--england-stripes-flagpart),
    var(--orthogonal-white-stripes-for-uk-flagpart),
    var(--uk-red-diagonals-conic-flagpart),
    var(--scotland-flag);

  --uk-with-linear-diagonals-flag:
    var(--england-stripes-flagpart),
    var(--orthogonal-white-stripes-for-uk-flagpart),
    var(--uk-red-diagonals-linear-flagpart),
    var(--scotland-flag);
  
  --st-david-flag:
    /* horizontal yellow stripe */
    linear-gradient(
      transparent 0%,
      transparent 40%,
      var(--uk-yellow) 0%,
      var(--uk-yellow) 60%,
      transparent 0%,
      transparent 100%
    ),
    /* vertical yellow stripe & black field */
    linear-gradient(
      to right,
      var(--black) 0%,
      var(--black) calc(50% - 0.1 * var(--flag-height)),
      var(--uk-yellow) 0%,
      var(--uk-yellow) calc(50% + 0.1 * var(--flag-height)),
      var(--black) 0%,
      var(--black) 100%
    );

  --ireland-flag: linear-gradient(
      to right,
      var(--ireland-green) 0%,
      var(--ireland-green) 33.3333%,
      var(--white) 0%,
      var(--white) 66.6667%,
      var(--ireland-orange) 0%,
      var(--ireland-orange) 100%
    );

  /* Gradients shared between flags without being complete flags themselves: */
  --england-stripes-flagpart: 
    /* horizontal red stripe */ linear-gradient(
      transparent 0%,
      transparent 40%,
      var(--uk-red) 0%,
      var(--uk-red) 60%,
      transparent 0%,
      transparent 100%
    ),
    /* vertical red stripe */
    linear-gradient(
      to right,
      transparent 0%,
      transparent calc(50% - 0.1 * var(--flag-height)),
      var(--uk-red) 0%,
      var(--uk-red) calc(50% + 0.1 * var(--flag-height)),
      transparent 0%,
      transparent 100%
    );

  --orthogonal-white-stripes-for-uk-flagpart: 
  /* horizontal white stripe */
    linear-gradient(
      transparent 0%,
      transparent 33.3333%,
      var(--white) 0%,
      var(--white) 66.6667%,
      transparent 0%,
      transparent 100%
    ),
    /* vertical white stripe */
    linear-gradient(
      to right,
      transparent 0%,
      transparent calc(50% - 0.1667 * var(--flag-height)),
      var(--white) 0%,
      var(--white) calc(50% + 0.1667 * var(--flag-height)),
      transparent 0%,
      transparent 100%
    );

  --uk-red-diagonals-conic-flagpart: conic-gradient(
    from 0deg,
    transparent 0deg,
    transparent 52.5deg,
    var(--uk-red) 0deg,
    var(--uk-red) 60deg,
    transparent 0deg,
    transparent 116.5deg,
    var(--uk-red) 0deg,
    var(--uk-red) 120deg,
    transparent 0deg,
    transparent 232.5deg,
    var(--uk-red) 0deg,
    var(--uk-red) 240deg,
    transparent 0deg,
    transparent 295deg,
    var(--uk-red) 0deg,
    var(--uk-red) 300deg,
    transparent 0deg,
    transparent 360deg
  );
  --uk-red-diagonals-linear-flagpart:
    /* negative diagonal red stripe */
    linear-gradient(
      to bottom left,
      transparent 0%,
      transparent 46.57%,
      var(--uk-red) 0%,
      var(--uk-red) 50%,
      transparent 0%,
      transparent 100%
    ),
    /* positive diagonal red stripe */
    linear-gradient(
      to bottom right,
      transparent 0%,
      transparent 46.57%,
      var(--uk-red) 0%,
      var(--uk-red) 50%,
      transparent 0%,
      transparent 100%
    );
}

#figure-and-form {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: start;
}

#figure-and-form figure {
  flex: 1 1 35rem;
  width: unset;
}

#figure-and-form form {
  flex: 1 1 10rem;
  font-size: smaller;
}

.canvas {
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--canvas-height);
  background-image:
     /* green ground and pale blue sky */
    radial-gradient(
      ellipse at 50% 112.5%,
      #abf441 4%,
      #14b21b 12.5%,
      transparent 0%,
      transparent 100%
    ),
    linear-gradient(skyblue, azure);
  background-size: 1200% 100%;
  background-position: center;
}

.flagpole {
  width: calc(0.25rem + var(--flag-height) / 20);
  height: calc((var(--canvas-height) + var(--flag-height)) / 2);
  background-image: linear-gradient(90deg, grey, darkgrey, grey);
  transform: translateX(-0.25rem)
    translateY(calc(50% - var(--flag-height) / 2 - 0.5rem));
}

/* Cap of flagpole */
.flagpole::before {
  content: '';
  width: calc(100% + 0.25rem);
  height: 1%;
  background-image: radial-gradient(darkgrey, grey);
  border-radius: 50%;
  display: block;
  transform: translateX(-0.125rem) translateY(-0.125rem);
}

/* Base of flagpole */
.flagpole::after {
  content: '';
  width: 100%;
  height: 1%;
  background-image: linear-gradient(90deg, grey, darkgrey, grey);
  border-radius: 50%;
  display: block;
  position: relative;
  top: 100%;
  transform: translateY(-150%);
}

.flag {
  height: var(--flag-height);
  /* width: calc(var(--flag-height) * var(--flag-aspect-ratio)); */
  aspect-ratio: var(--flag-aspect-ratio);
  display: flex;
}

.strip {
  background-image: var(--flag-variant);
  background-size:
    calc(var(--flag-height) * var(--flag-aspect-ratio))
    var(--flag-height);
  background-position:
    calc(100% * var(--strip-index) / max(1, var(--strips-count) - 1)) /* max() stops us dividing by zero */
    50%;
  flex-grow: 1;
  height: 100%;
  /* All the animation* declarations were adapted from Josh Comeau’s tutorial */
  animation: oscillate var(--animation-duration) infinite;
  animation-play-state: var(--animation-play-state);
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
  animation-fill-mode: backwards;
  animation-delay: calc(
    (var(--animation-duration) * var(--strip-index) / var(--strips-count) - var(--animation-duration)) / var(--animation-wave-length)
     - (0.75 * var(--animation-duration))
  );
}

/* Adapted from Josh Comeau’s tutorial */
@keyframes oscillate {
  0% {
    transform: translateY(
      calc(var(--strip-index) * var(--animation-strip-displacement))
    );
  }
  100% {
    transform: translateY(
      calc(var(--strip-index) * var(--animation-strip-displacement) * -1)
    );
  }
}

form > * + * {
  margin-top: 0.5rem;
}
form fieldset {
  border: 3px solid var(--colour6);
  padding: 0.5rem;
}
form fieldset label {
  display: inline-block;
  padding-right: 0.5em;
}
form #extra-controls {
  display: flex;
  flex-direction: column;
}
form #extra-controls label {
  display: flex;
  flex-wrap: wrap;
  gap: 0.125rem 0.5rem;
  justify-content: space-between;
  line-height: 0.925lh;
}
form #extra-controls label span {
  flex: 1 0 8rem;
}
form label input {
  vertical-align: 0.125em;
}
form label input[type="range"] {
  flex: 5 1 3rem;
  width: 3rem;
  margin: 0;
}
form #extra-controls label output {
  flex: 0 1 3rem;
}
</style>

# CSS flags

<div id="figure-and-form">

  <figure>
    <div class="canvas">
      <div class="flagpole"></div>
      <div class="flag">
        <div class="strip" style="--strip-index: 0;"></div>
        <div class="strip" style="--strip-index: 1;"></div>
        <div class="strip" style="--strip-index: 2;"></div>
        <div class="strip" style="--strip-index: 3;"></div>
        <div class="strip" style="--strip-index: 4;"></div>
        <div class="strip" style="--strip-index: 5;"></div>
        <div class="strip" style="--strip-index: 6;"></div>
        <div class="strip" style="--strip-index: 7;"></div>
        <div class="strip" style="--strip-index: 8;"></div>
        <div class="strip" style="--strip-index: 9;"></div>
        <div class="strip" style="--strip-index: 10;"></div>
        <div class="strip" style="--strip-index: 11;"></div>
        <div class="strip" style="--strip-index: 12;"></div>
        <div class="strip" style="--strip-index: 13;"></div>
        <div class="strip" style="--strip-index: 14;"></div>
        <div class="strip" style="--strip-index: 15;"></div>
        <div class="strip" style="--strip-index: 16;"></div>
        <div class="strip" style="--strip-index: 17;"></div>
        <div class="strip" style="--strip-index: 18;"></div>
        <div class="strip" style="--strip-index: 19;"></div>
        <div class="strip" style="--strip-index: 20;"></div>
        <div class="strip" style="--strip-index: 21;"></div>
        <div class="strip" style="--strip-index: 22;"></div>
        <div class="strip" style="--strip-index: 23;"></div>
        <div class="strip" style="--strip-index: 24;"></div>
        <div class="strip" style="--strip-index: 25;"></div>
        <div class="strip" style="--strip-index: 26;"></div>
        <div class="strip" style="--strip-index: 27;"></div>
        <div class="strip" style="--strip-index: 28;"></div>
        <div class="strip" style="--strip-index: 29;"></div>
        <div class="strip" style="--strip-index: 30;"></div>
        <div class="strip" style="--strip-index: 31;"></div>
        <div class="strip" style="--strip-index: 32;"></div>
        <div class="strip" style="--strip-index: 33;"></div>
        <div class="strip" style="--strip-index: 34;"></div>
        <div class="strip" style="--strip-index: 35;"></div>
        <div class="strip" style="--strip-index: 36;"></div>
        <div class="strip" style="--strip-index: 37;"></div>
        <div class="strip" style="--strip-index: 38;"></div>
        <div class="strip" style="--strip-index: 39;"></div>
        <div class="strip" style="--strip-index: 40;"></div>
        <div class="strip" style="--strip-index: 41;"></div>
        <div class="strip" style="--strip-index: 42;"></div>
        <div class="strip" style="--strip-index: 43;"></div>
        <div class="strip" style="--strip-index: 44;"></div>
        <div class="strip" style="--strip-index: 45;"></div>
        <div class="strip" style="--strip-index: 46;"></div>
        <div class="strip" style="--strip-index: 47;"></div>
        <div class="strip" style="--strip-index: 48;"></div>
        <div class="strip" style="--strip-index: 49;"></div>
        <div class="strip" style="--strip-index: 50;"></div>
        <div class="strip" style="--strip-index: 51;"></div>
        <div class="strip" style="--strip-index: 52;"></div>
        <div class="strip" style="--strip-index: 53;"></div>
        <div class="strip" style="--strip-index: 54;"></div>
        <div class="strip" style="--strip-index: 55;"></div>
        <div class="strip" style="--strip-index: 56;"></div>
        <div class="strip" style="--strip-index: 57;"></div>
        <div class="strip" style="--strip-index: 58;"></div>
        <div class="strip" style="--strip-index: 59;"></div>
      </div>
    </div>
    <figcaption>
      A flag animated using CSS
    </figcaption>
  </figure>

  <form>
    <button type="button" id="pause-or-play" aria-pressed="true">Pause animation</button>
    <fieldset id="flag-fieldset">
      <legend>Flag</legend>
      <label><input type="radio" name="flag" value="eight-stripe-rainbow-flag" /> Eight-stripe rainbow </label>
      <label><input type="radio" name="flag" value="six-stripe-rainbow-flag" /> Six-stripe rainbow </label>
      <label><input type="radio" name="flag" value="progress-flag" checked /> Progress pride </label>
      <label><input type="radio" name="flag" value="progress-intersex-flag" /> Intersex progress pride </label>
      <label><input type="radio" name="flag" value="bisexual-flag" /> Bisexual </label>
      <label><input type="radio" name="flag" value="trans-flag" /> Transgender </label>
      <label><input type="radio" name="flag" value="intersex-flag" /> Intersex </label>
      <!-- <label><input type="radio" name="flag" value="intersex-progress-real-flag" /> Intersex (SVG) </label> -->
      <label><input type="radio" name="flag" value="asexual-flag" /> Asexual </label>
      <label><input type="radio" name="flag" value="pansexual-flag" /> Pansexual </label>
      <label><input type="radio" name="flag" value="nonbinary-flag" /> Nonbinary </label>
      <label><input type="radio" name="flag" value="uk-with-linear-diagonals-flag" /> UK (wrong) </label>
      <label><input type="radio" name="flag" value="uk-with-conic-diagonals-flag" /> UK (also wrong) </label>
      <label><input type="radio" name="flag" value="uk-real-flag" /> UK (SVG) </label>
      <label><input type="radio" name="flag" value="scotland-flag" /> Scotland </label>
      <label><input type="radio" name="flag" value="england-flag" /> England </label>
      <label><input type="radio" name="flag" value="st-david-flag" /> Wales (St David) </label>
      <label><input type="radio" name="flag" value="ireland-flag" /> Ireland </label>
    </fieldset>
    <div id="extra-controls">
      <label>
        <span>Flag size</span>
        <input type="range" id="flag-size-input" min="0.05" step="0.01" value="1" max="1" />
        <output id="flag-size-output" for="flag-size-input">(1)</output>
      </label>
      <label>
        <span>Flag aspect ratio</span>
        <input type="range" id="flag-aspect-ratio-input" min="1" step="0.01" value="1.6667" max="2" />
        <output id="flag-aspect-ratio-output" for="flag-aspect-ratio-input">(1.67)</output>
      </label>
      <label>
        <span>Number of strips</span>
        <input type="range" id="strips-count-input" min="1" step="1" value="60" max="60" />
        <output id="strips-count-output" for="strips-count-input">(60)</output>
      </label>
      <label>
        <span>Wave amplitude</span>
        <input type="range" id="wave-amplitude-input" min="0" step="0.01" value="0.33" max="1" />
        <output id="wave-amplitude-output" for="wave-amplitude-input">(33%)</output>
      </label>
      <label>
        <span>Wave length</span>
        <input type="range" id="wave-length-input" min="0.1" step="0.1" value="1" max="5" />
        <output id="wave-length-output" for="wave-length-input">(100%)</output>
      </label>
      <label>
        <span>Wave period</span>
        <input type="range" id="wave-period-input" min="0.1" step="0.1" value="1" max="10" />
        <output id="wave-period-output" for="wave-period-input">(1s)</output>
      </label>
    </div>
  </form>
</div>

## How I made this

I was inspired by [Josh Comeau’s article on animating flags](https://www.joshwcomeau.com/animation/pride-flags/).
His technique was only for flags made of horizontal stripes, but I figured I could make it work for more complicated designs.

Comeau and I have used LGBT+ flags, both to illustrate the CSS techniques and to show support for Pride.

### Waving animation

Josh Comeau divided the flag into vertical strips and moved the strips up and down with a CSS animation.
Each strip moves at different times to create the over-all wave.

The left side is tethered to an invisible flagpole.
The distance each strip moves is calculated from its index (its position in the sequence from left to right), so the left-most strip doesn’t move at all and the right-most strip is the one that moves the farthest.

I have copied Comeau’s animation code, with minor differences:

- I added an `animation-play-state` property to toggle between playing and paused.
- Comeau has versions where the flag is and isn’t tethered to a flagpole.
- What he calls “billow”, I call “wave amplitude” (describing the whole flag) or “displacement” (describing a strip), because I’m a nerd.

Also, Comeau doesn’t let the number of strips go below 3, but I allow you to go down to 1.
The effect is that if there’s only one strip, there’s no movement at all, since the left-most strip is always against the flagpole.
You simply see the flag as a static rectangle.

### Gradients

I have drawn a flagpole (and ground, and sky) to give the flag some visual context.
But the main difference between Comeau’s flag animations and mine is that my flags don’t have to be horizontal stripes.

In Comeau’s version, each strip was filled with a vertical linear gradient, with hard stops between colours to give the flag proper stripes.
This works perfectly for flags that consist only of horizontal stripes; his three examples were the Philadelphia eight-stripe rainbow, the transgender flag, and the pansexual flag.

But I was wondering whether I could make it work for any flag that can be made out of CSS gradients, or indeed any rectangular flag.
So I put the same `background-image` property on each strip, but I use the `background-size` and `background-position` properties to make each strip into the correct segment of the flag.
The image itself is composed of at least one gradient (depending on the flag), with linear, radial, and conical gradients overlaid in front of each other to produce the flag’s design.

This technique of overlaying gradients means that the flag can now have stripes in different directions (as in a cross), or chevrons (as in the progressive pride flag), or circles (as in the intersex flag).

### UK flag

I can almost do the entire UK flag, but the diagonal red stripes are impossible to recreate purely with gradients.
Those stripes are supposed to be of constant width (of 4% of the horizontal width of the flag), and offset so that they’re each on the anti-clockwise side of the white diagonal stripes that they lie on front of.

The best I can do is either to use two linear gradients, which makes the widths of the stripes constant but makes the offsets of two of the four red diagonals wrong; or use one conical gradient, which makes the offset okay but the stripes wedge-shaped.
Another problem with the conical gradient is that, in the absense of trigonometric functions, I can create the gradient for one aspect ratio only (5:3 or 1.67).
(Trigonometry is coming to CSS, but not yet widely supported.)

To get around these limitations, I can use the `background-image` property with the URL of an image file, instead of gradients.
So I found an SVG version of the flag on Wikimedia Commons and made it one of my flag options too.

(I then found its aspect ratio wouldn’t change from 5:3, so I set `preserveAspectRatio="none"` on its `<svg>` element.)

It’s kinda cheating to call it a CSS flag.
But it’s an option. 🇬🇧

### Controls

Josh Comeau had controls on his flag demos, such as for the design of flag (rainbow or trans), the number of strips (or segments) to divide the flag into, and the amplitude of the wave (the amount of billow).

CSS variables (custom properties) make these factors easy to manage.

I added more controls to really show off the CSS variables.
Adapting flags to look decent in different aspect ratios was a little extra challenge.

## Pixel gaps

If you’re seeing thin gaps between strips, try adjusting the size or aspect ratio of the flag, or the number of strips.
Or switch to a Chromium browser (such as Opera or Chrome), since Chromium seems to render the strips better than Firefox or Safari.
(It’s a rounding error.)

Similarly, the ring on the intersex-inclusive progress flag changes thickness when the flag’s aspect ratio changes, unless you’re in Chromium.
This is another rounding error.

And for the Irish flag, if the number of strips is a multiple of three, all strips should be a solid colour.
Chromium does this nicely; Firefox and Safari aren’t perfect.
That’s actually the only reason I included a flag with vertical stripes.
(Although I really like the shades of green and orange.)

## Flag choice

I’ve picked several LGBT+ flags, to show off different gradients and combinations thereof.
(And also to celebrate Pride, of course!
I published this on the day of my city’s Pride 2023 events.)

I also have the flags of England, Scotland, and the UK, since the latter flag is made up of the other two flags (plus Northern Ireland’s diagonal stripes).
Unfortunately I couldn’t get those diagonal stripes correct.

And Ireland’s in here so I could see some plain vertical stripes.
Then I added Wales as well, or rather St David’s flag.
I&nbsp;would have done the official flag, but the dragon doesn’t lend itself to gradients.

Colours are mostly taken from files on Wikimedia Commons, but I have not copied all of the colours and measurements exactly.
I tweaked some of the rainbow colours, for example.

But anyway, happy Pride! It’s always a good time to elevate queer voices, celebrate our achievements, and defend our rights to live as our gender and to love who we love. 🏳️‍🌈

## Flag design credits

<dl>
<dt>Eight-stripe rainbow flag</dt><dd>Gilbert Baker, 1978</dd>
<dt>Bisexual flag</dt><dd>Michael Page, 1998</dd>
<dt>Transgender flag</dt><dd>Monica Helms, 1999</dd>
<dt>Asexual flag</dt><dd>Asexual Visibility and Education Network, 2010</dd>
<dt>Pansexual flag</dt><dd>Tumblr blog PansexualFlag, 2010</dd>
<dt>Intersex flag</dt><dd>Morgan Carpenter, 2013</dd>
<dt>Nonbinary flag</dt><dd>Kye Rowan, 2014</dd>
<dt>Progressive pride flag</dt><dd>Daniel Quasar, 2018</dd>
<dt>Intersex-inclusive progressive pride flag</dt><dd>Valentino Vecchietti, 2021</dd>
</dl>

## Blooper

<figure>
  <img
    width="360"
    style="aspect-ratio: 442 / 406"
    src="/blog/images/2023/progress-flag-broken.png"
    alt="Intersex-inclusive progress flag divided into six vertical strips, of which the last five are reversed"
  />
  <figcaption>Flag with strips in wrong order</figcaption>
</figure>

<script>
  const root = document.querySelector(':root');

  // For the pause/play button
  const pauseOrPlayButton = document.getElementById('pause-or-play');
  function pauseAnimation() {
      root.style.setProperty('--animation-play-state', 'paused');
      pauseOrPlayButton.setAttribute('aria-pressed', 'false')
      pauseOrPlayButton.textContent = 'Play animation';
  }
  function playAnimation() {
      root.style.setProperty('--animation-play-state', 'running');
      pauseOrPlayButton.setAttribute('aria-pressed', 'true')
      pauseOrPlayButton.textContent = 'Pause animation';
  }
  pauseOrPlayButton.addEventListener('click', (event) => {
    if (pauseOrPlayButton.getAttribute('aria-pressed') === 'true') {
      pauseAnimation();
    }
    else {
      playAnimation();
    }
  })

  // For the flag variant options
  const flagOptions = document.querySelectorAll('#flag-fieldset input');
  flagOptions.forEach((option) => {
    option.addEventListener('click', (event) => {
      root.style.setProperty('--flag-variant', `var(--${option.value})`);
    })
  })

  // For the flag size controller
  const flagSizeInput = document.getElementById('flag-size-input');
  const flagSizeOutput = document.getElementById('flag-size-output');
  function setFlagSize() {
    const newFlagHeightMultiplier = flagSizeInput.value;
    root.style.setProperty('--flag-height-multiplier', newFlagHeightMultiplier);
    flagSizeOutput.textContent = `(${Math.round(newFlagHeightMultiplier * 100)}%)`;
  }
  flagSizeInput.addEventListener('input', (event) => { setFlagSize(); })

  // For the flag aspect-ratio controller
  const flagAspectRatioInput = document.getElementById('flag-aspect-ratio-input');
  const flagAspectRatioOutput = document.getElementById('flag-aspect-ratio-output');
  function setFlagAspectRatio() {
    const newFlagAspectRatio = flagAspectRatioInput.value;
    root.style.setProperty('--flag-aspect-ratio', newFlagAspectRatio);
    flagAspectRatioOutput.textContent = `(${newFlagAspectRatio})`;
  }
  flagAspectRatioInput.addEventListener('input', (event) => { setFlagAspectRatio(); })

  // For the strips-count controller
  const stripsCountInput = document.getElementById('strips-count-input');
  const stripsCountOutput = document.getElementById('strips-count-output');
  const strips = document.querySelectorAll('.strip');
  function setStripsCount() {
    const newStripsCount = stripsCountInput.value;
    root.style.setProperty('--strips-count', newStripsCount);
    strips.forEach((strip, index) => {
      strip.style.setProperty('flex-grow', index < newStripsCount ? 1 : 0);
    })
    stripsCountOutput.textContent = `(${newStripsCount})`;
  }
  stripsCountInput.addEventListener('input', (event) => { setStripsCount(); })

  // For the wave amplitude controller
  const waveAmplitudeInput = document.getElementById('wave-amplitude-input');
  const waveAmplitudeOutput = document.getElementById('wave-amplitude-output');
  function setWaveAmplitude() {
    const newAnimationDisplacementFactor = waveAmplitudeInput.value;
    root.style.setProperty('--animation-displacement-factor', newAnimationDisplacementFactor);
    waveAmplitudeOutput.textContent = `(${Math.round(newAnimationDisplacementFactor * 100)}%)`;
  }
  waveAmplitudeInput.addEventListener('input', (event) => { setWaveAmplitude(); })

  // For the wave length controller
  const waveLengthInput = document.getElementById('wave-length-input');
  const waveLengthOutput = document.getElementById('wave-length-output');
  function setWaveLength() {
    const newWaveLength = waveLengthInput.value;
    root.style.setProperty('--animation-wave-length', newWaveLength);
    waveLengthOutput.textContent = `(${Math.round(newWaveLength * 100)}%)`;
  }
  waveLengthInput.addEventListener('input', (event) => { setWaveLength(); })

  // For the wave period controller
  const wavePeriodInput = document.getElementById('wave-period-input');
  const wavePeriodOutput = document.getElementById('wave-period-output');
  function setWavePeriod() {
    const newAnimationDuration = wavePeriodInput.value + "s";
    root.style.setProperty('--animation-duration', newAnimationDuration);
    wavePeriodOutput.textContent = `(${newAnimationDuration})`;
  }
  wavePeriodInput.addEventListener('input', (event) => { setWavePeriod(); })

  // Initialisation — call all the functions
  function initialiseFlag() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.matches ? pauseAnimation() : playAnimation();

    const initiallyCheckedInput = document.querySelector('#flag-fieldset input:checked')
    root.style.setProperty('--flag-variant', `var(--${initiallyCheckedInput.value})`);

    setFlagSize();
    setFlagAspectRatio();
    setStripsCount();
    setWaveAmplitude();
    setWaveLength();
    setWavePeriod();
  }
  initialiseFlag();
</script>
