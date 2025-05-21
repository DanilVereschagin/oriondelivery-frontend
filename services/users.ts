import { prisma } from '@/prisma/PrismaClient';

export const getAll = async () => {
	const users = await prisma.user.findMany({
		orderBy: {
			id: 'asc',
		},
	});

	return users;
};
