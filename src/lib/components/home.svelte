<script>
	import { state } from '$lib/stores/stateStores';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import twitter from 'svelte-awesome/icons/twitter';
	import linkedin from 'svelte-awesome/icons/linkedin';
	import github from 'svelte-awesome/icons/github';

	let links = [
		{
			data: twitter,
			link: 'https://twitter.com/zeldariomon'
		},
		{
			data: linkedin,
			link: 'https://www.linkedin.com/in/yash-punia/'
		},
		{
			data: github,
			link: 'https://github.com/Yash-Punia/'
		}
	];

	const profileUrl = 'yash1.jpg';
</script>

<div class="center mt-48 text-white">
	<div class="flex justify-center">
		<img class="glass-element p-1.5 h-28 object-fill rounded-full" src={profileUrl} alt="me" />
		<div class="ml-8">
			<h1 class="font-bold text-4xl">Yash Punia</h1>
			<p class=" mt-2 text-2xl">Gamedev | XR Development</p>
			<p class=" mt-2 text-xl">
				Founder of <a
					target="__blank"
					class="font-bold text-primary transition-all hover:tracking-wide"
					href="https://candela-apps.web.app/">Candela Apps 💡</a
				>
			</p>
		</div>
	</div>
	<div class="flex w-full justify-center gap-4 mt-12">
		{#each links as item}
			<a
				class="bg-glass-button rounded-full p-1 transition-all hover:scale-110 hover:bg-primary-transparent"
				href={item.link}
				target="__blank"
			>
				<div class="w-8 h-8 grid place-items-center">
					<Icon data={item.data} scale="1.5" />
				</div>
			</a>
		{/each}
	</div>
	<div class="mt-12 text-justify rounded-xl lg:text-xl">
		<p>
			I'm a creative person with a passion of designing games and learning new methods to develop
			them. With the rise of Metaverse, I'm also exploring the domain of XR and learning as much as
			I can.
		</p>
	</div>
</div>
