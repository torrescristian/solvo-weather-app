module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{js,png,html,json}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/,
	]
};
