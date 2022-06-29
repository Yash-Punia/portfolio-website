<script>
	import {experience} from '$lib/constants'
	
</script>

<h1 class="text-xl xl:text-2xl font-semibold">Experience</h1>
<div class="timeline my-8 mb-16">
	{#each experience as item}
		<div class="timeline-item md:text-sm xl:text-xl my-8">
			<p class="text-circle-two" >{item.time}</p>
			<p class="text-xl xl:text-2xl">{item.company}</p>
			<p class="text-primary">{item.position}</p>
			<p>{item.description}</p>
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
