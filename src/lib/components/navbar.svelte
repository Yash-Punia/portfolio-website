<script>
	export let scrollY, windowHeight, gotoEnabled;

	import { state } from '$lib/stores/stateStores';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import folder from 'svelte-awesome/icons/folder';
	import pencil from 'svelte-awesome/icons/pencil';
	import gamepad from 'svelte-awesome/icons/gamepad'
	import user from 'svelte-awesome/icons/user';
	import { projects } from '$lib/stores/store';
	import { fade, fly } from 'svelte/transition';
	import { goto } from '$app/navigation';

	let scale;

	let buttons = [
		{
			name: 'About',
			iconData: user,
			buttonState: 'about'
		},
		{
			name: 'Projects',
			iconData: folder,
			buttonState: 'work'
		},
		{
			name: 'Games',
			iconData: gamepad,
			buttonState: 'games'
		},
		{
			name: 'Posts',
			iconData: pencil,
			buttonState: 'posts'
		}
	];
</script>

{#if $projects.length > 0}
	<nav in:fade class="glass-element p-1 w-3/4 mx-auto my-8 md:w-2/5 xl:w-1/3 xl:my-16  rounded-xl">
		<div
			class="bg-black-transparent py-2 rounded-xl grid text-sm xl:text-lg text-white grid-flow-col place-items-center"
		>
			{#each buttons as button}
				<div
					on:click={() => {
						if (gotoEnabled) goto('/');
						state.set(button.buttonState);
					}}
					class="{button.buttonState == $state &&
						'text-primary'} grid lg:grid-flow-col place-items-center cursor-pointer transition-all hover:text-primary"
				>
					<Icon data={button.iconData} scale="1.2" />
					<p
						class=" {button.buttonState != $state
							? 'scale-0 absolute'
							: 'block scale-100'} transition-all lg:ml-2 lg:scale-100 lg:relative"
					>
						{button.name}
					</p>
				</div>
			{/each}
		</div>
	</nav>
{/if}

{#if scrollY > 0.8 * windowHeight}
	<nav
		transition:fly
		class="z-10 glass-element p-1 w-3/4 md:w-2/5 xl:w-1/3 xl:my-16 rounded-xl fixed top-4 left-1/2 -translate-x-1/2"
	>
		<div
			class="bg-black-transparent py-2 rounded-xl grid text-sm xl:text-lg text-white grid-flow-col place-items-center"
		>
			{#each buttons as button}
				<div
					on:click={() => {
						if (gotoEnabled) goto('/');
						state.set(button.buttonState);
					}}
					class="{button.buttonState == $state &&
						'text-primary'} grid lg:grid-flow-col place-items-center cursor-pointer transition-all hover:text-primary"
				>
					<Icon data={button.iconData} scale="1.2" />
					<p
						class=" {button.buttonState != $state
							? 'scale-0 absolute'
							: 'scale-100'} transition-all lg:ml-2 lg:scale-100 lg:relative"
					>
						{button.name}
					</p>
				</div>
			{/each}
		</div>
	</nav>
{/if}
