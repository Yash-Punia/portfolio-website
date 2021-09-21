<script>
	import ProjectCard from '$lib/components/projectCard.svelte';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import spinner from 'svelte-awesome/icons/spinner';
	import { projects } from '$lib/stores/projectStores';
</script>

<div class="project-container">
	<h1>See my work</h1>
	<div class="project-grid">
		{#each $projects as project}
			<ProjectCard info={project.data} />
		{:else}
			<Icon data={spinner} pulse/>
		{/each}
	</div>
</div>

<style lang="scss">
	@import '../../lib/global.scss';
	.project-container {
		width: 70vw;
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

	@media only screen and (max-width: 512px) {
		.project-container {
			.project-grid {
				grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
			}
		}
	}
</style>
