import { Button } from '@/components/ui';
import { cn } from '@/shared/lib/utils';
import { ShoppingCart, Wallet } from 'lucide-react';
import React from 'react';
import { CartDrawer } from '../CartDrawer';

interface Props {
	className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
	return (
		<CartDrawer>
			<Button className={cn('group relative', className)}>
				<b>520₽</b>
				<span className='h-full w-[1px] bg-white/30 mx-3' />
				<div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
					<ShoppingCart className='h-4 w-4 relative' strokeWidth={2} />
					<b>3</b>
				</div>
				<Wallet className='w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0' />
			</Button>
		</CartDrawer>
	);
};
