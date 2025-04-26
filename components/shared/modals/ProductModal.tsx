'use client';

import { Dialog } from '@/components/ui';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import React from 'react';
import { Product } from '@prisma/client';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { ProductForm } from '../forms';
import { useCartStore } from '@/shared/store/cart';
import { AddCartItem } from '@/services/cart';
import toast from 'react-hot-toast';

interface Props {
	className?: string;
	product: Product;
}

export const ProductModal: React.FC<Props> = ({ className, product }) => {
	const router = useRouter();
	const { addCartItem, loading } = useCartStore((state) => state);

	const addToCart = async (data: AddCartItem) => {
		if (Boolean(product.category.name === 'Пицца')) {
			try {
				await addCartItem({
					productVariantId: data.productVariantId,
					ingredients: data.ingredients,
				});
				toast.success('Пицца добавлена в корзину');
			} catch (error) {
				toast.error('Не удалось добавить пиццу в корзину');
				console.error(error);
			}
		} else {
			try {
				await addCartItem({
					productVariantId: data.productVariantId,
				});
				toast.success('Товар добавлен в корзину');
			} catch (error) {
				toast.error('Не удалось добавить товар в корзину');
				console.error(error);
			}
		}
		router.back();
	};

	return (
		<Dialog
			open={Boolean(product)}
			onOpenChange={() => {
				router.back();
			}}
		>
			<DialogTitle hidden>Добавить товар в корзину</DialogTitle>
			<DialogContent
				className={cn(
					className,
					'p-0 2-[1060px] max-w-[1060px] min-h-[500px] overflow-hidden'
				)}
			>
				<ProductForm
					className='p-6'
					loading={loading}
					product={product}
					onClickAdd={addToCart}
				/>
			</DialogContent>
		</Dialog>
	);
};
