'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store/category';
import { Category } from '@prisma/client';

interface Props {
	categories: Category[];
	className?: string;
}

export const Categories: React.FC<Props> = ({ categories, className }) => {
	const categoryActiveId = useCategoryStore((state) => state.activeId);
	const setActiveCategory = useCategoryStore((state) => state.setActiveId);

	const handleCategoryClick = (categoryId: number, categoryName: string) => {
		const targetElement = document.getElementById(categoryName);

		if (targetElement) {
			const elementRect = targetElement.getBoundingClientRect();
			const offsetPosition = elementRect.top + window.pageYOffset - 250;

			targetElement.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
			});

			scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			});
		}

		setActiveCategory(categoryId);
	};

	return (
		<div
			className={cn(
				'inline-flex gap-2 bg-violet-200 p-1 rounded-2xl',
				className
			)}
		>
			{categories.map((category, index) => (
				<div
					className={cn(
						'flex items-center font-bold h-11 rounded-2xl px-5 text-black',
						categoryActiveId === category.id &&
							'bg-white shadow-md shadow-violet-700 text-primary'
					)}
					key={index}
				>
					<button
						onClick={() => handleCategoryClick(category.id, category.name)}
					>
						{category.name}
					</button>
				</div>
			))}
		</div>
	);
};
