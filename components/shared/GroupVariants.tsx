'use client';

import { cn } from '@/lib/utils';
import React from 'react';

type Variant = {
	name: string;
	value: string;
	disabled?: boolean;
};

interface Props {
	className?: string;
	items: readonly Variant[];
	onClick?: (value: Variant['value']) => void;
	selectedValue?: Variant['value'];
}

export const GroupVariants: React.FC<Props> = ({
	items,
	className,
	onClick,
	selectedValue,
}) => {
	return (
		<div
			className={cn(
				className,
				'flex justify-between bg-violet-200 rounded-lg select-none'
			)}
		>
			{items.map((item) => (
				<button
					key={item.value}
					onClick={() => onClick?.(item.value)}
					className={cn(
						'flex items-center justify-center h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
						{
							'bg-white shadow': item.value === selectedValue,
							'text-gray-500 opacity-50 pointer-events-none': item.disabled,
						}
					)}
				>
					{item.name}
				</button>
			))}
		</div>
	);
};
