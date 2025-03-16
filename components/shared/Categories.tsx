import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
	className?: string;
}

const categories = [
	'Пицца',
	'Комбо',
	'Закуски',
	'Салаты',
	'Супы',
	'Коктели',
	'Кофе',
	'Напитки',
	'Десерты',
];
const selectedCategory = 0;

export const Categories: React.FC<Props> = ({ className }) => {
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
						selectedCategory === index &&
							'bg-white shadow-md shadow-violet-700 text-primary'
					)}
					key={index}
				>
					<button>{category}</button>
				</a>
			))}
		</div>
	);
};
