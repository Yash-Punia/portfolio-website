<script>
	export let info;
</script>

<div class="glass-element p-2 rounded-xl container">
	<div class="bg-glass-container rounded-xl pb-2 ">
		<img
			class="w-full h-full rounded-xl rounded-b-none mb-4"
			src={info.project_image.url}
			alt={info.project_name[0].text}
		/>
		<div class="mx-4">
			<h2 class="text-xl">{info.project_name[0].text}</h2>
			<p>{info.project_description[0].text}</p>
			<div class="my-4 flex justify-around text-primary">
				{#if info.hosted_link.url != null}
					<a href={info.hosted_link.url} target="_blank">See Live</a>
				{/if}
				{#if info.github_link.url != null}
					<a href={info.github_link.url} target="_blank">Source Code</a>
				{/if}
			</div>
			<div class="flex flex-wrap justify-center">
				{#each info.tech_stack as tech}
					<div class="mr-4 mb-4 bg-primary-transparent rounded-2xl px-2">{tech.text}</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import '../global.scss';

	.container {
		height: fit-content;
	}
</style>
