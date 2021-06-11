<script>
</script>

<h1>I would love to hear from you!</h1>
<div class="form-container">
	<form class="glass-element" action="https://formspree.io/f/xvodrzel" method="POST">
		<div class="input-fields">
			<input type="text" namee="_name" placeholder="Your Name" />
			<input type="email" name="_replyto" placeholder="Your Email ID" />
		</div>
		<textarea name="message" placeholder="Enter message here" />
		<button class="glass-element" type="submit">Send</button>
	</form>
</div>

<style>
	.form-container {
		width: 40%;
		margin: 3rem auto;
	}

	.form-container form {
		padding: 2rem 1rem;
	}

	h1 {
		z-index: 1;
		position: relative;
		bottom: -4.5rem;
		width: 60%;
		margin: 0 auto;
		text-align: center;
		font-size: 3rem;
		text-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
		color: #000;
		font-weight: 700;
		opacity: 0.8;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	.input-fields {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	input,
	textarea,
	button {
		font-size: 1.2rem;
		font-family: 'Roboto';
		padding: 1rem;
		border-radius: 1rem;
		outline: none;
		border: none;
		margin: 1rem 0;
	}

	textarea {
		resize: vertical;
	}

	button {
		width: 30%;
		margin: 1rem auto;
		cursor: pointer;
		transition: all 0.3s;
	}

	button:hover {
		background: white;
	}

	@media only screen and (max-width: 768px) {
		.form-container {
			width: 80%;
			margin: 3rem auto;
		}
		h1 {
			bottom: 0rem;
			width: 100%;
		}
		.input-fields {
			grid-template-columns: 1fr;
		}
	}
</style>
