<script>
	import { onMount } from 'svelte';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import { refresh } from 'svelte-awesome/icons';
	import App from '$lib/threejs/arPortfolio.js';

	let xrSupported = null;
	let app;

	onMount(() => {
		if ('xr' in navigator) {
			navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
				xrSupported = supported;
				if (xrSupported) {
					window.focus();
					app = new App();
					window.app = app;
				}
			});
		}
	});
</script>

<div class="container">
	{#if xrSupported == null}
		<Icon data={refresh} spin />
	{:else if xrSupported == true}
		<div class="xrButton" on:click={app.startAR()}> 
			See AR Portfolio	
		</div>
	{:else}
		<div>
			<h1>XR is not available on this device. Kindly switch to Chrome for AR experience</h1>
		</div>
	{/if}
</div>

<style lang="scss">
	@import '../lib/global.scss';

	.container {
		display: grid;
		place-items: center;
		height: 100vh;
		h1 {
			color: white;
			margin: 0 auto;
		}

		.xrButton {
			cursor:pointer;
			background: $green;
			padding: 1em;
			font-size: 1.5em;
			border-radius: 1em;
		}
	}
</style>
