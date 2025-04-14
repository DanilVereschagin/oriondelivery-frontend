import { cn } from '@/shared/lib/utils';
import React from 'react';
import { CartItemDetailsImage } from './cart-items/CartItemDetailsImage';
import { CartItemProps } from './cart-items/cart-types';
import { CartItemInfo } from './cart-items/CartItemInfo';
import { CountButton } from './buttons';
import { CartItemDetailsPrice } from './cart-items/CartItemDetailsPrice';
import { Trash } from 'lucide-react';

export const CartDrawerItem: React.FC<CartItemProps> = ({
	id,
	name,
	price,
	quantity,
	ingredients,
	pizzaSize,
	type,
	className,
	imageUrl,
}) => {
	return (
		<div className={cn('flex bg-violet-200 p-5 gap-6', className)}>
			<CartItemDetailsImage src={imageUrl} />
			<div className='flex-1'>
				<CartItemInfo
					name={name}
					pizzaSize={pizzaSize}
					type={type}
					ingredients={ingredients}
				/>

				<hr className='my-3' />

				<div className='flex items-center justify-between'>
					<CountButton
						onClick={(value) => console.log(value)}
						value={quantity}
					/>
					<div className='flex items-center gap-3'>
						<CartItemDetailsPrice value={price} />
						<Trash
							size={16}
							className='cursor-pointer text-violet-400 hover:text-violet-600'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
