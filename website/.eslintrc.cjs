module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
    rules: {
        "no-extra-semi": "off",
        "@typescript-eslint/no-extra-semi": "off",
        "line-between-class-members": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "no-explicit-any": [
            "off",
        ],
        "no-undef": [
            "off",
        ],
        "no-await-in-loop": [
            "error",
        ],
        "no-constructor-return": [
            "error",
            true,
        ],
        "block-scoped-var": [
            "error",
        ],
        "default-case": [
            "error",
        ],
        "dot-notation": [
            "error",
            {
                "allowKeywords": true,
            },
        ],
        "eqeqeq": [
            "error",
            "always",
        ],
        "func-style": [
            "error",
            "declaration",
            {
                "allowArrowFunctions": true,
            },
        ],
        "no-confusing-arrow": [
            "error",
            {
                "allowParens": true,
            },
        ],
        "no-floating-decimal": [
            "error",
        ],
        "no-lonely-if": [
            "error",
        ],
        "no-return-await": [
            "error",
        ],
        "no-var": [
            "error",
        ],
        "prefer-arrow-callback": [
            "error",
            {
                "allowNamedFunctions": true,
                "allowUnboundThis": true,
            },
        ],
        "prefer-const": [
            "error",
            {
                "destructuring": "all",
                "ignoreReadBeforeAssign": true,
            },
        ],
        "require-await": [
            "error",
        ],
        "spaced-comment": [
            "error",
            "always",
        ],
        "yoda": [
            "error",
            "never",
        ],
        "array-bracket-spacing": [
            "error",
            "always",
        ],
        "array-element-newline": [
            "error",
            {
                "multiline": true,
                "minItems": 2,
            },
        ],
        "arrow-spacing": [
            "error",
            {
                "before": true,
                "after": true,
            },
        ],
        "brace-style": [
            "error",
            "1tbs",
            {
                "allowSingleLine": true,
            },
        ],
        "comma-dangle": [
            "error",
            "always-multiline",
        ],
        "comma-spacing": [
            "error",
            {
                "before": false,
                "after": true,
            },
        ],
        "eol-last": [
            "error",
            "never",
        ],
        "func-call-spacing": [
            "error",
            "never",
        ],
        "implicit-arrow-linebreak": [
            "error",
            "beside",
        ],
        "indent": [
            "error",
            4,
        ],
        "jsx-quotes": [
            "error",
            "prefer-double",
        ],
        "key-spacing": [
            "error",
            {
                "beforeColon": false,
                "afterColon": true,
                "mode": "strict",
            },
        ],
        "keyword-spacing": [
            "error",
            {
                "before": true,
                "after": true,
            },
        ],
        "line-comment-position": [
            "error",
            {
                "position": "above",
            },
        ],
        "newline-per-chained-call": [
            "error",
            {
                "ignoreChainWithDepth": 2,
            },
        ],
        "no-extra-parens": [
            "error",
            "all",
        ],
        "no-mixed-spaces-and-tabs": [
            "error",
            "smart-tabs",
        ],
        "no-multi-spaces": [
            "error",
            {
                "ignoreEOLComments": true,
            },
        ],
        "no-trailing-spaces": [
            "error",
            {
                "skipBlankLines": true,
            },
        ],
        "no-whitespace-before-property": [
            "error",
        ],
        "object-curly-spacing": [
            "error",
            "always",
        ],
        "object-property-newline": [
            "error",
            {
                "allowMultiplePropertiesPerLine": false,
            },
        ],
        "quotes": [
            "error",
            "double",
        ],
        "semi": [
            "error",
            "always",
        ],
        "semi-spacing": [
            "error",
            {
                "before": false,
                "after": true,
            },
        ],
    },
};
