'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { CartItemDetailsImage } from '../cart-items/CartItemDetailsImage';
import { CartItemProps } from '../cart-items/cart-types';
import { CartItemInfo } from '../cart-items/CartItemInfo';
import { CountButton } from '../buttons';
import { CartItemDetailsPrice } from '../cart-items/CartItemDetailsPrice';
import { Trash } from 'lucide-react';
import { useCartStore } from '@/shared/store/cart';

export const CheckoutItem: React.FC<CartItemProps> = ({
	id,
	name,
	price,
	quantity,
	ingredients,
	size,
	type,
	className,
	imageUrl,
}) => {
	const { updateCartItemsQuantity, removeCartItem } = useCartStore(
		(state) => state
	);

	const onUpdateQuantity = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		if (type === 'plus') {
			quantity += 1;
		} else {
			quantity -= 1;
		}
		updateCartItemsQuantity(id, quantity);
	};

	return (
		<div className={cn('flex p-5 gap-6 items-center mb-2', className)}>
			<CartItemDetailsImage src={imageUrl} />
			<div className='flex-1'>
				<CartItemInfo
					name={name}
					pizzaSize={size}
					type={type}
					ingredients={ingredients}
				/>

				<hr className='my-3' />

				<div className='flex items-center justify-between'>
					<CountButton
						onClick={(type) => onUpdateQuantity(id, quantity, type)}
						value={quantity}
					/>
					<div className='flex items-center gap-3'>
						<CartItemDetailsPrice value={price} />
						<Trash
							onClick={() => removeCartItem(id)}
							size={16}
							className='cursor-pointer text-violet-400 hover:text-violet-600'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
