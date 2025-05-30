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

export const getOrders = async (userId: number) => {
	return await prisma.order.findMany({
		where: {
			userId: userId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
};

export const getAllOrders = async () => {
	return await prisma.order.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		take: 100,
	});
};
