import { Product } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './routes';
import { prisma } from '@/prisma/PrismaClient';

export const search = async (query: string): Promise<Product[]> => {
	const { data } = await axiosInstance.get<Product[]>(
		ApiRoutes.PRODUCTS_SEARCH,
		{
			params: {
				q: query,
			},
		}
	);

	return data;
};

export const getById = async (id: string) => {
	const product = await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true,
			variants: true,
			category: true,
		},
	});

	return product;
};
