'use client';

import React, { PropsWithChildren } from 'react';

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

interface Props {
	className?: string;
}

export const CartDrawer: React.FC<PropsWithChildren<Props>> = ({
	children,
}) => {
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className='flex flex-col justify-between pb-0'>
				<SheetHeader>
					<SheetTitle className='text-violet-800 font-bold'>
						Корзина:{' '}
						<span>
							{/* {items.length} {items.length < 5 ? 'блюда' : 'блюд'} */}
							{3} {3 < 5 ? 'блюда' : 'блюд'}
						</span>
					</SheetTitle>
				</SheetHeader>

				<div className='-mx-6 mt-5 overflow-auto flex-1'>
					<div className='mb-2'>
						<CartDrawerItem
							id={1}
							imageUrl='https://media.dodostatic.net/image/r:233x233/11ef9060dd723610942e8f368b03540a.avif'
							name='Маргарита'
							pizzaSize={35}
							type={1}
							quantity={1}
							price={550}
						/>
					</div>
				</div>

				<SheetFooter className='-mx-6 bg-violet-100 p-8'>
					<div className='w-full'>
						<div className='flex mb-4'>
							<span className='flex flex-1 text-lg text-black'>
								Итого
								<div className='flex-1 border-b border-dashed border-b-violet-300 relative -top-1 mx-2' />
							</span>

							{/* <span>{totalAmount} ₽</span> */}
							<span className='text-violet-800 font-bold'>500 ₽</span>
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
