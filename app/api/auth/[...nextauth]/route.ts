import NextAuth from 'next-auth';
import YandexProvider from 'next-auth/providers/yandex';
import GoogleProvider from 'next-auth/providers/google';

export const config = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		YandexProvider({
			clientId: process.env.YANDEX_CLIENT_ID!,
			clientSecret: process.env.YANDEX_CLIENT_SECRET!,
			authorization: {
				url: 'https://oauth.yandex.ru/authorize',
				params: {
					response_type: 'code',
				},
			},
		}),
	],
	cookies: {
		state: {
			name: `next-auth.state`,
			options: {
				httpOnly: true,
				sameSite: 'lax',
				path: '/',
				secure: false,
				maxAge: 900,
			},
		},
	},
};

const handler = NextAuth(config);
export { handler as GET, handler as POST };
