'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Container } from '../Container';
import { cn } from '@/shared/lib/utils';
import { FormInput } from '@/components/ui/form';
import { Button } from '@/components/ui';
import toast from 'react-hot-toast';
import {
	PromocodeFormSchema,
	PromocodeFormType,
} from '@/components/schemas/PromocodeFormSchema';
import { createPromocode } from '@/shared/actions/actions';

interface Props {
	className?: string;
}

export const AdminPromocodeForm: React.FC<Props> = ({ className }) => {
	const form = useForm({
		resolver: zodResolver(PromocodeFormSchema),
		defaultValues: {
			code: '',
			quantity: '',
			sale: '',
		},
	});

	const router = useRouter();

	const onSubmit = async (data: PromocodeFormType) => {
		try {
			await createPromocode(data);
			toast.success('Промокод успешно создан');

			router.refresh();
		} catch (error) {
			toast.error('Не удалось создать промокод, попробуйте позже');
			console.log(error);
		}
	};

	return (
		<Container className={className}>
			<FormProvider {...form}>
				<form className={cn('flex flex-col gap-4 w-full')}>
					<FormInput
						type='text'
						name='code'
						placeholder='Код промокода'
						required
					/>
					<FormInput
						type='text'
						name='quantity'
						placeholder='Количество'
						required
					/>
					<FormInput
						type='text'
						name='sale'
						placeholder='Размер скидки в рублях'
						required
					/>
					<Button
						onClick={form.handleSubmit(onSubmit)}
						type='submit'
						loading={form.formState.isSubmitting}
					>
						Добавить
					</Button>
				</form>
			</FormProvider>
		</Container>
	);
};
