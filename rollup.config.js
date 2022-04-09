/* eslint-disable no-restricted-syntax */
const { defineConfig } = require('rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
/** @type {import('rollup-plugin-copy')["default"]} */
const copy = require('rollup-plugin-copy');
/** @type {import('rollup-plugin-ts')["default"]} */
const ts = require('rollup-plugin-ts');
const { writeJson } = require('fs-extra');
const pkgjson = require('./package.json');

delete pkgjson.devDependencies;
for (const key of Object.keys(pkgjson.scripts)) if (key !== 'install') delete pkgjson.scripts[key];

const pkgjsonprebuild = { ...pkgjson };
pkgjsonprebuild.version += '-napi';
delete pkgjsonprebuild.gypfile;
delete pkgjsonprebuild.scripts;
delete pkgjsonprebuild.dependencies['node-addon-api'];

let rollupConfig;
const mode = process.env.NODE_ENV.trim();
const outputCJS = 'index.commonjs.js';
const outputESM = 'index.esm.mjs';
if (mode === 'production') {
	rollupConfig = defineConfig([
		{
			input: './src/index.cjs.ts',
			output: [
				{
					file: `./publish/normal/dist/${outputCJS}`,
					strict: false,
					format: 'commonjs',
					exports: 'default',
					esModule: false,
				},
				{
					file: `./publish/prebuild/dist/${outputCJS}`,
					strict: false,
					format: 'commonjs',
					exports: 'default',
					esModule: false,
				},
			],
			external: [/node_modules/, /build/],
			plugins: [nodeResolve({ extensions: ['.ts'] }), ts({ transpileOnly: true, tsconfig: './tsconfig.json' }), terser()],
			watch: {
				include: './src/*.ts',
				clearScreen: true,
			},
		},
		{
			input: './src/index.esm.ts',
			output: [
				{
					file: `./publish/normal/dist/${outputESM}`,
					strict: false,
					format: 'esm',
				},
				{
					file: `./publish/prebuild/dist/${outputESM}`,
					strict: false,
					format: 'esm',
				},
			],
			external: [/node_modules/, /build/],
			plugins: [
				nodeResolve({ extensions: ['.ts', '.mts'] }),
				ts({ transpileOnly: true, tsconfig: './tsconfig.json' }),
				terser(),
				copy({
					targets: [
						{ src: ['./external', './lib', './binding.gyp'], dest: './publish/normal' },
						{ src: ['./types', './README.md'], dest: ['./publish/normal', './publish/prebuild'] },
						{ src: ['./build/Release/JSMeow.node', './external/lib/glew32.dll', './external/lib/glfw3.dll'], dest: './publish/prebuild/dist' },
					],
				}),
				{
					name: 'write-package-json',
					buildEnd: async () => {
						try {
							await writeJson('./publish/normal/package.json', pkgjson);
							console.log('Write package.json for normal build done.');

							await writeJson('./publish/prebuild/package.json', pkgjsonprebuild);
							console.log('Write package.json for prebuild done.');
						} catch (error) {
							console.log(error.message);
						}
					},
				},
			],
			watch: {
				include: './src/*.ts',
				clearScreen: true,
			},
		},
	]);
} else if (mode === 'development') {
	rollupConfig = defineConfig([
		{
			input: './src/index.cjs.ts',
			output: {
				file: `./dist/${outputCJS}`,
				strict: false,
				format: 'commonjs',
				exports: 'default',
				esModule: false,
			},
			external: [/node_modules/, /build/],
			plugins: [nodeResolve({ extensions: ['.ts'] }), ts({ transpileOnly: true, tsconfig: './tsconfig.json' })],
			watch: {
				include: './src/*.ts',
				clearScreen: true,
			},
		},
		{
			input: './src/index.esm.ts',
			output: {
				file: `./dist/${outputESM}`,
				strict: false,
				format: 'esm',
			},
			external: [/node_modules/, /build/],
			plugins: [nodeResolve({ extensions: ['.ts', '.mts'] }), ts({ transpileOnly: true, tsconfig: './tsconfig.json' })],
			watch: {
				include: './src/*.ts',
				clearScreen: true,
			},
		},
	]);
}

module.exports = rollupConfig;
