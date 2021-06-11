<script>
	import { onMount } from 'svelte';
	onMount(() => {
		if (document.documentElement.clientWidth > 768) {
			document.addEventListener('mousemove', parallax);
			function parallax(e) {
				const body = document.body;
				const x = (e.clientX * 2)/100;
				const y = (e.clientY * 2)/100;
				body.style.backgroundPosition = `-${x}px -${y}px`;
			}
		}
	});
</script>

<slot />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;900&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600;700&family=Source+Sans+Pro:wght@300;400;600;700&display=swap');

	:global(*) {
		margin: 0;
		padding: 0;
	}

	:global(html),
	:global(body) {
		overflow-x: hidden;
	}

	:global(body) {
		overflow: hidden;
		font-family: 'Source Sans Pro';
		background: url('public/images/bg-1.png');
		background-position: center;
		background-repeat: no-repeat;
		background-size: 125%;
		background-attachment: fixed;
	}

	:global(.glass-element) {
		border: 1px solid rgba(255, 255, 255, 0.7);
		background: rgba(255, 255, 255, 0.5);
		border-radius: 1rem;
		backdrop-filter: blur(24px);
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}

	@media only screen and (max-width: 768px) {
		:global(body) {
			background-size: cover;
		}
	}
</style>
