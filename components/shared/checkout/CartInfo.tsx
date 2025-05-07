import React from 'react';
import { Title } from '../Title';
import { cn } from '@/shared/lib/utils';

interface Props {
	className?: string;
}

export const CartInfo: React.FC<React.PropsWithChildren<Props>> = ({
	className,
}) => {
	return (
		<div className={cn('border border-violet-700 rounded-3xl', className)}>
			<div className='flex items-center justify-between pt-8 px-7'>
				<Title text={'Ваш заказ'} size='md' className='font-bold' />
			</div>

			<div className={'px-5 py-4'}>1</div>
		</div>
	);
};
