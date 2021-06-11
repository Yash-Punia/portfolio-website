<script context="module">
	export async function load({ page }) {
		let blog;

		const blogIdQuery = `&q=[[at(document.id,"${page.params.id}")]]`;
		//get latest master ref
		const refUrl = 'https://yashpunia.cdn.prismic.io/api/v2';
		const refResponse = await fetch(refUrl);
		const refResponseJson = await refResponse.json();
		const masterRef = refResponseJson.refs[0].ref;

		//get the blogs
		const docUrl =
			'https://yashpunia.cdn.prismic.io/api/v2/documents/search?ref=' + masterRef + blogIdQuery;
		const docResponse = await fetch(docUrl);
		const docResponseJson = await docResponse.json();

		blog = docResponseJson.results[0].data;

		console.log(blog);

		return {
			props: {
				blog
			}
		};
	}
</script>

<script>
	export let blog;
</script>

<div class="blog-container">
	<div class="heading">
		<h1>{blog.title[0].text}</h1>
	</div>
	<div class="body">
		{#each blog.body as item}
			{#if item.type == 'paragraph'}
				<p>{item.text}</p>
			{:else if item.type == 'heading3'}
				<h3>{item.text}</h3>
			{/if}
		{/each}
	</div>
</div>

<style>
	.blog-container {
		width: 80%;
		margin: 3rem auto;
	}

	.body {
		margin-top: 6rem;
		font-size: 2rem;
		border: 1px solid rgba(255, 255, 255, 0.7);
		background: rgba(255, 255, 255, 0.5);
		border-radius: 1rem;
		backdrop-filter: blur(24px);
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        padding: 2rem 1rem;
	}

	.body * {
		margin: 1rem 0;
	}

	.heading {
		color: #222;
		opacity: 0.8;
		text-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
		font-size: 3rem;
		font-weight: 600;
	}
</style>
