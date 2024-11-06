---
date: 2024-11-05
title: US voters — flip a coin!
draft: false
tags: []
---

<style>
	/* To do: clean up this code! */
	:root {
		--pi: 3.14159265358979;
		--coin-diameter: min(20rem, 50vw);
		--coin-thickness: calc(var(--coin-diameter) / 40);
		/* --coin-spokes-count: 48; This should be the number of children of #coin-spokes */
		--coin-edge-count: 48; /* This should be the number of children of #coin-edge */
		--coin-edge-face-length: calc(var(--coin-diameter) * var(--pi) / var(--coin-edge-count));
		/* --coin-spokes-background: repeating-linear-gradient(darkblue 0%, darkred calc(0.25 * var(--coin-diameter)), darkblue calc(0.5 * var(--coin-diameter))); */
		--coin-edge-background: repeating-linear-gradient(darkblue 0%, darkred calc(0.25 * var(--coin-edge-face-length)), darkblue calc(0.5 * var(--coin-edge-face-length)));
		--animation-start-delay: -0.4s;
	}
	#coin-container {
		display: block;
		flex-shrink: 0;
		width: var(--coin-diameter);
		height: var(--coin-diameter);
		perspective: calc(10 * var(--coin-diameter));
		margin-top: 1rem;
		margin-bottom: 2rem;
	}
	#coin-container * {
		transform-style: preserve-3d;
	}
	#coin {
		width: 100%;
		height: 100%;
		position: relative;
		transition: rotate 0.5s;
		transform-style: preserve-3d;
		animation: 0.5s var(--animation-start-delay) infinite linear spin, 1.5s var(--animation-start-delay) infinite ease-in-out wobble;
		animation-play-state: paused;
		animation-fill-mode: forwards;
		animation-composition: accumulate;
		transform-origin: bottom;
	}
	.spinning #coin {
		animation-play-state: running;
	}
	.harris #coin {
		animation: 0.5s var(--animation-start-delay) 3 linear spin, 1.5s var(--animation-start-delay) 1 ease-in-out wobble;
	}
	.trump #coin {
		animation: 0.5s var(--animation-start-delay) 3 linear spin, 1.5s var(--animation-start-delay) 1 ease-in-out wobble;
		rotate: y 900deg;
	}
	/* The ::before & ::after would be on the <img> elements, but <img> elements can’t have pseudo-elements. */
	#coin::before, #coin::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background-image: radial-gradient(circle at 50% 50%, transparent, transparent, #470047);
	}
	#coin::before {
		translate: 0 0 calc(1px + var(--coin-thickness) / 2);
	}
	#coin::after {
		translate: 0 0 calc(-1px - var(--coin-thickness) / 2);
	}
	#coin-container img {
		position: absolute;
		width: 100%;
		height: 100%;
		aspect-ratio: 1 / 1;
		border-radius: 50%;
		backface-visibility: hidden;
	}
	#coin-container img:first-of-type {
		translate: 0 0 calc(var(--coin-thickness) / 2);
	}
	#coin-container img:last-of-type {
		rotate: y 180deg;
		translate: 0 0 calc(var(--coin-thickness) / -2);
	}
	/* #coin-spokes {
		display: none;
	}
	#coin-spokes div {
		width: var(--coin-thickness);
		height: var(--coin-diameter);
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%) rotateY(90deg) rotateX(calc(90deg + var(--index) * 360deg / var(--coin-spokes-count)));
	}
	#coin-spokes div::before {
		content: '';
		position: absolute;
		display: block;
		width: var(--coin-thickness);
		height: var(--coin-spokes-length);
		height: 100%;
		background: var(--coin-spokes-background);
		background-size: 100% 200%;
		background-position-y: calc(var(--coin-diameter) * var(--index) / var(--coin-spokes-count));
		backface-visibility: visible;
	} */
	#coin-edge div {
		width: var(--coin-thickness);
		height: var(--coin-diameter);
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%) rotateY(90deg) rotateX(calc(90deg + var(--index) * 360deg / var(--coin-edge-count)));
	}
	#coin-edge div::before {
		content: '';
		position: absolute;
		display: block;
		width: var(--coin-thickness);
		height: var(--coin-edge-face-length);
		background: var(--coin-edge-background);
		background-size: var(--coin-thickness) calc(2* var(--coin-edge-face-length));
		background-position-y: calc(var(--coin-edge-face-length) * var(--index) / var(--coin-edge-count));
		transform: rotateX(calc(90deg * (var(--coin-edge-count) - 2) / var(--coin-edge-count)));
		transform-origin: top;
		backface-visibility: visible;
	}

	@keyframes spin {
		from {
			rotate: y 0deg;
		}
		to {
			rotate: y 360deg;
		}
	}

	@keyframes wobble {
		0% {
			rotate: x 0deg;
		}
		25% {
			rotate: x 10deg;
		}
		50% {
			rotate: x 0deg;
		}
		75% {
			rotate: x -20deg;
		}
		100% {
			rotate: x 0deg;
		}
	}

	@media (min-width: 48rem) {
		/* #page-container {
			display: flex;
			gap: 1rem;
		} */
		#coin-container {
			shape-outside: circle(calc(50% + 2rem));
	 		float: left;
			margin-right: 2rem;
		}
	}

	.text.harris:not(.harris *) {
		display: none;
	}

	.text.trump:not(.trump *) {
		display: none;
	}

	.text h2 {
		margin-top: 0;
	}
</style>

# US voters — flip a coin!

The present presidential election in the (dis-)United States has candidates with such equal chances of victory, it’s like America is flipping a coin.
So here’s a coin that you can flip.
The nice thing here is you can play as many times as you want, without (re-)releasing a disastrous commander-in-chief on the world.

<button type="button" id="btn-spin">Flip the coin!</button>

<div id="page-container">

<!-- <fieldset>
	<legend>Coin state</legend>
	<label>
		<input type="radio" name="coin-state" value="spinning" />
		Spinning
	</label>
	<label>
		<input type="radio" name="coin-state" value="harris" />
		Kamala Harris
	</label>
	<label>
		<input type="radio" name="coin-state" value="trump" />
		Donald Trump
	</label>
</fieldset> -->

<div id="coin-container">
	<div id="coin">
		<img src="/blog/images/2024/harris.webp" alt="Kamala Harris" />
		<img src="/blog/images/2024/trump.webp" alt="Donald Trump" />
		<!-- <div id="coin-spokes">
			<div style="--index: 0;"></div>
			<div style="--index: 1;"></div>
			<div style="--index: 2;"></div>
			<div style="--index: 3;"></div>
			<div style="--index: 4;"></div>
			<div style="--index: 5;"></div>
			<div style="--index: 6;"></div>
			<div style="--index: 7;"></div>
			<div style="--index: 8;"></div>
			<div style="--index: 9;"></div>
			<div style="--index: 10;"></div>
			<div style="--index: 11;"></div>
			<div style="--index: 12;"></div>
			<div style="--index: 13;"></div>
			<div style="--index: 14;"></div>
			<div style="--index: 15;"></div>
			<div style="--index: 16;"></div>
			<div style="--index: 17;"></div>
			<div style="--index: 18;"></div>
			<div style="--index: 19;"></div>
			<div style="--index: 20;"></div>
			<div style="--index: 21;"></div>
			<div style="--index: 22;"></div>
			<div style="--index: 23;"></div>
			<div style="--index: 24;"></div>
			<div style="--index: 25;"></div>
			<div style="--index: 26;"></div>
			<div style="--index: 27;"></div>
			<div style="--index: 28;"></div>
			<div style="--index: 29;"></div>
			<div style="--index: 30;"></div>
			<div style="--index: 31;"></div>
			<div style="--index: 32;"></div>
			<div style="--index: 33;"></div>
			<div style="--index: 34;"></div>
			<div style="--index: 35;"></div>
			<div style="--index: 36;"></div>
			<div style="--index: 37;"></div>
			<div style="--index: 38;"></div>
			<div style="--index: 39;"></div>
			<div style="--index: 40;"></div>
			<div style="--index: 41;"></div>
			<div style="--index: 42;"></div>
			<div style="--index: 43;"></div>
			<div style="--index: 44;"></div>
			<div style="--index: 45;"></div>
			<div style="--index: 46;"></div>
			<div style="--index: 47;"></div>
		</div> -->
		<div id="coin-edge">
			<div style="--index: 0;"></div>
			<div style="--index: 1;"></div>
			<div style="--index: 2;"></div>
			<div style="--index: 3;"></div>
			<div style="--index: 4;"></div>
			<div style="--index: 5;"></div>
			<div style="--index: 6;"></div>
			<div style="--index: 7;"></div>
			<div style="--index: 8;"></div>
			<div style="--index: 9;"></div>
			<div style="--index: 10;"></div>
			<div style="--index: 11;"></div>
			<div style="--index: 12;"></div>
			<div style="--index: 13;"></div>
			<div style="--index: 14;"></div>
			<div style="--index: 15;"></div>
			<div style="--index: 16;"></div>
			<div style="--index: 17;"></div>
			<div style="--index: 18;"></div>
			<div style="--index: 19;"></div>
			<div style="--index: 20;"></div>
			<div style="--index: 21;"></div>
			<div style="--index: 22;"></div>
			<div style="--index: 23;"></div>
			<div style="--index: 24;"></div>
			<div style="--index: 25;"></div>
			<div style="--index: 26;"></div>
			<div style="--index: 27;"></div>
			<div style="--index: 28;"></div>
			<div style="--index: 29;"></div>
			<div style="--index: 30;"></div>
			<div style="--index: 31;"></div>
			<div style="--index: 32;"></div>
			<div style="--index: 33;"></div>
			<div style="--index: 34;"></div>
			<div style="--index: 35;"></div>
			<div style="--index: 36;"></div>
			<div style="--index: 37;"></div>
			<div style="--index: 38;"></div>
			<div style="--index: 39;"></div>
			<div style="--index: 40;"></div>
			<div style="--index: 41;"></div>
			<div style="--index: 42;"></div>
			<div style="--index: 43;"></div>
			<div style="--index: 44;"></div>
			<div style="--index: 45;"></div>
			<div style="--index: 46;"></div>
			<div style="--index: 47;"></div>
		</div>
	</div>
</div>

<div class="text harris">

<h2>The coin chooses Kamala Harris.</h2>

<p>She’s a prosecutor, not a felon.</p>
<p>She’d be the first female US president.</p>
<p>She says she’ll expand healthcare access (Obamacare) for elderly people.</p>
<p>If a hurricane hits, she might do more than throw some paper towels at people.</p>
<p>She would continue the West’s strong support for Ukraine against the Russian invasion.</p>
<p>Her running-mate Tim Walz seems fun — and he knows how to laugh at the far right when they’re being “weird”.</p>
<p>Her manifesto includes measures to make groceries cheaper.</p>
<p>She says she’ll crack down on price-gouging in pharmaceuticals.</p>
<p>Harris cast the deciding vote to pass the Inflation Reduction Act, which gave huge investments in renewable energy in the USA.</p>
<p>She probably won’t sell off much public land to rich pollutors.</p>
<p>She publicly says she wants a ceasefire in Gaza.</p>
<p>She intends to incentivise at least 1.2 million more affordable houses to be built, according to her manifesto.</p>
<p>Harris would give down-payments of up to $25k to people buying their first house.</p>
<p>She says she’ll reverse tax-cuts that Trump made for the ultra-wealthy.</p>
<p>Harris claims to offer “a new way forward for the middle class”.</p>
<p>Apparently she’s the first incumbent vice-president to visit a reproductive health-care clinic.</p>
<p>Her running-mate Tim Walz reduced gun violence by increasing background checks on fire-arm purchases.</p>
<p>Endorsed by Taylor Swift, Harrison Ford, Beyoncé, Bruce Springsteen, Katy Perry, Eminem, Cardi B, Lady Gaga, Billie Eilish (and Finneas), Arnold Schwarzenegger, Madonna, Bad Bunny, Jennifer Lopez, Samuel L Jackson…</p>
<p>Harris probably wouldn’t call Puerto Rico a “floating island of garbage”.</p>
<p>
	Harris’s running-mate Tim Walz seems to have been a principled and caring teacher.
	He even helped found his school’s first Gay-Straight Alliance, in the 1990s.
</p>
<p>She seems to be interested in tackling climate change.</p>
<p>The Democrats took the Covid-19 pandemic more seriously than the Republicans did.</p>
<p>Economists largely favour her plan over Trump’s.</p>
<p>Major newspapers have endorsed her, and the editorial teams of the Los Angeles Times and Washington Post also voted to endorse her.</p>
<p>Very importantly, she’s not Trump.</p>

</div>

<div class="text trump">

<h2>The coin chooses Donald Trump.</h2>

<p>He said he’d be a dictator “on day one”.</p>
<p>This guy said (wrongly) that wind turbines are killing thousands of bald eagles. And whales.</p>
<p>This guy whipped up racial hatred by falsely accusing Haitian immigrants of eating dogs and cats.</p>
<p>He took the US out the Paris Climate Accords.</p>
<p>He has repeatedly called global warming a hoax.</p>
<p>Inciting an insurrection isn’t really very good.</p>
<p>I think a president should have some convictions. But probably not criminal ones.</p>
<p>The guy tried to ban all Muslims from entering the USA.</p>
<p>His last presidency would have been even worse, if his staff had been more competent.</p>
<p>Trump would repeal the Affordable Care Act (Obamacare), replacing it with “concepts of a plan”. Whatever that is, it would be vastly expensive for anyone requiring a lot of medical treatment.</p>
<p>He boasted about sexually assaulting women. Then said it was just “locker-room talk”.</p>
<p>Seriously, how many women has he sexually assaulted?</p>
<p>After the 2020 election, he asked election officials in the state of Georgia to “find” 11,780 more votes for him.</p>
<p>His plan for enabling more Americans to own a house involves deporting millions of people deemed too foreign.</p>
<p>His running-mate JD Vance deliberately called legal residents “illegal aliens”, and says he intends to continue abusing language (and immigrants) in this way.</p>
<p>He still claims to have won the 2020 election!</p>
<p>Trump intends to put Robert F Kennedy in positions of high power, such as in health agencies. He’s a vaccine skeptic.</p>
<p>Tax-cuts for the very rich!</p>
<p>Mar-a-Lago seems like an odd place for keeping boxes of state secrets.</p>
<p>Endorsed by Kid Rock. I don’t know who that is. Apparently a rapper.</p>
<p>
	His previous vice-president was an evangelical homophobe (Mike Pence).
	He rightly disagreed with Trump on the question of who won the 2020 election.
	Trump fans threatened to hang him for that.
</p>
<p>The Trump campaign (via “comedian” Tony Hinchcliffe) called Puerto Rico a “floating island of garbage”.</p>
<p>Attacks on transgender rights have been a major feature of Republican politics across the USA.</p>
<p>I expect the Republicans to be even more pro-Israel and anti-Palestine than Joe Biden. Gaza and the West Bank may be fully subsumed into Israel.</p>
<p>Trump’s handling of the Covid-19 pandemic was so cavalier, he caught it himself.</p>
<p>Expect abortion to be a lot harder to access.</p>
<p>Tax breaks and reduced regulations on fossil fuel corporations will accelerate global warming.</p>
<p>Trump would install judges friendly to himself and other criminals.</p>
<p>Newspapers may not report on his misdeeds for fear of retaliation. Jeff Bezos has already prevented the Washington Post from endorsing Harris. Likewise the Los Angeles Times with its owner Patrick Soon-Shiong.</p>
<p>My friends in the USA call him a fascist. People who have worked with him call him a fascist. Experts in fascism call him a fascist.</p>

</div>

</div>

<p style="clear: both">
	Fun fact: the purple tint on the coin is <code>#470047</code>, because the US is electing its 47th president.
</p>

<!--

Sources:
- Kamala Harris photo: https://en.wikipedia.org/wiki/File:Kamala_Harris_Vice_Presidential_Portrait.jpg
- Donald Trump photo: https://commons.wikimedia.org/wiki/File:Donald_Trump_official_portrait.jpg

 -->

<script>
	const body = document.querySelector('body')
	const coin = document.querySelector('#coin')
	// const coinStateRadios = [...document.querySelectorAll('input[name="coin-state"]')]
	// coinStateRadios.map(element => element.addEventListener('change', (e) => {
	// 	body.className = e.target.value;
	// }))

	const harrisParas = [...document.querySelectorAll('.text.harris p')]
	const trumpParas = [...document.querySelectorAll('.text.trump p')]

	function hideParasExceptOneAtRandom(winner) {
		const paras = winner === 'harris' ? harrisParas : trumpParas;
		const randomIndex = Math.floor(Math.random() * paras.length);
		// console.log({winner, paras, randomIndex})
		paras.forEach(para => para.setAttribute('hidden', ''));
		paras[randomIndex].removeAttribute('hidden');
	}

	const spinButton = document.querySelector("#btn-spin");
	spinButton.addEventListener("click", (e) => {
		spinButton.setAttribute("disabled", "")
		spinButton.textContent = "Flipping…"
		coin.style.rotate = "";
		body.className = "spinning";
		window.setTimeout(() => {
			const winner = Math.random() > 0.5 ? "harris" : "trump";
			body.className = winner;
			coin.style.rotate = winner === 'harris' ? "y 0deg" : 'y 180deg';
			hideParasExceptOneAtRandom(winner)
			spinButton.textContent = "Flip the coin"
			spinButton.removeAttribute("disabled")
		}, 3000)
	})

</script>
