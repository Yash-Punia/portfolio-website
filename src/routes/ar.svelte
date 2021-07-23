<script>
	import { onMount } from 'svelte';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import { refresh } from 'svelte-awesome/icons';
	import App from '$lib/threejs/arPortfolio.js';

	let xrSupported = null;

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

{#if xrSupported == null}
	<Icon data={refresh} spin />
{:else if xrSupported == true}
	<div class="xrButton" />
{:else}
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
