<script>
	export let info;
</script>

<div class="container">
	<div class="imageContainer">
		<img src={info.project_image.url} alt={info.project_name[0].text} />
	</div>
	<h2>{info.project_name[0].text}</h2>
	<p>{info.project_description[0].text}</p>
	<div class="links">
		{#if info.hosted_link.url != null}
			<a href={info.hosted_link.url} class="seeLive" target="_blank">See Live</a>
		{/if}
		{#if info.github_link.url != null}
			<a href={info.github_link.url} class="sourceCode" target="_blank">Source Code</a>
		{/if}
	</div>
	<div class="techStack">
		{#each info.tech_stack as tech}
			<div class="tech">{tech.text}</div>
		{/each}
	</div>
</div>

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
			background: $primary-transparent;
			img {
				width: 100%;
				height: 100%;
				border-radius: 1em;
				object-fit: cover;
			}
		}
		.links {
			margin: 1em 0;
			display: flex;
			justify-content: space-around;
			a {
				text-decoration: none;
				color: $circle-one;
				padding: 0.3em 1em;
				border-radius: 1em;
				transition: all 0.3s;
				&:hover {
					color: white;
				}
			}
		}
		.techStack {
			display: flex;
			flex-wrap: wrap;
			.tech {
				margin-right: 1em;
				margin-bottom: 1em;
				padding: 0.3em 1em;
				background: $primary-transparent;
				border-radius: 1em;
			}
		}
	}
</style>
