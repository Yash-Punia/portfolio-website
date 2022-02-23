<script>
	import {fly} from 'svelte/transition';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import twitter from 'svelte-awesome/icons/twitter';
	import linkedin from 'svelte-awesome/icons/linkedin';
	import github from 'svelte-awesome/icons/github';
	import gamepad from 'svelte-awesome/icons/gamepad'

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
		},
		{
			data: gamepad,
			link: 'https://yashpunia.itch.io/',
		}
	];

	const profileUrl = 'yash1.jpg';
</script>

<div class="text-white mx-auto w-3/4 mt-12 md:mt-24 md:w-2/5 xl:mt-48 xl:w-1/3">
	<div class="flex justify-center">
		<img class="glass-element p-1 h-16 object-fill rounded-full md:h-20 xl:h-28 xl:p-1.5" src={profileUrl} alt="me" />
		<div class="ml-4 md:ml-8">
			<h1 class="font-bold text-2xl md:text-3xl xl:text-4xl">Yash Punia</h1>
			<p class="xl:mt-2 xl:text-2xl">Gamedev | XR Development</p>
			<p class="xl:mt-2 xl:text-xl">
				Founder of <a
					target="__blank"
					class="font-bold text-primary transition-all hover:tracking-wide"
					href="https://candela-apps.web.app/">Candela Apps 💡</a
				>
			</p>
		</div>
	</div>
	<div class="flex w-full justify-center gap-4 my-8 xl:my-12">
		{#each links as item}
			<a
				class="bg-glass-button rounded-full xl:p-1 transition-all hover:scale-110 hover:bg-primary-transparent"
				href={item.link}
				target="__blank"
			>
				<div class="w-8 h-8 grid place-items-center">
					<Icon data={item.data} scale="1" />
				</div>
			</a>
		{/each}
	</div>
	<div class="text-justify rounded-xl text-sm xl:text-base">
		<p in:fly>
			I'm a creative person with a passion of designing games and learning new methods to develop
			them. With the rise of Metaverse, I'm also exploring the domain of XR and learning as much as
			I can.
		</p>
	</div>
</div>
