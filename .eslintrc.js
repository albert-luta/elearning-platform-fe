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
	plugins: ['react', '@typescript-eslint/eslint-plugin', 'prettier'],
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
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended'
	],
	root: true,
	env: {
		node: true,
		jest: true
	},
	ignorePatterns: ['.eslintrc.js', 'next.config.js'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'react/react-in-jsx-scope': 'off'
	}
};
