<script>
	import { fly } from 'svelte/transition';
	let education = [
		{
			instituteName: 'NIT Hamirpur',
			degree: 'BTech',
			time: '2018-Present',
			result: 'CGPA 9.46'
		},
		{
			instituteName: 'DAV Public School (Sec 14, GGN)',
			degree: 'Class 12',
			time: '2018',
			result: '95.6%'
		}
	];
</script>

<div class="timeline">
	{#each education as item}
		<div class="timeline-item">
			<h3>{item.time}</h3>
			<h1>{item.instituteName} - <span>({item.degree})</span></h1>
			<h2>{item.result}</h2>
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
				top: 0.3em;
				left: -1.2em;
				background: $circle-blue;
				border-radius: 100%;
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
			h3 {
				font-size: 1em;
				font-weight: 400;
				color: $circle-purple;
			}
		}
		&::before {
			top: 0;
			left: -1em;
			content: '';
			position: absolute;
			width: 2px;
			height: 100%;
			background: $circle-blue;
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
