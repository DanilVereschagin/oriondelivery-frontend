'use client';

import { Dialog } from '@/components/ui';
import { DialogContent } from '@/components/ui/dialog';
import React from 'react';
import { Product } from '@prisma/client';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { ProductForm } from '../forms';
import { useCartStore } from '@/shared/store/cart';
import { AddCartItem } from '@/services/cart';

interface Props {
	className?: string;
	product: Product;
}

export const ProductModal: React.FC<Props> = ({ className, product }) => {
	const router = useRouter();
	const { addCartItem } = useCartStore((state) => state);

	const addToCart = (data: AddCartItem) => {
		if (Boolean(product.category.name === 'Пицца')) {
			addCartItem({
				productVariantId: data.productVariantId,
				ingredients: data.ingredients,
			});
		} else {
			addCartItem({
				productVariantId: data.productVariantId,
			});
		}
		router.back();
	};

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					className,
					'p-0 2-[1060px] max-w-[1060px] min-h-[500px] overflow-hidden'
				)}
			>
				<ProductForm className='p-6' product={product} onClickAdd={addToCart} />
			</DialogContent>
		</Dialog>
	);
};
