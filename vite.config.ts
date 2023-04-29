import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { searchForWorkspaceRoot } from 'vite';
import inject from '@rollup/plugin-inject';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			buffer: 'buffer',
			crypto: 'crypto-browserify',
			stream: 'stream-browserify',
			http: 'stream-http',
			https: 'https-browserify',
			url: 'url'
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	build: {
		target: 'es2020',
		rollupOptions: {
			plugins: [inject({ Buffer: ['buffer', 'Buffer'] })]
		}
	},
	
	optimizeDeps: {
		esbuildOptions: {
			plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })],
			target: 'es2020'
		}
	},

	server: {
		fs: {
			allow: [searchForWorkspaceRoot(process.cwd()), 'static/images/']
		}
	}
});
