<script>
	import {fade, fly} from 'svelte/transition'
	import BlogPost from '$lib/components/blogPost.svelte';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import {spinner} from 'svelte-awesome/icons';
	import { blogs } from '$lib/stores/store';
</script>

<div in:fade class="w-2/3 mx-auto">
	<div class="grid grid-cols-3 gap-8">
		{#each $blogs as post}
            <BlogPost info={post} />
		{:else}
			<Icon data={spinner} pulse/>
		{/each}
	</div>
</div>
