/**
 * @type {import('next').NextConfig}
 */
module.exports = {
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
			"mir-s3-cdn-cf.behance.net"
	]}
};
