import NextAuth, { AuthOptions } from 'next-auth';
import YandexProvider from 'next-auth/providers/yandex';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/prisma/PrismaClient';
import { compare, hashSync } from 'bcrypt';
import { UserRole } from '@prisma/client';

export const config: AuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			profile(profile) {
				return {
					id: String(profile.id),
					name: profile.name || '',
					email: profile.email || '',
					role: 'USER' as UserRole,
					phone: profile.phone || '',
				};
			},
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
			profile(profile) {
				return {
					id: String(profile.id),
					name: profile.display_name || profile.real_name || '',
					email: profile.default_email || profile.emails?.[0],
					role: 'USER' as UserRole,
					phone: '',
				};
			},
		}),
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					required: true,
				},
				password: {
					label: 'Password',
					type: 'password',
					required: true,
				},
			},
			async authorize(credentials) {
				if (!credentials) {
					return null;
				}

				const { email, password } = credentials;

				const user = await prisma.user.findFirst({
					where: {
						email,
					},
				});

				if (!user) {
					return null;
				}

				if (!user.verified) {
					return null;
				}

				const isPasswordValid = await compare(password, user.password);

				if (!isPasswordValid) {
					return null;
				}

				return {
					id: String(user.id),
					name: user.fullName,
					email: user.email,
					role: user.role,
					phone: user.phone,
				};
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async signIn({ user, account }) {
			try {
				if (account?.provider === 'credentials') {
					return true;
				}

				if (!user.email) {
					return false;
				}

				const userInfo = await prisma.user.findFirst({
					where: {
						OR: [
							{
								email: user.email,
							},
							{
								provider: account?.provider,
								providerId: account?.providerAccountId,
							},
						],
					},
				});

				if (userInfo) {
					await prisma.user.update({
						where: {
							id: userInfo.id,
						},
						data: {
							provider: account?.provider,
							providerId: account?.providerAccountId,
						},
					});

					return true;
				}

				await prisma.user.create({
					data: {
						email: user.email,
						fullName: user.name || 'Агент ' + user.id,
						password: hashSync(user.id.toString(), 10),
						verified: new Date(),
						provider: account?.provider,
						providerId: account?.providerAccountId,
					},
				});

				return true;
			} catch (error) {
				console.error(error);
				return false;
			}
		},
		async jwt({ token }) {
			if (!token.email) {
				return token;
			}

			const user = await prisma.user.findFirst({
				where: {
					email: token.email,
				},
			});

			if (user) {
				token.id = String(user.id);
				token.name = user.fullName;
				token.role = user.role;
				token.phone = user.phone;
				token.email = user.email;
			}

			return token;
		},
		session({ session, token }) {
			if (session?.user) {
				session.user.id = token.id;
				session.user.role = token.role;
				session.user.phone = token.phone;
			}

			return session;
		},
	},
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
