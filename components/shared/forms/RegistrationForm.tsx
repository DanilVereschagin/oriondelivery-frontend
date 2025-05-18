'use client';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import YandexIcon from '@/public/assets/SocialNetworks/Yandex.webp';
import GoogleIcon from '@/public/assets/SocialNetworks/Google.png';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

export function RegistrationForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'form'>) {
	return (
		<form className={cn('flex flex-col gap-6', className)} {...props}>
			<div className='flex flex-col items-center gap-2 text-center'>
				<h1 className='text-2xl font-bold'>Регистрация</h1>
				<p className='text-balance text-sm text-muted-foreground'>
					Введите данные
				</p>
			</div>
			<div className='grid gap-6'>
				<div className='grid gap-2'>
					{/* <Label htmlFor='email'>Email</Label> */}
					<Input id='email' type='email' placeholder='m@example.com' required />
				</div>
				<div className='grid gap-2'>
					<div className='flex items-center'>
						{/* <Label htmlFor='password'>Password</Label> */}
					</div>
					<Input id='password' type='password' placeholder='Пароль' required />
				</div>
				<Button type='submit' className='w-full text-xl'>
					Войти
				</Button>
				<div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
					<span className='relative z-10 bg-background px-2 text-muted-foreground'>
						Или войдите через
					</span>
				</div>
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
					onClick={() => signIn('yandex', { callbackUrl: '/', redirect: true })}
					variant='outline'
					className='w-full flex gap-2 text-xl'
				>
					<Image src={YandexIcon} alt='Yandex' width={20} height={20} />
					Войти через Yandex
				</Button>
			</div>
		</form>
	);
}
