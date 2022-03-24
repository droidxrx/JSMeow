import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import ts from 'rollup-plugin-ts';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
	input: './src/ts/index.ts',
	output: {
		dir: './dist',
		strict: false,
		format: 'commonjs',
		exports: 'named',
		esModule: true,
	},
	external: [/node_modules/],
	plugins: [
		nodeResolve({ extensions: ['.node', '.js'] }),
		ts({ transpileOnly: true, tsconfig: './tsconfig.json' }),
		terser({
			keep_classnames: true,
			keep_fnames: true,
			format: {
				comments: false,
			},
			ecma: 2020,
		}),
		copy({
			targets: [{ src: 'build/Release/JSMeow.node', dest: 'dist' }],
		}),
	],
	watch: {
		include: './src/ts/*.ts',
		clearScreen: true,
	},
});
