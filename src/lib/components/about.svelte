<script>
	import Education from '$lib/components/education.svelte';
	import Experience from '$lib/components/experience.svelte';
	const profileUrl = 'Profile3.jpg';
	import { fade } from 'svelte/transition';

	const frameworks = [
		'C#',
		'Unity3D',
		'C++',
		'WebXR',
		'ARFoundation',
		'AR Core',
		'Python',
		'Blender',
		'Photoshop',
		'Unreal Engine',
		'Svelte'
	];

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

<div in:fade class="center">
	<Experience />
	
	<div class="my-8">
		<h3 class="text-2xl mb-4">Frameworks</h3>
		<div class="flex flex-wrap">
			{#each frameworks as framework}
			<div class=" bg-primary-transparent rounded-2xl px-2 mr-4 mb-4 text-lg">{framework}</div>
			{/each}
		</div>
	</div>
	
	<Education />
	<div class="w-max shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
		<a
			target="_blank"
			href="https://drive.google.com/file/d/10GE-TfIN_P8zVAYYSU_yifb749fuo6cz/view?usp=sharing"
			class="glass-element text-xl w-max p-2 rounded-xl transition-all hover:bg-primary-transparent"
			>Download Resume</a
		>
	</div>
</div>
