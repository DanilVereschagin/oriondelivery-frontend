'use client';

import React, { useEffect, useState } from 'react';
import { Title } from '../Title';
import { cn } from '@/shared/lib/utils';
import { deliveryTypes } from '@/shared/constants/delivery';
import { Input, Textarea } from '@/components/ui';
import { useDeliveryStore } from '@/shared/store/delivery';

interface Props {
	className?: string;
}

export const DeliveryInfo: React.FC<React.PropsWithChildren<Props>> = ({
	className,
}) => {
	const { setPrice } = useDeliveryStore((state) => state);
	const [activeDeliveryType, setActiveDeliveryType] = useState(
		deliveryTypes[0].value
	);

	useEffect(() => {
		setPrice(
			deliveryTypes.find((type) => type.value === activeDeliveryType)?.name
				.price || 0
		);
	}, [activeDeliveryType, setPrice]);

	const handleDeliveryTypeClick = (deliveryType: string) => {
		setActiveDeliveryType(deliveryType);
	};

	return (
		<div className={cn('border border-violet-700 rounded-3xl', className)}>
			<div className='flex items-center justify-between pt-8 px-7'>
				<Title text={'Условия доставки'} size='md' className='font-bold' />
			</div>

			<div className={'px-5 py-4'}>
				<div className={cn('inline-flex gap-2 p-1 rounded-2xl', className)}>
					{deliveryTypes.map((type, index) => (
						<div
							className={cn(
								'flex items-center font-bold h-11 rounded-2xl px-5 text-primary',
								activeDeliveryType === type.value &&
									'bg-violet-200 shadow-md shadow-violet-700 text-primary'
							)}
							key={index}
						>
							<button
								className='flex flex-col gap-y-0.5 items-center'
								onClick={() => handleDeliveryTypeClick(type.value)}
							>
								<span>{type.name.name}</span>
								<span>{type.name.price} ₽</span>
							</button>
						</div>
					))}
				</div>

				<Input name='fullName' className='text-base mt-4' placeholder='ФИО' />

				<div className='mt-4 grid grid-cols-2 gap-4'>
					<Input
						name='email'
						className='text-base'
						placeholder='Электронная почта'
					/>
					<Input
						name='phone'
						className='text-base'
						placeholder='8 (000) 000-00-00 или +7 (000) 000-00-00'
					/>
				</div>
				<div className='mt-4 grid grid-cols-1 gap-4'>
					<Input
						name='address'
						className='text-base'
						placeholder='Адрес доставки'
					/>
					<Textarea
						rows={5}
						name='comment'
						className='text-base resize-none'
						placeholder='Комментарий'
					/>
				</div>
			</div>
		</div>
	);
};
