import { Category } from '@prisma/client';
import { ApiRoutes } from './routes';
import { axiosInstance } from './instance';

export const getAllWithProducts = async () => {
	const { data } = await axiosInstance.get<Category[]>(ApiRoutes.CATEGORIES);
	return data;
};
