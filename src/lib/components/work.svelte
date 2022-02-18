<script>
	import {fade, fly} from 'svelte/transition'
	import ProjectCard from '$lib/components/projectCard.svelte';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import spinner from 'svelte-awesome/icons/spinner';
	import { projects } from '$lib/stores/store';
</script>

<div in:fade class="w-2/3 mx-auto">
	<div class="grid grid-cols-3 gap-8">
		{#each $projects as project}
			<ProjectCard info={project.data} />
		{:else}
			<Icon data={spinner} pulse/>
		{/each}
	</div>
</div>
