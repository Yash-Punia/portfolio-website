<script context="module">
	export async function load({ page }) {
		console.log(page.params.id);
		//get latest master ref
		const refUrl = 'https://yashpunia.cdn.prismic.io/api/v2';
		const refResponse = await fetch(refUrl);
		const refResponseJson = await refResponse.json();
		const masterRef = refResponseJson.refs[0].ref;

		//get the blogs
		const docUrl = `https://yashpunia.cdn.prismic.io/api/v2/documents/search?ref=${masterRef}&q=[[at(document.id,"${page.params.id}")]]`;
		const docResponse = await fetch(docUrl);
		const docResponseJson = await docResponse.json();

		const blog = docResponseJson.results[0];

		return { props: { blog } };
	}
</script>

<script>
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import { arrowLeft } from 'svelte-awesome/icons';

	export let blog;
	console.log(blog);

	const getDate = (datetime) => {
		const date = datetime.split('T')[0];
		const year = date.split('-')[0];
		const day = date.split('-')[2];
		const month = date.split('-')[1];
		return day + '/' + month + '/' + year;
	};
</script>

<svelte:head>
	<title>Yash Punia</title>
</svelte:head>

<div class="grid">
	<div class="glass-element">
		<div class="container">
			<a href="/blogs" style="position: absolute; top: 2em; left: 2em; color: #1ee8b7">
				<Icon
					data={arrowLeft}
					scale="3"
				/>
			</a>
			<h1>{blog.data.title[0].text}</h1>
			<img src={blog.data.image.url} alt="blog-post" />
			<div class='blogBody'>
				{#each blog.data.body as item}
					{#if item.type == 'paragraph'}
						<p>{item.text}</p>
					{:else if item.type == 'heading3'}
						<h3>{item.text}</h3>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		width: 80vw;
		height: 100%;
		padding: 2em 3em;
		color: white;
		background: #0e1117dd;
		border-radius: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		h1 {
			color: white;
			text-align: center;
			font-family: 'Montserrat';
		}
		img {
			margin: 2em 0;
			width: 10em;
			height: 10em;
		}
		p {
			font-size: 1.2em;
			margin: 0.5em 0;
		}
		h3 {
			font-size: 1.5em;
			margin: 1em 0;
		}
	}
</style>
