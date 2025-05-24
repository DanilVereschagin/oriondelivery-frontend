'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from '../Container';
import Image from 'next/image';
import { Button } from '../../ui';
import { PanelsTopLeft, UserRound } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from '../../ui/toggle';
import classes from '@/components/style/Flicker.module.scss';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Props {
	className?: string;
}

export const AdminHeader: React.FC<Props> = ({ className }) => {
	const data = useSession();
	const session = data.data;

	const router = useRouter();

	const handleSignOut = async () => {
		try {
			await signOut({
				redirect: false,
				callbackUrl: '/',
			});
			router.push('/');
			router.refresh();
		} catch (error) {
			console.log(error);
			toast.error('Что-то пошло не так');
		}
	};

	return (
		<header
			className={cn(
				'sticky top-0 border border-b bg-background z-20',
				className
			)}
		>
			<Container className='flex items-center justify-between py-8'>
				<Link href='/admin'>
					<div className='flex items-center gap-4'>
						<Image
							className={classes.flicker_4_normal}
							src='/admin-logo.png'
							alt='logo'
							width={64}
							height={64}
						/>
						<div>
							<h1 className='text-2xl uppercase font-black bg-gradient-to-l from-primary via-red-700 to-red-500 text-transparent bg-clip-text'>
								ADMIN
							</h1>
							<p className='text-sm text-gray-400 leading-3'>
								Честь превыше всего
							</p>
						</div>
					</div>
				</Link>

				<div className='flex items-center gap-3'>
					<Button
						onClick={() => router.push('/admin')}
						variant={'outline'}
						className='text-red-500 border-red-500'
					>
						{' '}
						Заказы{' '}
					</Button>
					<Button
						onClick={() => router.push('/admin/users')}
						variant={'outline'}
						className='text-red-500 border-red-500'
					>
						{' '}
						Пользователи{' '}
					</Button>
					<Button
						onClick={() => router.push('/admin/statistics')}
						variant={'outline'}
						className='text-red-500 border-red-500'
					>
						{' '}
						Статистика{' '}
					</Button>
					<Button
						onClick={() => router.push('/admin/promocode')}
						variant={'outline'}
						className='text-red-500 border-red-500'
					>
						{' '}
						Промокоды{' '}
					</Button>
				</div>

				<div className='flex items-center gap-3'>
					{session && (
						<Button
							onClick={() => router.push('/')}
							variant='outline'
							className='flex items-center gap-2 text-red-500 border-red-500'
						>
							<PanelsTopLeft size={16} />
							Главная
						</Button>
					)}

					<ModeToggle className='text-red-500 border-red-500' />

					{session ? (
						<Button
							onClick={() => handleSignOut()}
							variant='outline'
							className='flex items-center gap-2 text-red-500 border-red-500'
						>
							<UserRound size={16} />
							Выйти
						</Button>
					) : (
						<Button
							onClick={() => router.push('/auth')}
							variant='outline'
							className='flex items-center gap-2 text-red-500 border-red-500'
						>
							<UserRound size={16} />
							Войти
						</Button>
					)}
				</div>
			</Container>
		</header>
	);
};
