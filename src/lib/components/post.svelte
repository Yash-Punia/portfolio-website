<script>
	export let info;

	console.log(info);

	const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	const spotlightRemove = () => {
		cardBackground.style.background = 'none';
	};

	const spotlight = (e) => {
		const rect = cardBackground.getBoundingClientRect();
		const x = e.clientX - rect.left; //x position within the element.
		const y = e.clientY - rect.top; //y position within the element.
		cardBackground.style.background = `radial-gradient(circle at ${x}px ${y}px , #1ee8b766 ,rgba(255,255,255,0) )`;
	};

	let cardBackground;

	let date = Date.parse(info.first_publication_date);
	let parsedDate = new Date();
	parsedDate.setTime(date);

	let smallDesc = info.data.body[0].text.substring(0, 100);

</script>

<a
	class="rounded-xl"
	bind:this={cardBackground}
	on:mouseleave={spotlightRemove}
	on:mousemove={(e) => {
		spotlight(e);
	}}
    href="/post/{info.slugs[0]}"
>
	<div class="bg-black-transparent rounded-xl">
		<div class="p-4">
			<h2 class="xl:text-xl">{info.data.title[0].text}</h2>
			<p class="text-circle-two mb-4">{month[parsedDate.getMonth()]}, {parsedDate.getFullYear()}</p>
			<h2 class="text-xs">{smallDesc}... <span class="text-primary-transparent">read more</span> </h2>
		</div>
	</div>
</a>
