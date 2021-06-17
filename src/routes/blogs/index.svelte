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

		const blogList = [];

		docResponseJson.results.map((element, index) => {
			if (element.type === 'blog_posts') blogList.push(element);
		});

		return { props: { blogList } };
	}
</script>

<script>
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import { calendar, arrowLeft } from 'svelte-awesome/icons';

	export let blogList;

	const getDate = datetime => {
		const date = datetime.split('T')[0];
		const year = date.split('-')[0];
		const day = date.split('-')[2];
		const month = date.split('-')[1];
		return (day + '/' + month + '/' + year);
	}
</script>

<svelte:head>
	<title>Yash Punia</title>
</svelte:head>

<div class="grid">
	<div class="glass-element">
		<div class="container">
			<a href="/" style="position: absolute; top: 2em; left: 2em; color: #1ee8b7">
				<Icon
					data={arrowLeft}
					scale="3"
				/>
			</a>
			<h1>My Blogs</h1>
			<div class="blog-grid">
				{#each blogList as blog}
					<a href={`/blogs/${blog.id}`} >
						<h1>{blog.data.title[0].text}</h1>
						<div class='blogInfo'>
							<div class='dateBlog'>
								<Icon data={calendar} scale=2 style="color: grey"/>
								<span>{getDate(blog.last_publication_date)}</span>
							</div>
						</div>	
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import '../../lib/global.scss';
	.container {
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
		.blog-grid {
			display: grid;
			margin-top: 5em;
			place-items: center;
			grid-template-columns: repeat(auto-fit, minmax(30em, 1fr));
			a {
				margin: 1em 0;
				color: white;
				text-decoration: none;
				h1 {
					text-align: left;
					font-size: 1.5em;
				}
				.blogInfo {
					display: flex;
					align-items: center;
					.dateBlog {
						display: flex;
						align-items: center;
						margin: 1em;
						span {
							margin-left: 1em;
						}
					}
				}
			}
		}
	}
</style>
