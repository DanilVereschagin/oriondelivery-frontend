'use client';

import React, { useEffect } from 'react';
import { Title } from '../Title';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store/cart';
import { CheckoutItem } from './CheckoutItem';

interface Props {
	className?: string;
}

export const CartInfo: React.FC<React.PropsWithChildren<Props>> = ({
	className,
}) => {
	const { fetchCartItems, cartItems } = useCartStore((state) => state);

	useEffect(() => {
		fetchCartItems();
	}, []);

	return (
		<div className={cn('border border-violet-700 rounded-3xl', className)}>
			<div className='flex items-center justify-between pt-8 px-7'>
				<Title text={'Ваш заказ'} size='md' className='font-bold' />
			</div>

			<div className={'px-5 py-4'}>
				<div className=' mt-5 overflow-auto flex-1'>
					<div className='mb-2'>
						{cartItems.map((item) => (
							<CheckoutItem
								key={item.id}
								id={item.id}
								imageUrl={item.imageUrl}
								name={item.name}
								price={item.price}
								quantity={item.quantity}
								ingredients={item.ingredients}
								size={item.size}
								type={item.pizzaType}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
