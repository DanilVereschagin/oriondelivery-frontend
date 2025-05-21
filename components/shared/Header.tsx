'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from './Container';
import Image from 'next/image';
import { Button } from '../ui';
import { CircleUser, UserRound } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from '../ui/toggle';
import { CartButton } from './buttons';
import classes from '@/components/style/Flicker.module.scss';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Props {
	className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
	const data = useSession();
	const session = data.data;

	const router = useRouter();

	const handleSignOut = () => {
		try {
			signOut({
				callbackUrl: '/',
			});
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
				<Link href='/'>
					<div className='flex items-center gap-4'>
						<Image
							className={classes.flicker_4_normal}
							src='/logo.jpg'
							alt='logo'
							width={64}
							height={64}
						/>
						<div>
							<h1 className='text-2xl uppercase font-black bg-gradient-to-l from-primary via-violet-700 to-violet-500 text-transparent bg-clip-text'>
								ORION Delivery
							</h1>
							<p className='text-sm text-gray-400 leading-3'>
								Через тернии к вашему подъезду
							</p>
						</div>
					</div>
				</Link>

				<div className='flex items-center gap-3'>
					{session?.user?.role === 'ADMIN' && (
						<Button
							variant='outline'
							size={'lg'}
							onClick={() => router.push('/admin')}
							className='flex items-center gap-2 text-red-600 border-red-600'
						>
							<CircleUser size={16} />
							Админ панель
						</Button>
					)}
					{session && (
						<Button
							onClick={() => router.push('/profile')}
							variant='outline'
							className='flex items-center gap-2'
						>
							<CircleUser size={16} />
							Профиль
						</Button>
					)}

					<ModeToggle />
					<CartButton />

					{session ? (
						<Button
							onClick={() => handleSignOut()}
							variant='outline'
							className='flex items-center gap-2'
						>
							<UserRound size={16} />
							Выйти
						</Button>
					) : (
						<Button
							onClick={() => router.push('/auth')}
							variant='outline'
							className='flex items-center gap-2'
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
