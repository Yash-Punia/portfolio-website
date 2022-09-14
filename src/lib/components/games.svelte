<script>
	import {fade, fly} from 'svelte/transition'
	import GameCard from '$lib/components/gameCard.svelte';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import spinner from 'svelte-awesome/icons/spinner';
  import {games} from '$lib/stores/store'

</script>

<div in:fade class="w-3/4 mx-auto md:w-2/5 xl:w-1/3">
	<div class="grid grid-cols-1 gap-8">
    {#each $games as game}
			<GameCard info={game.data} />
		{:else}
			<Icon data={spinner} pulse/>
		{/each}
	</div>
</div>
