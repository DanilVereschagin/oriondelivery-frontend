import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import React from 'react';

interface Props {
	className?: string;
	imageClassName?: string;
	src: string;
	alt: string;
	size?: 30 | 35 | 40;
	isPizza?: boolean;
}

export const ProductImage: React.FC<Props> = ({
	className,
	imageClassName,
	src: imageUrl,
	alt: name,
	size = '40',
	isPizza = true,
}) => {
	return (
		<div
			className={cn(
				'relative flex items-center justify-center flex-1',
				className
			)}
		>
			<Image
				src={imageUrl}
				alt={name}
				width={size === 30 ? 300 : size === 35 ? 400 : 500}
				height={size === 30 ? 300 : size === 35 ? 400 : 500}
				className={cn(
					'relative left-2 top-2 transition-all z-10 duration-300',
					imageClassName
				)}
			/>

			{isPizza ? (
				<>
					{' '}
					<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-violet-400 w-[450px] h-[450px]' />
					<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-violet-200 w-[370px] h-[370px]' />
				</>
			) : (
				''
			)}
		</div>
	);
};
