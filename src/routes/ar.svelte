<script>
	import { onMount } from 'svelte';
	import App from '$lib/threejs/arPortfolio.js';

	let xrSupported;

	onMount(() => {
		if ('xr' in navigator) {
			navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
				xrSupported = supported;
				if (xrSupported) {
					window.focus();
					const app = new App();
					window.app = app;
				}
			});
		}
	});
</script>

{#if xrSupported != true}
	<div>
		<h1>XR is not available on this device. Kindly switch to Chrome for AR experience</h1>
	</div>
{/if}

<style lang="scss">
	div {
		display: grid;
		place-items: center;
		height: 100vh;
		h1 {
			color: white;
			margin: 0 auto;
		}
	}
</style>
