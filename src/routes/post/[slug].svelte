<script>
	import { page } from '$app/stores';
	import { posts } from '$lib/stores/store';
	import Navbar from '$lib/components/navbar.svelte';
	import spinner from 'svelte-awesome/icons/spinner';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	let slug = $page.params.slug;

	let info = null;
	let y, windowHeight;

	$: $posts.forEach((element) => {
		if (element.slugs[0] == slug) info = element.data;
	});
</script>

<svelte:window bind:scrollY={y} bind:innerHeight={windowHeight} />

<Navbar scrollY={y} windowHeight={windowHeight / 2} gotoEnabled={true} />

{#if info != null}
	<div class="w-3/4 mt-12 mx-auto text-white md:w-2/5 xl:w-1/3 ">
		<h1 class="text-4xl md:text-3xl xl:text-4xl font-bold my-12">{info.title[0].text}</h1>
		{#each info.body as content}
			{#if content.type == 'paragraph'}
				<p class="md:text-sm xl:text-base my-4">{content.text}</p>
			{:else if content.type == 'heading3'}
				<h3 class="font-semibold md:text-xl xl:text-3xl">{content.text}</h3>
			{:else if content.type == 'image'}
				<img class="max-h-48 mx-auto" src={content.url} alt={content.alt} />
			{/if}
		{/each}
	</div>
{:else}
	<Icon data={spinner} pulse />
{/if}
