<script>
	import { scale } from 'svelte/transition';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import { close, arrowLeft } from 'svelte-awesome/icons';
	export let info;
	let showDetails = false;
	const showProjectDetails = () => {
		showDetails = true;
	};

	const hideProjectDetails = () => {
		showDetails = false;
	};
</script>

<div class="container">
	<a href="/" style="position: absolute; top: 2em; left: 2em; color: #1ee8b7">
		<Icon
			data={arrowLeft}
			scale="3"
		/>
	</a>
	<div class="imageContainer">
		<img src={info.project_image.url} alt={info.project_name[0].text} />
	</div>
	<h2>{info.project_name[0].text}</h2>
	<div on:click={showProjectDetails} class="projectButton">View Project</div>
</div>

{#key showDetails}
	{#if showDetails == true}
		<div transition:scale class="projectDetailsContainer">
			<div class="projectDetails">
				<div on:click={hideProjectDetails} class="closeButton">
					<Icon data={close} scale="3" style="color: #1ee8b7" />
				</div>
				<img src={info.project_image.url} alt={info.project_name[0].text} />
				<div class="projectContent">
					<h1>{info.project_name[0].text}</h1>
					{#each info.project_description as item}
						<p>{item.text}</p>
					{/each}
				</div>
			</div>
		</div>
	{/if}
{/key}

<style lang="scss">
	@import '../global.scss';

	.container {
		width: 100%;
		height: 100%;
		align-self: center;
		.imageContainer {
			margin-bottom: 1em;
			padding: 0.5em;
			height: 20em;
			border-radius: 1em;
			background: $green-transparent;
			img {
				width: 100%;
				height: 100%;
				border-radius: 1em;
				object-fit: cover;
			}
		}

		.projectButton {
			cursor: pointer;
			margin-top: 1em;
			width: 20rem;
			font-size: 1em;
			text-decoration: none;
			color: white;
			background: #1ee8b722;
			box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
			width: fit-content;
			padding: 0.5rem 1rem;
			border-radius: 2rem;
			transition: ease-out 0.3s;
			&:hover {
				background: $green;
				color: black;
			}
		}
	}

	.projectDetailsContainer {
		top: 0;
		left: 0;
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom right, #1ee8b766, #7a88d866);
		backdrop-filter: blur(10px);
		border-radius: 2rem;
		text-decoration: none;
		padding: 0.5rem;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
		.projectDetails {
			position: relative;
			padding: 2em 3em;
			color: white;
			width: 100%;
			height: 100%;
			background: #0e1117dd;
			border-radius: 2rem;
			display: grid;
			place-items: center;

			img {
				width: 60%;
				margin: 0 auto;
				border-radius: 1em;
			}
			.closeButton {
				cursor: pointer;
				position: absolute;
				top: 2em;
				right: 2em;
			}
			.projectContent {
				font-size: 24px;
				width: 80%;
				h1 {
					font-size: 1.5em;
					margin-bottom: 1em;
					font-family: 'Montserrat';
				}
				p {
					font-size: 1em;
				}
			}
		}
	}
</style>
