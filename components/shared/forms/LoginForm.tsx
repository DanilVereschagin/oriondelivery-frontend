'use client';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/components/ui/button';
import YandexIcon from '@/public/assets/SocialNetworks/Yandex.webp';
import GoogleIcon from '@/public/assets/SocialNetworks/Google.png';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	LoginFormSchema,
	LoginFormType,
} from '@/components/schemas/LoginSchema';
import { FormInput } from '@/components/ui/form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { SearchParamsProps } from '@/app/(root)/auth/page';
import { useDebounce } from 'react-use';

interface Props {
	searchParams?: SearchParamsProps;
	className?: string;
}

export function LoginForm({ searchParams, className }: Props) {
	const form = useForm<LoginFormType>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: zodResolver(LoginFormSchema),
	});

	const router = useRouter();

	useDebounce(
		() => {
			if (searchParams) {
				if (searchParams.active !== null && searchParams.active !== undefined) {
					console.log(searchParams.active);
					toast.success('Аккаунт активирован');
				}
			}
		},
		200,
		[]
	);

	const onSubmit = async (data: LoginFormType) => {
		try {
			const result = await signIn('credentials', {
				redirect: false,
				...data,
			});

			if (!result?.ok) {
				return toast.error('Неверный логин или пароль');
			}

			toast.success('Вы успешно вошли в аккаунт');

			router.push('/');
		} catch (error) {
			toast.error('Не удалось войти в аккаунт');
			console.log(error);
		}
		console.log(data);
	};

	return (
		<FormProvider {...form}>
			<div className={cn('flex flex-col gap-6', className)}>
				<div className='flex flex-col items-center gap-2 text-center'>
					<h1 className='text-2xl font-bold'>Вход в аккаунт</h1>
					<p className='text-balance text-sm text-muted-foreground'>
						Введите логин и пароль
					</p>
				</div>
				<div className='grid gap-6'>
					<div className='flex flex-col gap-2'>
						<div className='grid gap-2'>
							<FormInput
								id='email'
								name='email'
								type='email'
								placeholder='Email'
								required
							/>
						</div>
						<div className='grid gap-2'>
							<FormInput
								id='password'
								name='password'
								type='password'
								placeholder='Пароль'
								required
							/>
						</div>
					</div>
					<Button
						loading={form.formState.isSubmitting}
						onClick={form.handleSubmit(onSubmit)}
						type='submit'
						className='w-full text-xl'
					>
						Войти
					</Button>
					<div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
						<span className='relative z-10 bg-background px-2 text-muted-foreground'>
							Или войдите через
						</span>
					</div>
					<div className='flex flex-col gap-2'>
						<Button
							onClick={() =>
								signIn('google', {
									callbackUrl: '/',
									redirect: true,
								})
							}
							variant='outline'
							className='w-full flex gap-2 text-xl'
						>
							<Image src={GoogleIcon} alt='Google' width={20} height={20} />
							Войти через Google
						</Button>
						<Button
							onClick={() =>
								signIn('yandex', { callbackUrl: '/', redirect: true })
							}
							variant='outline'
							className='w-full flex gap-2 text-xl'
						>
							<Image src={YandexIcon} alt='Yandex' width={20} height={20} />
							Войти через Yandex
						</Button>
					</div>
				</div>
			</div>
		</FormProvider>
	);
}
