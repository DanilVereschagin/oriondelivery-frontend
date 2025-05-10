'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Container, Title } from '@/components/shared';
import { AmountInfo, DeliveryInfo } from '@/components/shared/checkout';
import { CartInfo } from '@/components/shared/checkout';
import { cn } from '@/shared/lib/utils';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	CheckoutFormSchema,
	CheckoutFormType,
} from '@/components/schemas/CheckoutFormSchema';

interface Props {
	className?: string;
}

const Checkout: React.FC<Props> = ({ className }) => {
	const form = useForm<CheckoutFormType>({
		resolver: zodResolver(CheckoutFormSchema),
		defaultValues: {
			email: '',
			fullName: '',
			phone: '',
			address: '',
			comment: '',
		},
	});

	const onSubmit: SubmitHandler<CheckoutFormType> = (
		data: CheckoutFormType
	) => {
		console.log(data);
	};

	return (
		<Container className={cn(className, 'mt-4')}>
			<Title size='lg' className='font-extrabold' text='Оформление заказа' />

			<FormProvider {...form}>
				<div className='flex gap-8'>
					<div className='mt-6 flex flex-col gap-6 w-[47%]'>
						<DeliveryInfo />
						<CartInfo />
					</div>
					<div className='w-[47%]'>
						<AmountInfo
							onPay={form.handleSubmit(onSubmit)}
							className='p-6 sticky top-[13.5rem]'
						/>
					</div>
				</div>
			</FormProvider>
		</Container>
	);
};

export default Checkout;
