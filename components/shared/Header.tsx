import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from './Container';
import Image from 'next/image';
import { Button } from '../ui';
import { ShoppingCart, UserRound, Wallet } from 'lucide-react';
import Link from 'next/link';
import { SearchInput } from './SearchInput';
import { ModeToggle } from '../ui/toggle';
import { CartButton } from './buttons';

interface Props {
	className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
	return (
		<header className={cn('border border-b ', className)}>
			<Container className='flex items-center justify-between py-8'>
				<Link href='/'>
					<div className='flex items-center gap-4'>
						<Image src='/logo.jpg' alt='logo' width={64} height={64} />
						<div>
							<h1 className='text-2xl uppercase font-black'>ORION Delivery</h1>
							<p className='text-sm text-gray-400 leading-3'>
								Через тернии к вашему подъезду
							</p>
						</div>
					</div>
				</Link>

				<div className='mx-10 flex-1'>
					<SearchInput />
				</div>

				<div className='flex items-center gap-3'>
					<ModeToggle />
					<CartButton />

					<Button variant='outline' className='flex items-center gap-2'>
						<UserRound size={16} />
						Войти
					</Button>
				</div>
			</Container>
		</header>
	);
};
