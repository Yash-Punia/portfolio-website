<script>
	let y;
</script>

<slot />
<div class="hidden lg:block circle circle-1" style="opacity: {Math.max(0.1, 0.6-y*0.001)}"/>
<div class="circle circle-2" style="opacity: {Math.max(0.1, 0.6-y*0.001)}"/>
<div class="circle circle-3" style="opacity: {Math.max(0.1, 0.6-y*0.001)}"/>
<div class="circle circle-4" style="opacity: {Math.max(0.1, 0.6-y*0.001)}"/>

<svelte:window bind:scrollY={y} />


<style lang="scss">
	@import '../lib/global.scss';
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;900&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600;700&family=Source+Sans+Pro:wght@300;400;600;700&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@200;300;400;500;600;700;800&display=swap');

	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	:root {
		--primary: #{$primary};
		--primary-transparent: #{$primary-transparent};
		--glass-gradient-to: #{$glass-gradient-to};
		--glass-gradient-from: #{$glass-gradient-from};
		--glass-button: #{$glass-button};
		--circle-one: #{$circle-one};
		--circle-two: #{$circle-two};
		--circle-three: #{$circle-three};
		--dark: #{$dark};
		--black-transparent: #{$black-transparent};
	}

	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(body) {
		@apply bg-dark
	}

	:global(.glass-element) {
		@apply bg-gradient-to-br from-glass-gradient-from to-glass-gradient-to shadow-xl backdrop-blur-lg;
	}

	:global(::-webkit-scrollbar) {
		width: 5px;
	}

	:global(::-webkit-scrollbar-track) {
		background-color: $dark;
	}

	:global(::-webkit-scrollbar-thumb) {
		background-color: $primary-transparent;
	}

	.circle {
		position: absolute;
		background: radial-gradient(at 0% 30%, $circle-one 20%, $circle-two, $circle-three);
		border-radius: 100%;
		animation-name: circle;
		animation-duration: 4s;
		animation-iteration-count: infinite;
	}

	.circle-1 {
		z-index: -1;
		// position: fixed;
		bottom: 50vh;
		right: 1vw;
		width: 300px;
		height: 300px;
		animation-delay: 1s;
	}

	.circle-2 {
		z-index: -1;
		// position: fixed;
		top: 20vh;
		left: 20vw;
		width: 100px;
		height: 100px;
		animation-delay: 2s;
	}

	.circle-3 {
		z-index: -1;
		// position: fixed;
		bottom: 8vh;
		right: 30vw;
		width: 50px;
		height: 50px;
		animation-delay: 3s;
	}

	.circle-4 {
		z-index: -1;
		// position: fixed;
		bottom: 20vh;
		left: 5vw;
		width: 75px;
		height: 75px;
	}

	@keyframes circle {
		0% {
			transform: translateY(0rem);
		}

		50% {
			transform: translateY(2rem);
		}

		100% {
			transform: translateY(0);
		}
	}

	@media only screen and (max-width: 768px) {
		
	}
</style>
