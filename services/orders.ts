import { prisma } from '@/prisma/PrismaClient';

export const getById = async (id: string) => {
	const order = await prisma.order.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			user: true,
		},
	});

	return order;
};
