import Link from 'next/link';
import React from 'react';
import { Title } from './Title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import Image from 'next/image';

interface Props {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	className?: string;
	ingredients?: string;
}

export const ProductCard: React.FC<Props> = ({
	id,
	name,
	price,
	imageUrl,
	className,
	ingredients,
}) => {
	return (
		<div className={className} style={{ animationDelay: `${id * 0.1}s` }}>
			<Link href={'/product/' + id}>
				<div className='flex justify-center p-6 bg-violet-300 rounded-lg h-[260px]'>
					<Image width={215} height={215} src={imageUrl} alt={name} />
				</div>

				<Title text={name} size='sm' className='mb-1 mt-3 font-bold' />

				<p className='text-sm text-violet-600'>{ingredients}</p>

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
