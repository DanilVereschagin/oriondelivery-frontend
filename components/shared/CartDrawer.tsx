'use client';

import React, { PropsWithChildren, useEffect } from 'react';

import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { Button } from '../ui';
import { Wallet } from 'lucide-react';
import { CartDrawerItem } from './CartDrawerItem';
import { useCartStore } from '@/shared/store/cart';

interface Props {
	className?: string;
}

export const CartDrawer: React.FC<PropsWithChildren<Props>> = ({
	children,
}) => {
	const { fetchCartItems, totalAmount, cartItems } = useCartStore(
		(state) => state
	);

	useEffect(() => {
		fetchCartItems();
	}, []);

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className='flex flex-col justify-between pb-0'>
				<SheetHeader>
					<SheetTitle className='text-violet-800 font-bold'>
						Корзина:{' '}
						<span>
							{cartItems.length} {cartItems.length < 5 ? 'блюда' : 'блюд'}
						</span>
					</SheetTitle>
				</SheetHeader>

				<div className='-mx-6 mt-5 overflow-auto flex-1'>
					<div className='mb-2'>
						{cartItems.map((item) => (
							<CartDrawerItem
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

				<SheetFooter className='-mx-6 bg-violet-100 p-8'>
					<div className='w-full'>
						<div className='flex mb-4'>
							<span className='flex flex-1 text-lg text-black'>
								Итого
								<div className='flex-1 border-b border-dashed border-b-violet-300 relative -top-1 mx-2' />
							</span>

							<span className='text-violet-800 font-bold'>{totalAmount} ₽</span>
						</div>

						<Link href={'/cart'}>
							<Button
								// onClick={() => setRedirecting(true)}
								// loading={loading || redirecting}
								type='submit'
								className='w-full h-12 text-base'
							>
								Оформить заказ
								<Wallet className='w-5 ml-2' />
							</Button>
						</Link>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
