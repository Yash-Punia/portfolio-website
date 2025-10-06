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

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="rounded-xl"
	bind:this={cardBackground}
	on:mouseleave={spotlightRemove}
	on:mousemove={(e) => {
		spotlight(e);
	}}
>
	<div class="bg-red rounded-xl grid-rows-2 grid lg:grid-cols-2  lg:grid-rows-none">
		<img
			class="rounded-xl  md:rounded-r-none md:rounded-br-none h-full object-cover xl:object-left"
			src={info.image.url}
			alt={info.image.text}
		/>
		<div class="p-4">
			<h2 class="font-bold xl:text-xl">{info.name[0].text}</h2>
			<p class="text-xs xl:text-base">{info.description[0].text}</p>
			<div class="my-4 flex justify-around text-primary text-xs xl:text-base">
				{#if info.link.url != null}
					<a class="transition-all hover:font-bold" href={info.link.url} target="_blank"
						>See Live</a
					>
				{/if}
			</div>
			<div class="flex flex-wrap justify-center text-xs xl:text-base">
				{#each info.genre as genre}
					<div
						class="mr-4 mb-4 cursor-default bg-primary-transparent rounded-2xl px-2 transition-all hover:bg-glass-gradient-from"
					>
						{genre.text}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
