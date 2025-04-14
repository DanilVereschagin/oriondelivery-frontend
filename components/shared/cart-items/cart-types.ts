import { Ingredient } from '@prisma/client';

export interface CartItemProps {
	id: number;
	imageUrl: string;
	name: string;
	price: number;
	quantity: number;
	ingredients?: Ingredient[];
	pizzaSize?: number | null;
	type?: number | null;
	className?: string;
}
