'use client';
import React, { useEffect, useRef } from 'react';
import { Title } from './Title';
import { ProductCard } from './ProductCard';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/shared/store/category';
import { Product } from '@prisma/client';
import { convertIngredientsToString } from '@/shared/lib/convert-ingredients-to-string';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import { NextButton, PrevButton } from './buttons/PrevNextButton';
import { cn } from '@/shared/lib/utils';

interface Props {
	title: string;
	items: Product[];
	categoryId: number;
	className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
	title,
	items,
	categoryId,
	className,
}) => {
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
	const intersectionRef = useRef(null);
	const sectionRef = useRef<HTMLDivElement>(null);
	const [isIntersecting, setIsIntersecting] = React.useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsIntersecting(true);
					setActiveCategoryId(categoryId);
				} else {
					setIsIntersecting(false);
				}
			},
			{
				rootMargin: '-50px 0px 0px 0px',
				threshold: 0.4,
			}
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current);
			}
		};
	}, [categoryId, setActiveCategoryId]);

	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title text={title} size='lg' className='font-extrabold mb-5' />

			<Carousel
				opts={{
					align: 'start',
				}}
				className='ml-12 max-w-[1000px]'
			>
				<CarouselContent className='-ml-1'>
					{items.map((product, index) => (
						<CarouselItem
							key={product.id}
							className={cn('flex gap-1 basis-1/3')}
						>
							<ProductCard
								className={'w-full'}
								key={product.id}
								id={product.id}
								name={product.name}
								price={product?.variants[0]?.price || 0}
								imageUrl={product.imageUrl}
								ingredients={convertIngredientsToString(product?.ingredients)}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<PrevButton />
				<NextButton />
			</Carousel>
		</div>
	);
};
