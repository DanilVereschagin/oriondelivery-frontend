'use client';

import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	RegistrationFormSchema,
	RegistrationFormType,
} from '@/components/schemas/RegistrationSchema';
import { FormInput } from '@/components/ui/form';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Title } from '../Title';
import { registerUser } from '@/shared/actions/actions';

interface Props {
	className?: string;
}

export function RegistrationForm({ className }: Props) {
	const form = useForm({
		resolver: zodResolver(RegistrationFormSchema),
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			confirmPassword: '',
			phone: '',
		},
	});

	const router = useRouter();

	const onSubmit = async (data: RegistrationFormType) => {
		try {
			await registerUser(data);

			toast.success('Регистрация прошла успешно. Активируйте аккаунт');

			router.push('/');
		} catch (error) {
			toast.error('Не удалось зарегистрироваться, попробуйте позже');
			toast.error(error as string);
			console.log(error);
		}
	};

	return (
		<FormProvider {...form}>
			<div className='flex flex-col items-center gap-2 text-center'>
				<Title className='text-3xl font-bold' size='xl' text='Регистрация' />
			</div>
			<form className={cn(className, 'mt-4 flex flex-col gap-4 w-full')}>
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
					Зарегистрироваться
				</Button>
			</form>
		</FormProvider>
	);
}
