import Link from 'next/link';
import React from 'react';
import { Title } from './Title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';

interface Props {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	className?: string;
}

export const ProductCard: React.FC<Props> = ({
	id,
	name,
	price,
	imageUrl,
	className,
}) => {
	return (
		<div className={className}>
			<Link href={'#'}>
				<div className='flex justify-center p-6 bg-violet-100 rounded-lg h-[260px]'>
					<img className='w-[215px] h-[215px]' src={imageUrl} alt={name} />
				</div>

				<Title text={name} size='sm' className='mb-1 mt-3 font-bold' />

				<p className='text-sm text-violet-400'>
					Цыплёнок, моцарелла, сырный соус, томаты, чеснок
				</p>

				<div className='flex items-center justify-between mt-4'>
					<span className='text-[20px]'>
						от <b>{price} ₽</b>
					</span>

					<Button variant='outline' className='text-base font-bold'>
						<Plus className='w-5 h-5 mr-1' />
						Добавить
					</Button>
				</div>
			</Link>
		</div>
	);
};
