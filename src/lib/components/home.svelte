<script>
	import { state } from '$lib/stores/stateStores';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import twitter from 'svelte-awesome/icons/twitter';
	import linkedin from 'svelte-awesome/icons/linkedin';
	import github from 'svelte-awesome/icons/github';
</script>

<div class="home-container">
	<p>Hello I'm</p>
	<h1>Yash Punia</h1>
	<p>I make <strong>AR apps</strong> and <strong>Video Games</strong></p>
	<p><span class="highlight">GSoC 2020</span> at Catrobat | President (Team ISTE)</p>
	<p>
		Check out my games at <a class="highlight" href="https://yashpunia.itch.io/">itch.io</a>
	</p>
	<p>
		I have my own Game Dev studio - <a class="highlight" href="https://candela-apps.web.app/"
			>Candela Apps</a
		>
	</p>
	<div class="buttons">
		<div
			on:click={() => {
				state.set('more');
			}}
		>
			More About Me
		</div>
		<a href="/game" target="_blank"> Play a Game? </a>
	</div>
	<div class="links">
		<a href="https://twitter.com/zeldariomon" target="__blank">
			<Icon data={twitter} scale="2" />
		</a>
		<a href="https://www.linkedin.com/in/yash-punia/" target="__blank">
			<Icon data={linkedin} scale="2" />
		</a>
		<a href="https://github.com/Yash-Punia/" target="__blank">
			<Icon data={github} scale="2" />
		</a>
	</div>
	<a href="https://candela-apps.web.app/" class="candela" target="__blank">
		<img src="logo512.png" alt="candelaLogo" />
	</a>
</div>

<style lang="scss">
	@import '../global.scss';
	.home-container {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		font-size: 24px;
		.highlight {
			font-weight: 700;
			text-decoration: none;
			color: $circle-one;
		}
		p {
			font-weight: 200;
		}
		* {
			margin: 0.5em 0;
		}
		.links {
			margin: 2em 0;
			a {
				margin-right: 1em;
				color: white;
				&:hover {
					color: $primary;
				}
			}
		}

		.buttons {
			display: grid;
			grid-template-columns: 1fr;
			a,
			div {
				cursor: pointer;
				width: 20rem;
				font-size: 0.8em;
				text-decoration: none;
				color: white;
				background: #1ee8b722;
				box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
				width: fit-content;
				padding: 0.5rem 1rem;
				border-radius: 2rem;
				transition: ease-out 0.3s;
				&:hover {
					background: $primary;
					color: black;
				}
			}
		}

		.candela {
			position: absolute;
			right: 1em;
			bottom: 0;
			img {
				height: 4em;
				&:hover {
					background: rgba($color: #ffc002, $alpha: 0.2);
					border-radius: 100%;
				}
			}
		}
	}

	@media only screen and (max-width: 1366px) {
		.home-container {
			font-size: 18px;
		}
	}
</style>
