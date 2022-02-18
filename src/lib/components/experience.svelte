<script>
    import {  fly } from 'svelte/transition'
	let experience = [
		{
            company: 'Lucid Labs',
			position: 'Game Developer Intern',
			time: 'Feb 2022 - Present',
			description: 'To complete and finish a complete game using Unity3D and C#'
        },
        {
            company: 'Catrobat',
			position: 'GSoC 2021 Mentor',
			time: 'Jun 2021 - Sep 2021',
			description: 'To guide a student for the project Awesome Demo Game Project by Catrobat'
        },
		{
			company: 'Ajna Lens',
			position: 'Intern',
			time: 'Jan 2021 - Mar 2021',
			description: 'Creating XR experiences for AjnaLens headset. Unity3D Development. AR/VR Development.'
		},
        {
            company: 'Catrobat',
			position: 'GSoC 2020 Student',
			time: 'Jun 2020 - September 2020',
			description: 'Creating a 2D showcase game for Pocket Code app by Catrobat. Game developed Batroid.'
        }
	];
</script>

<h1 class="text-2xl font-semibold">Experience</h1>
<div class="timeline my-8 mb-16">
	{#each experience as item}
		<div class="timeline-item text-xl my-8">
			<p class="text-circle-two" >{item.time}</p>
			<p class="text-2xl">{item.company}</p>
			<p class="text-primary">{item.position}</p>
			<p clas= "">{item.description}</p>
		</div>
	{/each}
</div>

<style lang="scss">
	@import '../global.scss';

	.timeline {
		position: relative;
		height: fit-content;
		.timeline-item {
			position: relative;
			&::before {
				content: '';
				width: 0.5em;
				height: 0.5em;
				position: absolute;
				top: 0.5em;
				left: -1em;
				background: $circle-two;
				border-radius: 100%;
			}
		}
		&::before {
			top: 0;
			left: -1em;
			content: '';
			position: absolute;
			width: 2px;
			height: 100%;
			background: $circle-two;
		}
	}
</style>
