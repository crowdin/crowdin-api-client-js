//@ts-check

const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const eslintPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    eslintPrettierRecommended,
    {
        languageOptions: {
            parserOptions: {
                ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
                sourceType: 'module' // Allows for the use of imports
            },
        },
        rules: {
            eqeqeq: 2,
            'no-console': [2, { 'allow': ['warn', 'error'] }],
            'no-throw-literal': 2,
            '@typescript-eslint/no-unused-vars': 2,
            '@typescript-eslint/no-explicit-any': 1,
            '@typescript-eslint/explicit-function-return-type': 2,
            '@typescript-eslint/no-namespace': 0,
            '@typescript-eslint/no-non-null-assertion': 'off',
            'no-unused-expressions': 2,
            curly: 2,
            semi: 2,
            'brace-style': 2,
            quotes: [2, 'single', 'avoid-escape'],
            'prefer-rest-params': 'warn',
        },
        ignores: ['**/node_modules/*', 'website/*', 'README.md', '**/npm/*']
    }
);