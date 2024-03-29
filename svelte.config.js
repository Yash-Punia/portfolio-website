import adapter from '@sveltejs/adapter-static'
import { sveltePreprocess } from 'svelte-preprocess/dist/autoProcess.js';

/** @type {import('@sveltejs/kit').Config} */

const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'app.html'
		}),
	},
	preprocess: sveltePreprocess()
};

export default config;
