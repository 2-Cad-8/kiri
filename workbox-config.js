module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{png,svg,css,js,scss,html,json}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};