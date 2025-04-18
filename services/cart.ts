import { Cart } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './routes';

export const getCart = async (): Promise<Cart> => {
	const data = await axiosInstance.get<Cart>(ApiRoutes.CART);
	return data.data.cart;
};

export const updateCartItemQuantity = async (
	id: number,
	quantity: number
): Promise<Cart> => {
	const data = await axiosInstance.patch<Cart>(`${ApiRoutes.CART}/${id}`, {
		quantity,
	});
	return data.data;
};
