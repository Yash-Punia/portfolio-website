<script>
	import Education from '$lib/components/education.svelte';
	import Experience from '$lib/components/experience.svelte';
	const profileUrl = 'Profile3.jpg';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import {arrowLeft} from 'svelte-awesome/icons';

	const skillList = [
		'C#',
		'Unity3D',
		'WebXR',
		'ARFoundation',
		'AR Core',
		'Web Dev',
		'C++',
		'Python',
		'Blender',
		'Photoshop'
	];

	let tab = 'education';
	let educationTab;
	let experienceTab;

	const toggleTab = (tabName) => {
		console.log(tab);
		tab = tabName;
		if (tab == 'experience') {
			educationTab.classList.remove('selected');
			experienceTab.classList.add('selected');
		} else {
			educationTab.classList.add('selected');
			experienceTab.classList.remove('selected');
		}
	};
</script>

<div class="grid">
	<div class="glass-element">
		<div class="container">
			<a href="/" style="position: absolute; top: 2em; left: 2em; color: #1ee8b7">
				<Icon
					data={arrowLeft}
					scale="3"
				/>
			</a>
			<img src={profileUrl} alt="profile=pic" />
			<div class="content">
				<h1>About Me</h1>
				<p>
					A Game Dev enthusiast specializing in Augmented Reality and Virtual Reality for the next
					gen games and apps. Also fluent in various web technologies and I fiddle with WebXR to
					showcase XR to everyone! I also play Ukulele and Piano sometimes :D
				</p>
				<h3>Skills</h3>
				<div class="skills">
					{#each skillList as skill}
						<div class="skill-item">{skill}</div>
					{/each}
				</div>
				<div class="tabButtons">
					<div
						bind:this={educationTab}
						on:click={(e) => {
							toggleTab('education');
						}}
						class="educationButton selected"
					>
						Education
					</div>
					<div
						bind:this={experienceTab}
						on:click={(e) => {
							toggleTab('experience');
						}}
						class="experienceButton"
					>
						Experience
					</div>
				</div>
				{#key tab}
					{#if tab == 'education'}
						<Education />
					{:else}
						<Experience />
					{/if}
				{/key}
				<div class="buttons">
					<a
						target="_blank"
						href="https://drive.google.com/file/d/1ForiKFcQ-2Dk3WuZjlXMNERoGYFo5eLG/view?usp=sharing"
						class="resumeButton">Download Resume</a
					>
					<a href="/contact">Contact Me</a>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import '../lib/global.scss';
	.container {
		padding: 2rem 3rem;
		color: $fontColor;
		background: $containerBackground;
		width: 80vw;
		height: 100%;
		border-radius: 2rem;
		display: grid;
		gap: 1em;
		grid-template-columns: 1fr 2fr;
		font-size: 24px;
		img {
			width: 20rem;
			height: 30rem;
			object-fit: cover;
			border-radius: 2rem;
			border: 0.2rem solid $green-transparent;
			margin: 4em auto;
		}
		.content {
			height: fit-content;
			h1 {
				font-family: 'Montserrat';
			}
			p {
				font-weight: 300;
				margin-top: 3rem;
				text-align: justify;
				font-size: 0.8em;
			}
			h3 {
				margin: 2em 0 1em 0;
			}
			.skills {
				display: flex;
				flex-wrap: wrap;
				.skill-item {
					width: fit-content;
					margin: 0.3em;
					background: $green-transparent;
					border-radius: 1em;
					font-size: 0.8em;
					padding: 0.2em 0.5em;
				}
			}
			.tabButtons {
				display: flex;
				.educationButton,
				.experienceButton {
					position: relative;
					margin: 1em 1em;
					cursor: pointer;
					transition: all 0.3s;
					&:hover {
						color: $circle-purple;
					}
				}
			}
			.buttons {
				margin-top: 2em;
				a {
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
						background: $green;
						color: black;
					}
				}
			}
		}
	}

	.selected {
		color: $circle-purple;
	}
</style>
