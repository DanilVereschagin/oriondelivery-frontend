import { Cart } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './routes';

export interface AddCartItem {
	productVariantId: number;
	quantity?: number;
	ingredients?: number[];
}

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

export const addCartItem = async (values: AddCartItem): Promise<Cart> => {
	const data = await axiosInstance.post<Cart>(ApiRoutes.CART, values);
	return data.data;
};

export const removeCartItem = async (id: number): Promise<Cart> => {
	const data = await axiosInstance.delete<Cart>(`${ApiRoutes.CART}/${id}`);
	return data.data;
};
