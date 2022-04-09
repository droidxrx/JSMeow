const rules = {
	'class-methods-use-this': 0,
	'comma-dangle': 0,
	'func-names': 0,
	'import/no-extraneous-dependencies': 0,
	'import/no-relative-packages': 0,
	'linebreak-style': ['error', 'windows'],
	'max-len': ['error', 290],
	'no-await-in-loop': 0,
	'no-console': 0,
	'no-constant-condition': 0,
	'no-continue': 0,
	'no-plusplus': 0,
	'no-tabs': 0,
	'object-curly-newline': 0,
	'prefer-exponentiation-operator': 0,
	'sort-imports': 0,
	'no-unused-vars': 1,
	'max-classes-per-file': 0,
};

module.exports = {
	overrides: [
		{
			files: ['**/**/*.ts'],
			env: {
				browser: false,
				node: true,
				commonjs: true,
				es2022: true,
			},
			parser: '@typescript-eslint/parser',
			plugins: ['@typescript-eslint'],
			extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
			parserOptions: {
				tsconfigRootDir: __dirname,
				project: ['tsconfig.eslint.json'],
				ecmaVersion: 'latest',
			},
			rules: {
				'@typescript-eslint/indent': ['error', 'tab'],
				'@typescript-eslint/no-non-null-assertion': 0,
				'@typescript-eslint/no-var-requires': 0,
				'@typescript-eslint/no-unsafe-assignment': 0,
				'@typescript-eslint/no-unsafe-return': 0,
				'@typescript-eslint/no-unsafe-call': 0,
				'@typescript-eslint/no-unsafe-member-access': 0,
				'@typescript-eslint/no-explicit-any': 0,
				indent: 0,
				...rules,
				'no-unused-vars': 0,
			},
		},
		{
			files: ['*.js', '*.mjs', '*.cjs'],
			env: {
				browser: false,
				node: true,
				commonjs: true,
				es2022: true,
			},
			extends: ['eslint-config-airbnb-base'],
			parserOptions: {
				ecmaVersion: 'latest',
			},
			rules: {
				...rules,
				indent: ['error', 'tab'],
			},
		},
	],
};
