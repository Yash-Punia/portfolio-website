<script>
	import { onMount } from 'svelte';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import arrowCircleUp from 'svelte-awesome/icons/arrowCircleUp';
	import  arrowCircleDown from 'svelte-awesome/icons/arrowCircleDown';
	import App from '$lib/threejs/App.js';

	onMount(() => {
		window.focus();
		const app = new App();
		window.app = app;
	});

</script>

<div id="score">0</div>

<div class="container controls">
	<div class="up">
		<Icon data={arrowCircleUp} scale="4" />
		<p>Accelerate</p>
	</div>
	<div class="down">
		<Icon data={arrowCircleDown} scale="4" />
		<p>Decelerate</p>
	</div>
</div>

<div id="reset" class="container reset">
	<p>Press 'R' to reset game</p>
</div>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap');

	#score {
		font-family: 'Dela Gothic One';
		color: white;
		position: absolute;
		top: 45vh;
		left: 27vw;
		font-size: 5em;
	}

	.controls {
		position: absolute;
		left: 2em;
		bottom: 2em;
	}

	.reset {
		position: absolute;
		top: 50vh;
		left: 50vw;
		transform: translate(-50%, -50%);
		display: none;
	}

	.container {
		color: white;
		background: #12121299;
		border-radius: 1em;
		font-size: 1.5em;
		padding: 1em;
		.up,
		.down {
			display: flex;
			align-items: center;
			p {
				margin-left: 1em;
			}
		}
	}
</style>
