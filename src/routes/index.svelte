<script>
	const profileUrl = 'Profile4.jpg';
</script>

<svelte:head>
	<title>Yash Punia</title>
</svelte:head>

<div class="grid">
	<div class="glass-element">
		<div class="container">
			<div class="name-container">
				<p>Hello I'm</p>
				<h1>Yash Punia</h1>
				<p>XR Developer | Game Developer</p>
				<div class="buttons">
					<a href="/about">More About Me</a>
					<a href="/blogs">Blogs</a>
					<a href="/projects">Projects</a>
				</div>
			</div>
			<img src={profileUrl} alt="profile-pic" />
		</div>
	</div>
</div>

<style lang="scss">
	@import '../lib/global.scss';
	.container {
		padding: 0 8rem;
		color: white;
		background: #0e1117dd;
		width: 100%;
		height: 100%;
		border-radius: 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.name-container {
			font-size: 24px;
			p {
				font-weight: 200;
			}
			* {
				margin: 0.5em 0;
			}
		}

		img {
			width: 20rem;
			height: 20rem;
			object-fit: cover;
			border-radius: 100%;
			border: 0.5rem solid $green-transparent;
		}

		.buttons {
			display: grid;
			grid-template-columns: 1fr;
			a {
				width: 20rem;
				font-size: 0.8em;
				text-decoration: none;
				color: white;
				background: #1ee8b722;
				box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
				width: fit-content;
				padding: 0.5rem 1rem;
				border-radius: 2rem;
				transition: ease-out 0.3s;
			}
			a:hover {
				background: $green;
				color: black;
			}
		}
	}
</style>
