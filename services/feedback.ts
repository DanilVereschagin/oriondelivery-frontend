import { prisma } from '@/prisma/PrismaClient';

export const getCommentsByProductId = async (productId: number) => {
	try {
		const comments = await prisma.productFeedback.findMany({
			where: {
				productId: productId,
			},
			include: {
				user: {
					select: {
						fullName: true,
					},
				},
			},
		});

		return comments || [];
	} catch (error) {
		console.error(error);
	}
};
