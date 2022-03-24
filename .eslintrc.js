const configTS = require('../../configs/eslint/ts/index');
const configCJS = require('../../configs/eslint/cjs/index');
const { join: pathJoin } = require('path');

module.exports = {
	overrides: [
		{
			files: ['./src/ts/*.ts', './example/*.ts'],
			env: {
				browser: false,
				node: true,
				commonjs: true,
				es2022: true,
			},
			...configTS,
			parserOptions: {
				tsconfigRootDir: __dirname,
				project: ['./tsconfig.json'],
			},
		},
		{
			files: ['example/*.js'],
			...configCJS,
		},
	],
	rules: {
		'sort-imports': ['error', { ignoreCase: true }],
	},
};
