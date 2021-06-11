<script>
	import { blogPosts } from '$lib/stores/blogStores';

	// $: console.log($blogPosts);

	let y;

</script>

<svelte:window bind:scrollY={y} />

<div class="blogs-container">
	<h1 class="heading">Blogs</h1>
	<div class="blog-list-holder">
		{#each $blogPosts as post}
			<a class="blog-list-item" href={`/blogs/${post.id}`}>
				<img src={post.data.image.url} alt={post.data.image.alt} />
				<div class="glass-element blog-list-text">
					<h1>{post.data.title[0].text}</h1>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.blogs-container {
		width: 80%;
		margin: 0 auto;
	}

	.heading {
		color: #222;
		opacity: 0.8;
		text-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
		font-size: 6rem;
		font-weight: 600;
	}

	.blog-list-text {
		margin: 2rem auto;
		padding: 2.5rem 2rem;
	}

	.blog-list-item {
		cursor: pointer;
		text-decoration: none;
		color: #000;
	}

	.blog-list-item > img {
		z-index: 1;
		height: 100px;
		position: relative;
		bottom: -5rem;
		transition: all 0.3s;
	}

	.blog-list-holder {
		display: grid;
		place-items: center;
		grid-template-columns: 1fr 1fr;
		gap: 1rem 1rem;
	}

	.blog-list-item:hover > img {
		transform: translateY(-1em);
	}
	@media only screen and (max-width: 768px) {
		.blogs-container {
			width: 80%;
			margin: 0 auto;
		}
		.blog-list-holder {
			grid-template-columns: 1fr;
		}
	}
</style>
