<script>
	import {fade} from 'svelte/transition';
	import ProjectCard from '$lib/components/projectCard.svelte';
	import { projects } from '$lib/stores/projectStores';
</script>

<div in:fade={{delay: 500}} class="project-container">
	<h1>See my work</h1>
	<div class="project-grid">
		{#each $projects as project}
			<ProjectCard info={project.data} />
		{/each}
	</div>
</div>

<style lang="scss">
	@import '../../lib/global.scss';
	.project-container {
		width: 60vw;
		h1 {
			color: white;
			text-align: center;
			font-family: 'Montserrat';
		}
		.project-grid {
			display: grid;
			margin-top: 5em;
			place-items: center;
			grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
			gap: 5em;
		}
	}
</style>
