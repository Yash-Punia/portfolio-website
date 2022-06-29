<script>
	import {fade, fly} from 'svelte/transition'
	import Post from '$lib/components/post.svelte';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import spinner from 'svelte-awesome/icons/spinner';
	import { posts } from '$lib/stores/store';
</script>

<div in:fade class="mx-auto w-3/4 md:w-2/5 xl:w-1/3">
	<div class="grid grid-cols-1 gap-8">
		{#each $posts as post}
            <Post info={post} />
		{:else}
			<Icon data={spinner} pulse/>
		{/each}
	</div>
</div>
