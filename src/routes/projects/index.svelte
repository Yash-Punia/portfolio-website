<script context="module">
	export async function load() {
		//get latest master ref
		const refUrl = 'https://yashpunia.cdn.prismic.io/api/v2';
		const refResponse = await fetch(refUrl);
		const refResponseJson = await refResponse.json();
		const masterRef = refResponseJson.refs[0].ref;

		//get the blogs
		const docUrl = 'https://yashpunia.cdn.prismic.io/api/v2/documents/search?ref=' + masterRef;
		const docResponse = await fetch(docUrl);
		const docResponseJson = await docResponse.json();

		const projectList = [];

		docResponseJson.results.map((element, index) => {
			if (element.type === 'projects') projectList.push(element);
		});

		return { props: { projectList, docUrl } };
	}
</script>

<script>
	import ProjectCard from '$lib/components/projectCard.svelte'
	export let projectList;
</script>

<svelte:head>
	<title>Yash Punia</title>
</svelte:head>

<div class="grid">
	<div class="glass-element">
		<div class="container">
			<h1>See my work</h1>
			<div class="project-grid">
				{#each projectList as project}
					<ProjectCard
						info = {project.data}
					/>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import '../../lib/global.scss';
	.container {
		width: 80vw;
		height: 100%;
		padding: 2em 3em;
		color: white;
		background: #0e1117dd;
		border-radius: 2rem;
		h1 {
			color: white;
			text-align: center;
			font-family: 'Montserrat';
		}
		.project-grid {
			display: grid;
			margin-top: 5em;
			place-items: center;
			grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
			gap: 5em;			
		}
	}
</style>
