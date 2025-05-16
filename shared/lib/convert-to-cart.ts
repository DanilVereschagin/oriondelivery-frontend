import { Cart, Ingredient, ProductVariant } from '@prisma/client';

export interface PlateCartItem {
	id: number;
	quantity: number;
	name: string;
	imageUrl: string;
	price: number;
	size?: number;
	pizzaType?: number;
	ingredients: {
		name: string;
		price: number;
	}[];
	productVariant: ProductVariant;
}

export const convertToCart = (
	data: Cart
): {
	cartItems: PlateCartItem[];
	totalAmount: number;
} => {
	const items = data.cartItems.map((item) => ({
		id: item.id,
		quantity: item.quantity,
		name: item.productVariant.product.name,
		imageUrl: item.productVariant.product.imageUrl,
		price: calcPrice(item),
		size: item.productVariant.size,
		pizzaType: item.productVariant.pizzaType,
		ingredients: item.ingredients.map((ingredient: Ingredient) => ({
			name: ingredient.name,
			price: ingredient.price,
		})),
	}));

	return {
		cartItems: items,
		totalAmount: data.totalAmount,
	};
};

export const calcPrice = (item: PlateCartItem) => {
	const price = item.ingredients.reduce(
		(acc, ingredient) => acc + ingredient.price,
		0
	);

	return (price + item.productVariant.price) * item.quantity;
};
