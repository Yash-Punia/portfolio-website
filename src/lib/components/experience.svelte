<script>
    import {  fly } from 'svelte/transition'
	let experience = [
        {
            title: 'GSoC 2021 Mentor',
			position: 'Catrobat',
			time: 'Jun 2021 - Present',
			description: 'To guide a student for the project Awesome Demo Game Project by Catrobat'
        },
		{
			title: 'Ajna Lens',
			position: 'Intern',
			time: 'Jan 2021 - Mar 2021',
			description: 'Creating XR experiences for AjnaLens headset. Unity3D Development. AR/VR Development.'
		},
        {
            title: 'GSoC 2020 Student',
			position: 'Catrobat',
			time: 'Jun 2020 - September 2020',
			description: 'Creating a 2D showcase game for Pocket Code app by Catrobat. Game developed Batroid.'
        }
	];
</script>

<div class="timeline">
	{#each experience as item}
		<div class="timeline-item">
			<h3>{item.title}</h3>
			<h1>{item.position} - <span>({item.time})</span></h1>
			<h2>{item.description}</h2>
		</div>
	{/each}
</div>

<style lang="scss">
	@import '../global.scss';

	.timeline {
		position: relative;
		height: fit-content;
		font-size: 24px;
		.timeline-item {
            margin-bottom: 1em;
			position: relative;
			font-weight: 500;
			&::before {
				content: '';
				width: 0.5em;
				height: 0.5em;
				position: absolute;
				top: 0.4em;
				left: -1.2em;
				background: $circle-two;
				border-radius: 100%;
			}
			h3 {
				font-size: 1em;
				font-weight: 400;
				color: $circle-one;
			}
			h1 {
				font-weight: 600;
				font-size: 1em;
				span {
					font-weight: 500;
					font-size: 0.75em;
				}
			}
			h2 {
				font-size: 1em;
				font-weight: 400;
				opacity: 0.8;
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
	
	@media only screen and (max-width: 1366px) {
		.timeline {
			font-size: 18px;
		}
	}

	@media only screen and (max-width: 512px) {
		.timeline {
			font-size: 18px;
			&::before {
				left: -0.5em;
			}
			.timeline-item {
				&::before {
					left: -0.65em;
				}
			}
		}
	}
</style>
