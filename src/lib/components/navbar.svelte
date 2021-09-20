<script>
    import { state } from '$lib/stores/stateStores';
	import { arrowLeft } from 'svelte-awesome/icons';
	import Icon from 'svelte-awesome/components/Icon.svelte';

    let tabs = [];
	const handleClick = (tabName, tabDiv) => {
        if(tabName == $state)
            return;
        state.set(tabName);
        tabs.forEach(tab => {
            tab.classList.remove("selected");
        })
        tabDiv.classList.add("selected");
    };
</script>

<div on:click={e=>{handleClick("home",e.target)}} bind:this={tabs[0]} class="homeTab">
	<Icon data={arrowLeft} scale=2/>
</div>
<div class="navbar">
	<div on:click={e=>{handleClick("more",e.target)}} bind:this={tabs[1]} class="tab selected">About</div>
	<div on:click={e=>{handleClick("projects",e.target)}} bind:this={tabs[2]} class="tab">Projects</div>
</div>

<style lang="scss">
	@import '../global.scss';
	.homeTab {
			width: fit-content;
			cursor: pointer;
		}
	.navbar {
		display: flex;
		font-size: 20px;
		position: absolute;
		top: -2em;
		right: 0;
		.tab {
			cursor: pointer;
			background: $green;
			color: black;
			border-radius: 1em;
			padding: 1em;
			margin-left: 1em;
			transition: all 0.3s;
			box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
		}
		.selected {
			background: $background;
			color: $fontColor;
			border: 2px solid $green;
		}
	}
	@media only screen and (max-width: 1366px) {
		.navbar {
			top: -1.5em;

			font-size: 18px;
			.tab {
				padding: 0.8em 1em;
			}
		}
	}
</style>
