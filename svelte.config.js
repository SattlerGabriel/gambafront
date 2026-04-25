import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: adapter({
			pages: 'build', // output dir for HTML pages
			assets: 'build', // output dir for static assets
			fallback: undefined, // set to 'index.html' for SPA mode
			precompress: false, // generate gzip/brotli files
			strict: true
		})
	}
};

export default config;
