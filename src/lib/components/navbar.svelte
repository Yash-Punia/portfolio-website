<script>
	import { state } from '$lib/stores/stateStores';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import {  folder, pencil, user } from 'svelte-awesome/icons';

	let buttons = [
		{
			name: 'About',
			iconData: user,
			buttonState: 'about'
		},
		{
			name: 'Work',
			iconData: folder,
			buttonState: 'work'
		},
		{
			name: 'Posts',
			iconData: pencil,
			buttonState: 'posts'
		}
	];
</script>

<nav class="glass-element center my-16 p-1 rounded-xl">
	<div
		class="bg-glass-container py-4 rounded-xl grid text-xl text-white grid-flow-col place-items-center"
	>
		{#each buttons as button}
			<div on:click={() => {
				state.set(button.buttonState)
			}} class="grid grid-flow-col place-items-center cursor-pointer transition-all hover:text-primary">
				<Icon data={button.iconData} scale="1.5" />
				<p class="ml-2">{button.name}</p>
			</div>
		{/each}
	</div>
</nav>
