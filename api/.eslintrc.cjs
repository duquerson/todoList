module.exports = {
	parserOptions: {
		ecmaVersion: "2022",
	},
	extends: ["eslint:recommended", "prettier"],
	env: {
		es6: true,
		node: true,
		jest: true,
	},
	rules: {
		"no-console": "warn",
	},
};
