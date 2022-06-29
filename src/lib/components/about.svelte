<script>
	import Education from '$lib/components/education.svelte';
	import Experience from '$lib/components/experience.svelte';
	const profileUrl = 'Profile3.jpg';
	import { fade } from 'svelte/transition';
	import { frameworks, resumeLink } from '$lib/constants';

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

<div in:fade class="mx-auto w-3/4 md:w-2/5 xl:w-1/3">
	<Experience />
	
	<div class="my-8">
		<h3 class="text-xl xl:text-2xl font-semibold mb-4">Frameworks</h3>
		<div class="flex flex-wrap">
			{#each frameworks as framework}
			<div class=" bg-primary-transparent rounded-2xl px-2 md:mr-2 md:mb-2 xl:mr-4 xl:mb-4 md:text-xs xl:text-lg">{framework}</div>
			{/each}
		</div>
	</div>
	
	<Education />
	<div class="w-max shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
		<a
			target="_blank"
			href={resumeLink}
			class="glass-element md:text-xs xl:text-xl w-max p-2 rounded-xl transition-all hover:bg-primary-transparent"
			>Download Resume</a
		>
	</div>
</div>
