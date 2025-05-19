import { config } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const getSession = async () => {
	const session = await getServerSession(config);

	return session?.user ?? null;
};
