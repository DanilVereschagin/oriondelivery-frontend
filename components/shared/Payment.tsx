'use client';

import { payOrder } from '@/shared/actions/actions';
import { cn } from '@/shared/lib/utils';
import { Order } from '@prisma/client';
import React, { useState } from 'react';
import {
	PaymentFormSchema,
	PaymentFormType,
} from '../schemas/PaymentFormSchema';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '../ui/form';
import { Button } from '../ui';
import { Title } from './Title';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Props {
	className?: string;
	order: Order;
}

export const Payment: React.FC<Props> = ({ className, order }) => {
	const form = useForm<PaymentFormType>({
		resolver: zodResolver(PaymentFormSchema),
		defaultValues: {
			fullName: '',
			cardNumber: '',
			expiryDate: '',
			cvv: '',
		},
	});

	const [paying, setPaying] = useState(false);

	const router = useRouter();

	const handlePayment: SubmitHandler<PaymentFormType> = async (
		data: PaymentFormType
	) => {
		try {
			setPaying(true);

			await payOrder(data, order.id);

			toast.success('Заказ оплачен');

			router.push('profile/orders');
		} catch (error) {
			toast.error('Что-то пошло не так');
			console.log(error);
		} finally {
			setPaying(false);
		}
	};

	return (
		<div className={cn('flex flex-col gap-4 w-[100%]', className)}>
			<div className='flex flex-row gap-4 items-center'>
				<Title size='xl' text='Оплата заказа' />
				<div
					className={
						'items-center border rounded-full text-white px-4 py-1' +
						' ' +
						(order.status !== 'CANCELLED' && order.status !== 'PENDING'
							? 'bg-green-500'
							: 'bg-red-500')
					}
				>
					{order.status !== 'CANCELLED' && order.status !== 'PENDING'
						? 'Заказ оплачен'
						: 'Ждёт оплаты'}
				</div>
			</div>

			<div className='flex flex-row gap-4'>
				<h1 className='text-2xl'>Заказ: {order.id}</h1>
				<h1 className='text-2xl'>Сумма: {order.totalAmount} ₽</h1>
			</div>
			{order.status === 'PENDING' && (
				<FormProvider {...form}>
					<div className='flex flex-col gap-4 w-[40%]'>
						<FormInput name='fullName' placeholder='ФИО' />
						<FormInput
							name='cardNumber'
							placeholder='Номер карты без пробелов'
						/>
						<div className='flex flex-row gap-4 justify-between'>
							<FormInput
								className='w-[50%]'
								name='expiryDate'
								placeholder='Срок действия 01/25'
							/>
							<FormInput className='w-[50%]' name='cvv' placeholder='CVV' />
						</div>
						<Button
							className='text-xl'
							loading={paying}
							onClick={form.handleSubmit(handlePayment)}
							type='submit'
						>
							Оплатить
						</Button>
					</div>
				</FormProvider>
			)}
		</div>
	);
};
