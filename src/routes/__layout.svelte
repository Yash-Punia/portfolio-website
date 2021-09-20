<slot />
<div class="circle circle-1" />
<div class="circle circle-2" />
<div class="circle circle-3" />
<div class="circle circle-4" />

<style lang="scss">
	@import '../lib/global.scss';
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;900&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600;700&family=Source+Sans+Pro:wght@300;400;600;700&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@200;300;400;500;600;700;800&display=swap');

	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(body) {
		font-family: 'Work Sans', 'Roboto', 'Source Sans Pro';
		background: $background;
		background-position: top right;
		background-repeat: no-repeat;
		min-height: 100vh;
	}

	:global(.grid) {
		min-height: 100vh;
		padding: 10vh 0;
		display: grid;
		place-items: center;
	}

	:global(.glass-element) {
		background: linear-gradient(to bottom right, #1ee8b766, #7a88d866);
		backdrop-filter: blur(10px);
		border-radius: 2rem;
		text-decoration: none;
		padding: 0.5rem;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
		transition: all 0.3s;
	}

	:global(::-webkit-scrollbar) {
		width: 5px;
	}

	:global(::-webkit-scrollbar-track) {
		background-color: $background;
	}

	:global(::-webkit-scrollbar-thumb) {
		background-color: $green-transparent;
	}

	.circle {
		background: radial-gradient(at 0% 30%, $circle-green 20%, $circle-blue, $circle-purple);
		border-radius: 100%;
		animation-name: circle;
		animation-duration: 4s;
		animation-iteration-count: infinite;
	}

	.circle-1 {
		z-index: -1;
		position: fixed;
		bottom: 50vh;
		right: 1vw;
		width: 300px;
		height: 300px;
		animation-delay: 1s;
	}

	.circle-2 {
		z-index: -1;
		position: fixed;
		top: 20vh;
		left: 20vw;
		width: 100px;
		height: 100px;
		animation-delay: 2s;
	}

	.circle-3 {
		z-index: -1;
		position: fixed;
		bottom: 8vh;
		right: 30vw;
		width: 50px;
		height: 50px;
		animation-delay: 3s;
	}

	.circle-4 {
		z-index: -1;
		position: fixed;
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
