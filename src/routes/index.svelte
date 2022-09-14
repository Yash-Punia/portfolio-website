<script>
	import { state } from '$lib/stores/stateStores';
	import Blogs from '$lib/components/posts.svelte';
	import About from '$lib/components/about.svelte';
	import Home from '$lib/components/home.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import Work from '$lib/components/work.svelte';
	import Games from '$lib/components/games.svelte';

	let y, windowHeight;
</script>

<svelte:window bind:scrollY={y} bind:innerHeight={windowHeight}/>

<svelte:head>
	<title>Yash Punia</title>
</svelte:head>

<Home />

<Navbar scrollY = {y} windowHeight = {windowHeight} gotoEnabled={false}/>

<div class="text-white mb-8 lg:mb-48">
	{#if $state == 'about'}
		<About />
	{:else if $state == 'work'}
		<Work />
	{:else if $state == 'posts'}
		<Blogs />
	{:else if $state == 'games'}
		<Games />
	{/if}
</div>
