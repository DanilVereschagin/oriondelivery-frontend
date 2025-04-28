/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		formats: ['image/avif', 'image/webp'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'media.dodostatic.net',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'cdn.dodostatic.net',
				port: '',
				pathname: '/**',
			},
		],
	},
	sassOptions: {
		implementation: 'sass',
		silenceDeprecations: ['legacy-js-api'],
	},
};

export default nextConfig;
