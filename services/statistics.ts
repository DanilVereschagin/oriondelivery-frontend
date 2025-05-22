import { prisma } from '@/prisma/PrismaClient';

export const getCount = async () => {
	try {
		const count = await prisma.productStatistics.aggregate({
			_sum: {
				count: true,
			},
		});

		return count._sum.count || 0;
	} catch (error) {
		console.error(error);
	}
};

export const getCountByCategory = async () => {
	try {
		const count = await prisma.productStatistics.groupBy({
			by: ['categoryId'],
			_sum: {
				count: true,
			},
		});

		return count;
	} catch (error) {
		console.error(error);
	}
};

export const getProductByCategory = async () => {
	try {
		const products = await prisma.productStatistics.findMany();

		return products;
	} catch (error) {
		console.error(error);
	}
};
