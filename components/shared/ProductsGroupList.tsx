'use client';
import React, { useEffect, useRef } from 'react';
import { Title } from './Title';
import { cn } from '@/lib/utils';
import { ProductCard } from './ProductCard';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/store/category';
import { Product } from '@prisma/client';

interface Props {
	title: string;
	items: Product[];
	categoryId: number;
	className?: string;
	listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
	title,
	items,
	categoryId,
	className,
	listClassName,
}) => {
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
	const intersectionRef = useRef(null);
	const intersecting = useIntersection(intersectionRef, {
		threshold: 0.4,
	});

	useEffect(() => {
		if (intersecting?.isIntersecting) {
			setActiveCategoryId(categoryId);
		}
	}, [intersecting?.isIntersecting, title, categoryId]);

	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title text={title} size='lg' className='font-extrabold mb-5' />

			<div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
				{items.map((product) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						price={product?.variants[0]?.price || 0}
						imageUrl={product.imageUrl}
					/>
				))}
			</div>
		</div>
	);
};
