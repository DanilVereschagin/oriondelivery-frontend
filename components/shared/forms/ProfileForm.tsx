'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Container } from '../Container';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/components/ui';
import { FormInput } from '@/components/ui/form';
import { User } from '@prisma/client';
import { updateUser } from '@/shared/actions/actions';
import {
	ProfileFormSchema,
	ProfileFormType,
} from '@/components/schemas/ProfileFormSchema';
import { useRouter } from 'next/navigation';

interface Props {
	data: User;
	className?: string;
}

export const ProfileForm: React.FC<Props> = ({ data, className }) => {
	const form = useForm({
		resolver: zodResolver(ProfileFormSchema),
		defaultValues: {
			fullName: data.fullName!,
			email: data.email!,
			password: '',
			confirmPassword: '',
			phone: data.phone!,
		},
	});

	const router = useRouter();

	const onSubmit = async (data: ProfileFormType) => {
		try {
			await updateUser(data);

			toast.success('Данные успешно обновлены');

			router.refresh();
		} catch (error) {
			toast.error('Не удалось обновить данные, попробуйте позже');
			console.log(error);
		}
	};

	return (
		<Container className={className}>
			<FormProvider {...form}>
				<form className={cn('flex flex-col gap-4 w-full')}>
					<FormInput
						type='text'
						name='fullName'
						placeholder='ФИО или ник'
						required
					/>
					<FormInput
						type='email'
						name='email'
						placeholder='example@mail.ru'
						required
					/>
					<FormInput
						type='tel'
						name='phone'
						placeholder='Номер формата: 89005553535'
						required
					/>
					<div className='flex flex-row gap-2 w-full'>
						<FormInput
							className='w-full'
							type='password'
							name='password'
							placeholder='Пароль'
						/>
						<FormInput
							className='w-full'
							type='password'
							name='confirmPassword'
							placeholder='Повторите пароль'
							error={form.formState.errors.confirmPassword?.message}
						/>
					</div>
					<Button
						onClick={form.handleSubmit(onSubmit)}
						type='submit'
						loading={form.formState.isSubmitting}
					>
						Сохранить
					</Button>
				</form>
			</FormProvider>
		</Container>
	);
};
