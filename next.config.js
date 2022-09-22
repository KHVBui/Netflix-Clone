const withTM = require('next-transpile-modules')([
  '@stripe/firestore-stripe-payments',
]) // pass the modules you would like to see transpiled

/**
 * @type {import('next').NextConfig}
 */
module.exports = withTM({
	experimental: {
		images: {
			allowFutureImage: true
		}
	},
	reactStrictMode: true,
	images: {
		domains: [
			"image.tmdb.org",
			"upload.wikimedia.org",
			"mir-s3-cdn-cf.behance.net",
			"rb.gy",
			"assets.nflxext.com"
		],
		deviceSizes: [30, 100, 170, 180, 1200]
	}
});
