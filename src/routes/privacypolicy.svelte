<div class="container">
	<div class="privacy-policy">
		<h1>Privacy Policy</h1>
		<p>
			Hi! I'm Yash Punia from Candela. Candela is a small game development and XR Developing studio
			that I created for providing enjoyable and unique experience to everyone
		</p>
		<p>
			The purpose of this policy is to provide you with all the important information and
			explanations about how and why some of your data may be collected and processed by Candela
			when you use one of our applications. This privacy policy governs and details the main
			principles that Voodoo applies to the data we collect and process to:
		</p>
		<h3>AR Draw 3D</h3>
		<h4>Permissions Required</h4>
		<ul>
			<li>android.permission.CAMERA</li>
		</ul>
		AR draw 3D requires the above permissions to obtain image/video input from your device and process
		it to create XR (specifically AR experience). The app is based on AR for its functionalities and
		hence requires input from the camera to render the 3D objects in Augmented Reality. No data/image/video
		is sent anywhere for any purposes from your device. All the processing is done locally in your device
		itself Hence AR Draw 3D is secure and will not share your data to anyone
		<footer>
			<p>
				Candela's official English language privacy policy is available on the web under
				<a href="https://yashpunia.netlify.app/privacypolicy"
					>https://yashpunia.netlify.app/privacypolicy</a
				>
			</p>
			<p>Version 1.0 | 25 September 2021</p>
		</footer>
	</div>
</div>

<style lang="scss">
	.container {
		display: grid;
		place-items: center;
		.privacy-policy {
            height: 100vh;
            display: flex;
            flex-direction: column;
            padding: 2em;
			background: rgba($color: #fff, $alpha: 0.9);
			width: fit-content;
			max-width: 60%;
			backdrop-filter: blur(10px);
			p, ul, h3 {
				margin: 1em 0;
			}
            footer {
                margin-top: auto;
            }
		}
	}
</style>
