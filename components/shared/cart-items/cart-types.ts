import { PlateCartItem } from '@/shared/lib/convert-to-cart';

export interface CartItemProps {
	id: number;
	imageUrl: string;
	name: string;
	price: number;
	quantity: number;
	ingredients?: PlateCartItem['ingredients'];
	size?: number | null;
	type?: number | null;
	className?: string;
}
