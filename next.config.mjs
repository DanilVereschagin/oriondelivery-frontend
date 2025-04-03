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
		],
	},
};

export default nextConfig;
