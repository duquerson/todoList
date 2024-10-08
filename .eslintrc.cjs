module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	plugins: ["react-refresh"],
	rules: {
		"no-mixed-spaces-and-tabs": "off",
		"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
		indent: ["error", "tab", { SwitchCase: 1 }],
		"no-mixed-spaces-and-tabs": "error",
		"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
	},
};
