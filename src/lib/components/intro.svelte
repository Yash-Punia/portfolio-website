<script>
	const profileUrl = '../assets/Profile1.png';
	let y;

</script>

<svelte:window bind:scrollY={y} />

<div class="intro-container">
	<div style={`transform: translateX(${y / 2}px)`} class="intro-text">
		<h1 class="name">Yash Punia</h1>
		<h3 class="subheading">
			XR Developer | GameDev Enthusiast
		</h3>
	</div>
	<div class="profile-image">
		<img
			style={`transform: translateX(-${y / 2}px)`}
			src={profileUrl}
			alt="my-profile"
			aria-hidden="true"
		/>
	</div>
</div>

<style>
	.intro-container {
		min-height: 100vh;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		justify-content: center;
		color: #fff;
	}

	.profile-image {
		width: 25%;
	}

	.profile-image img {
		border-radius: 1rem;
		margin: 0 auto;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
		width: 100%;
	}

	.intro-text {
		margin-left: 5rem;
		bottom: 2.5rem;
	}

	.name {
		text-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
		font-size: 6rem;
		line-height: 1;
		font-weight: 700;
		margin: 1rem 0;
		opacity: 0.8;
	}

	.subheading {
		text-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
		letter-spacing: 0.2em;
		font-size: 2.25rem;
	}

	@media only screen and (max-width: 768px) {
		.intro-text {
			color: #000;
			border: 1px solid rgba(255, 255, 255, 0.7);
			width: 70%;
			padding: 2rem 1rem;
			background: rgba(255, 255, 255, 0.5);
			border-radius: 1rem;
			backdrop-filter: blur(24px);
			box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
			margin-left: 0;
			bottom: 0;
		}
		.name {
			font-size: 3rem;
			text-align: center;
			font-weight: 700;
		}

		.subheading {
			text-align: center;
			letter-spacing: 0;
			font-size: 2rem;
			font-weight: 200;
		}

		.intro-container {
			flex-direction: column-reverse;
		}
		.profile-image {
			position: relative;
			bottom: -2rem;
			width: 50%;
		}
	}
</style>
