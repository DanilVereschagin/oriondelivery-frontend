import { Promocode } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './routes';

export const hasPromocode = async (
	promo: string
): Promise<Promocode | undefined> => {
	const promocode = await axiosInstance.get<Promocode>(ApiRoutes.PROMOCODE, {
		params: {
			promo: promo,
		},
	});

	return promocode.data;
};
