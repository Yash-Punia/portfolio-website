<script>
	import { state } from '$lib/stores/stateStores';
	import Blogs from '$lib/components/blogs.svelte';
	import About from '$lib/components/about.svelte';
	import Home from '$lib/components/home.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import Work from '$lib/components/work.svelte';
</script>

<svelte:head>
	<title>Yash Punia</title>
</svelte:head>

<Home />

<Navbar />

<div class="text-white mb-48">
	{#if $state == 'about'}
		<About />
	{:else if $state == 'work'}
		<Work />
	{:else if $state == 'posts'}
		<Blogs />
	{/if}
</div>
