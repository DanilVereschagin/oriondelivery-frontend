import { Api } from '@/services/api';
import { create } from 'zustand';
import { convertToCart, PlateCartItem } from '../lib/convert-to-cart';

export interface CartItemDTO {
	id: number;
	quantity: number;
	name: string;
	price: number;
	imageUrl: string;
	pizzaSize: number;
	pizzaType: number;
	ingredients: Array<{ name: string; price: number }>;
}

export interface State {
	loading: boolean;
	error: boolean;
	totalAmount: number;
	cartItems: PlateCartItem[];
	fetchCartItems: () => Promise<void>;
	updateCartItemsQuantity: (id: number, quantity: number) => Promise<void>;
	addCartItem: (values: any) => Promise<void>;
	removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<State>((set, get) => ({
	cartItems: [],
	error: false,
	loading: false,
	totalAmount: 0,

	fetchCartItems: async () => {
		set({ loading: true, error: false });
		try {
			const cart = await Api.cart.getCart();
			set(convertToCart(cart));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},

	updateCartItemsQuantity: async (id: number, quantity: number) => {
		set({ loading: true });
		try {
			const cart = await Api.cart.updateCartItemQuantity(id, quantity);
			set(convertToCart(cart));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},

	addCartItem: async (values: any) => {
		set({ loading: true });
		try {
			const cart = await Api.cart.addCartItem(values);
			set({ cartItems: cart.cartItems, totalAmount: cart.totalAmount });
		} catch (error) {
			console.error(error);
		} finally {
			set({ loading: false });
		}
	},

	removeCartItem: async (id: number) => {
		set({ loading: true });
		try {
			const cart = await Api.cart.removeCartItem(id);
			set({ cartItems: cart.cartItems, totalAmount: cart.totalAmount });
		} catch (error) {
			console.error(error);
		} finally {
			set({ loading: false });
		}
	},
}));
