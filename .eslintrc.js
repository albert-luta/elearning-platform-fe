module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
			arrowFunctions: true
		},
		project: 'tsconfig.json'
	},
	plugins: ['prettier', 'react', '@typescript-eslint/eslint-plugin'],
	settings: {
		react: {
			version: 'detect'
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				paths: ['./']
			}
		}
	},
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	root: true,
	env: {
		node: true,
		jest: true
	},
	ignorePatterns: ['.eslintrc.js', 'next.config.js', 'src/generated/**/*'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': ['error', { 'ignoreRestSiblings': true }],
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
		'no-empty': ['error', { 'allowEmptyCatch': true }]
	}
};
