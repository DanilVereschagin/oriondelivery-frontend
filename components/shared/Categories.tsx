'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';

interface Props {
	className?: string;
}

const categories = [
	{
		id: 1,
		name: 'Пицца',
	},
	{
		id: 2,
		name: 'Завтраки',
	},
	{
		id: 3,
		name: 'Комбо',
	},
	{
		id: 4,
		name: 'Закуски',
	},
	{
		id: 5,
		name: 'Салаты',
	},
	{
		id: 6,
		name: 'Супы',
	},
	{
		id: 7,
		name: 'Десерты',
	},
	{
		id: 8,
		name: 'Напитки',
	},
];

export const Categories: React.FC<Props> = ({ className }) => {
	const categotyActiveId = useCategoryStore((state) => state.activeId);
	return (
		<div
			className={cn(
				'inline-flex gap-2 bg-violet-200 p-1 rounded-2xl',
				className
			)}
		>
			{categories.map((category, index) => (
				<a
					className={cn(
						'flex items-center font-bold h-11 rounded-2xl px-5 ',
						categotyActiveId === category.id &&
							'bg-white shadow-md shadow-violet-700 text-primary'
					)}
					href={`/#${category.name}`}
					key={index}
				>
					<button>{category.name}</button>
				</a>
			))}
		</div>
	);
};
