import { cn } from '@/shared/lib/utils';
import { CircleCheck } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface Props {
	className?: string;
	imageUrl: string;
	name: string;
	price: number;
	active?: boolean;
	onClick?: () => void;
}

export const Ingredient: React.FC<Props> = ({
	className,
	imageUrl,
	name,
	price,
	active,
	onClick,
}) => {
	return (
		<div
			className={cn(
				'flex items-center justify-between flex-col p-1 rounded-lg w-32 text-center relative cursor-pointer shadow-md bg-violet-400',
				{ 'border-4 border-violet-800': active },
				className
			)}
			onClick={onClick}
		>
			{active && <CircleCheck className='absolute top-2 right-2 text-white' />}
			<Image src={imageUrl} alt={name} width={100} height={100} />
			<span className='text-ms mb-1'>{name}</span>
			<span className='font-bold'>{price} ₽</span>
		</div>
	);
};
