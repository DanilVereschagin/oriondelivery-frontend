import { Ingredient } from '@prisma/client';
import { ApiRoutes } from './routes';
import { axiosInstance } from './instance';

export const getAll = async () => {
	const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS);
	return data;
};
