import netlify from '@sveltejs/adapter-netlify'
import { sveltePreprocess } from 'svelte-preprocess/dist/autoProcess.js';

/** @type {import('@sveltejs/kit').Config} */

const config = {
	kit: {
		adapter: netlify(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	},
	preprocess: sveltePreprocess()
};

export default config;
