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

<h1 class="text-2xl font-semibold">Education</h1>
<div class="timeline my-8">
	{#each education as item}
		<div class="timeline-item text-xl my-8">
			<h3 class="text-circle-two" >{item.time}</h3>
			<h1 class="">{item.instituteName} - <span>({item.degree})</span></h1>
			<h2 class="font-semibold text-primary">{item.result}</h2>
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
