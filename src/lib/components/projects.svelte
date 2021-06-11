<script>
	import { projects } from '$lib/stores/projectStores';

	// $: console.log($projects);

	let y;
</script>

<svelte:window bind:scrollY={y} />

<h1 class="heading">Projects</h1>
{#if $projects.length > 0}
	<div class="projects-container">
		{#each $projects as project}
			<div class="project-list-item">
				<div class="project-item-content">
					<h3>{project.data.project_name[0].text}</h3>
					<div class="glass-element project-item-desc">
						{#each project.data.project_description as desc}
							<p>{desc.text}</p>
						{/each}
					</div>
					<div class="project-item-links">
						{#if project.data.github_link.url !== undefined}
							<a
								class="project-source-link glass-element"
								href={project.data.github_link.url}
								target="__blank"
							>
								Source Code
							</a>
						{/if}
						{#if project.data.hosted_link.url !== undefined}
							<a
								class="project-live-link glass-element"
								href={project.data.hosted_link.url}
								target="__blank"
							>
								See Live
							</a>
						{/if}
					</div>
				</div>
				<img src={project.data.project_image.url} alt={project.data.project_image.alt} />
			</div>
		{/each}
	</div>
{/if}

<style>
	.heading {
		width: 80%;
		margin: 0 auto;
		margin-top: 6rem;
		color: #222;
		opacity: 0.8;
		text-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
		font-size: 6rem;
		font-weight: 600;
	}

	.projects-container {
		width: 80%;
		margin: 10rem auto;
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	.project-list-item {
		display: grid;
		place-items: center;
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: minmax(200px, 400px);
		place-items: center;
	}

	.project-list-item > img {
		max-height: 100%;
		min-width: 80%;
		max-width: 80%;
		border-radius: 1rem;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}

	.project-item-content {
		display: flex;
		flex-direction: column;
	}

	.project-item-content > h3 {
		z-index: 1;
		position: relative;
		bottom: -1.5rem;
		left: 3rem;
		font-size: 3rem;
		text-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
		color: #000;
		font-weight: 700;
		opacity: 0.8;
		transition: bottom 0.3s;
	}

	.project-item-content:hover > h3 {
		bottom: -1rem;
	}

	.project-item-content:hover > .project-item-links {
		top: -0.5rem;
	}

	.project-item-desc {
		height: fit-content;
		padding: 2rem 1rem;
		font-size: 1.5rem;
	}

	.project-item-links {
		position: relative;
		right: 1rem;
		top: -1rem;
		display: flex;
		align-self: flex-end;
		transition: top 0.3s;
	}

	.project-source-link,
	.project-live-link {
		padding: 1rem;
		text-decoration: none;
		margin: 0 1rem;
		opacity: 0.9;
		font-size: 1.4rem;
		color: #000;
		font-weight: 600;
		transition: all 0.3s;
	}

	.project-source-link:hover,
	.project-live-link:hover {
		background: #fff;
		opacity: 1;
	}

	@media only screen and (max-width: 768px) {
		.project-list-item {
			grid-template-columns: 1fr;
		}

		.project-item-content > h3 {
			bottom: -1.5rem;
			left: 0;
			color: #fff;
			text-align: center;
			transition: none;
		}
		.project-item-content:hover > h3 {
			bottom: -1.5rem;
		}
		.project-item-links {
			width: 100%;
			position: relative;
			right: 0;
			top: 1rem;
			display: flex;
			justify-content: center;
			transition: top 0.3s;
		}
		.project-source-link,
		.project-live-link {
			text-align: center;
			min-width: 30%;
			padding: 1rem;
			text-decoration: none;
			margin: 0 1rem;
			opacity: 0.9;
			font-size: 1rem;
			color: #000;
			font-weight: 600;
			transition: none;
		}
		.project-item-content:hover > .project-item-links {
			top: 1rem;
		}
		.project-list-item > img {
			max-height: 90%;
			min-width: 80%;
			max-width: 90%;
			border-radius: 1rem;
			box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
		}
	}
</style>
