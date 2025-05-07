'use client';

import React from 'react';
import { Title } from '../Title';
import { cn } from '@/shared/lib/utils';
import { useDeliveryStore } from '@/shared/store/delivery';

interface Props {
	className?: string;
}

export const AmountInfo: React.FC<React.PropsWithChildren<Props>> = ({
	className,
}) => {
	const { price } = useDeliveryStore((state) => state);

	const amount = price ? price + 300 : 300;

	return (
		<div className={cn('border border-violet-700 rounded-3xl', className)}>
			<div className='flex items-center justify-between pt-5 px-7'>
				<Title text={'Оплата'} size='md' className='font-bold' />

				<div className='flex flex-col gap-1'>
					<span className='text-xl'>
						Итого: <b>{amount} ₽</b>
					</span>
				</div>
			</div>

			<div className={'px-5 py-4'}>
				<div className='flex my-4'>
					<span className='flex flex-1 text-lg text-violet-700'>
						Стоимость блюд:{' '}
						<b className=' flex-1 border-b border-dashed border-b-violet-500 relative -top-1 mx-2'></b>
					</span>

					<span className='font-bold text-xl'>300 ₽</span>
				</div>

				<div className='flex my-4'>
					<span className='flex flex-1 text-lg text-violet-700'>
						Доставка:{' '}
						<b className=' flex-1 border-b border-dashed border-b-violet-500 relative -top-1 mx-2'></b>
					</span>

					<span className='font-bold text-xl'>{price} ₽</span>
				</div>
			</div>
		</div>
	);
};
