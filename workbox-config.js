module.exports = {
	
	globDirectory: './',
	globPatterns: [
		'**/*.{png,svg,css,js,html}'
	],
	
	swDest: './sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};