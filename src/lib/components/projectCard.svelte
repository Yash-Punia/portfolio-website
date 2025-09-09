<script>
	export let info;

	let cardBackground;

	const spotlightRemove = () => {
		cardBackground.style.background = 'none';
	};

	const spotlight = (e) => {
		const rect = cardBackground.getBoundingClientRect();
		const x = e.clientX - rect.left; //x position within the element.
		const y = e.clientY - rect.top; //y position within the element.
		cardBackground.style.background = `radial-gradient(circle at ${x}px ${y}px , #1ee8b766 ,rgba(255,255,255,0) )`;
	};
</script>

<div
	class="rounded-xl"
	bind:this={cardBackground}
	on:mouseleave={spotlightRemove}
	on:mousemove={(e) => {
		spotlight(e);
	}}
>
	<div class="bg-black-transparent rounded-xl grid-rows-2 grid lg:grid-cols-2  lg:grid-rows-none">
		<img
			class="rounded-xl  md:rounded-r-none md:rounded-br-none h-full object-cover xl:object-left"
			src={info.project_image.url}
			alt={info.project_name[0].text}
		/>
		<div class="p-4">
			<h2 class="xl:text-xl">{info.project_name[0].text}</h2>
			<p class="text-xs xl:text-base">{info.project_description[0].text}</p>
			<div class="my-4 flex justify-around text-primary text-xs xl:text-base">
				{#if info.hosted_link.url != null}
					<a class="transition-all hover:font-bold" href={info.hosted_link.url} target="_blank"
						>See Live</a
					>
				{/if}
				{#if info.github_link.url != null}
					<a class="transition-all hover:font-bold" href={info.github_link.url} target="_blank"
						>Source Code</a
					>
				{/if}
			</div>
			<div class="flex flex-wrap justify-center text-xs xl:text-base">
				{#each info.tech_stack as tech}
					<div
						class="mr-4 mb-4 cursor-default bg-primary-transparent rounded-2xl px-2 transition-all hover:bg-glass-gradient-from"
					>
						{tech.text}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
