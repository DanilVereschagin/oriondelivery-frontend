'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Container, Title } from '@/components/shared';
import { AmountInfo, DeliveryInfo } from '@/components/shared/checkout';
import { CartInfo } from '@/components/shared/checkout';
import { cn } from '@/shared/lib/utils';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	CheckoutFormSchema,
	CheckoutFormType,
} from '@/components/schemas/CheckoutFormSchema';
import { createOrder } from '@/shared/actions/actions';
import toast from 'react-hot-toast';
import { useOrderStore } from '@/shared/store/order';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Props {
	className?: string;
}

const Checkout: React.FC<Props> = ({ className }) => {
	const { data: session } = useSession();

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

	useEffect(() => {
		if (session?.user) {
			form.setValue('email', session.user.email ?? '');
			form.setValue('fullName', session.user.name ?? '');
			form.setValue('phone', session.user.phone ?? '');
		}
	}, [form, session]);

	const { amount } = useOrderStore((state) => state);

	const [paying, setPaying] = useState(false);

	const router = useRouter();

	const onSubmit: SubmitHandler<CheckoutFormType> = async (
		data: CheckoutFormType
	) => {
		try {
			setPaying(true);

			const url = await createOrder(data, amount);

			toast.success('Заказ успешно создан. Переводим на оплату...');

			if (url) {
				router.push(url);
			}
		} catch (error) {
			toast.error('Что-то пошло не так');
			console.error(error);
		} finally {
			setPaying(false);
		}
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
							paying={paying}
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
