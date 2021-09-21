<script>
	import { state } from '$lib/stores/stateStores';
	import { projects } from '$lib/stores/projectStores';
	import { blogPosts } from '$lib/stores/blogStores';
	import { spinner } from 'svelte-awesome/icons';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import About from '$lib/components/about.svelte';
	import Home from '$lib/components/home.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import Projects from '$lib/components/projects.svelte';

</script>

<svelte:head>
	<title>Yash Punia</title>
</svelte:head>

<div class="grid">
	<div class="glass-element">
		<div class="container">
				{#if $state != 'home'}
					<Navbar />
				{/if}
				{#if $state == 'home'}
					<Home />
				{:else if $state == 'more'}
					<About />
				{:else if $state == 'projects'}
					<Projects />
				{/if}
		</div>
	</div>
</div>

<style lang="scss">
	@import '../lib/global.scss';
	.container {
		position: relative;
		transition: all 0.3s;
		padding: 2rem 3rem;
		color: white;
		background: #0e1117dd;
		width: 100%;
		height: 100%;
		border-radius: 2rem;
	}
	
	@media only screen and (max-width: 512px) {
		.container {
			padding: 1rem;
		}
	}
</style>
