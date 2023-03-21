module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{png,svg,css,js,json,html}'
	],
	swDest: './sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};