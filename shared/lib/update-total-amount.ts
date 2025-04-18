import { prisma } from '@/prisma/PrismaClient';
import { calcPrice } from './convert-to-cart';

export const updateTotalAmount = async (token: string) => {
	try {
		const cart = await prisma.cart.findFirst({
			where: {
				token,
			},
			include: {
				cartItems: {
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						productVariant: {
							include: {
								product: true,
							},
						},
						ingredients: true,
					},
				},
			},
		});

		const totalAmount = cart?.cartItems.reduce(
			(acc, item) => acc + calcPrice(item),
			0
		);

		return await prisma.cart.update({
			where: {
				id: cart?.id,
			},
			data: {
				totalAmount,
			},
			include: {
				cartItems: {
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						productVariant: {
							include: {
								product: true,
							},
						},
						ingredients: true,
					},
				},
			},
		});
	} catch (error) {
		console.error(error);
	}
};
