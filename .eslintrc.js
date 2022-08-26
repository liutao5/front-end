module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'standard-with-typescript',
		'plugin:react/jsx-runtime',
	],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: 'tsconfig.json'
	},
	plugins: ['react'],
	rules: {
		'indent': ['error', 'tab'],
		'no-tabs': 'off',
		'comma-dangle': 'off',
		'quote-props': 'off',
		'space-before-function-paren': 'off',
		'@typescript-eslint/indent': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/space-before-function-paren': 'off'
	},
}
