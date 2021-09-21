import adapter from '@sveltejs/adapter-static'
import { sveltePreprocess } from 'svelte-preprocess/dist/autoProcess.js';

/** @type {import('@sveltejs/kit').Config} */

const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	},
	preprocess: sveltePreprocess()
};

export default config;
