import { prisma } from '../../prisma/PrismaClient';

export const hasPromocode = async (promo: string) => {
	const promocode = await prisma.promocode.findFirst({
		where: {
			code: promo,
		},
	});

	if (!promocode) return false;

	return promocode;
};
