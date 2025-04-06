import React from 'react';
import { Title } from '../Title';
import { Product } from '@prisma/client';
import { cn } from '@/shared/lib/utils';
import { ProductImage } from '../ProductImage';
import { Button } from '@/components/ui';
import { Plus } from 'lucide-react';
import { GroupVariants } from '../GroupVariants';
import { pizzaSizes } from '@/shared/constants/pizza';

interface Props {
	className?: string;
	product: Product;
	onClickAdd?: () => void;
}

export const ProductForm: React.FC<Props> = ({
	className,
	product,
	onClickAdd,
}) => {
	const info = '40см, тонкое тесто, 630 грамм';
	const isPizza = Boolean(product.variants[0]?.pizzaType);

	return (
		<div className={cn(className, 'flex flex-1')}>
			<ProductImage
				src={product.imageUrl}
				alt={product.name}
				size={40}
				isPizza={isPizza}
			/>

			<div className='w-[490px] p-7 rounded-lg'>
				<Title text={product.name} size='md' className='font-bold' />

				<p className='text-violet-400'>{info}</p>

				<GroupVariants items={pizzaSizes} />

				<Button className='h-[55px] px-10 mt-10 text-base w-full rounded-lg'>
					<Plus className='w-5 h-5 mr-1' />
					Добавить в корзину за {product?.variants[0]?.price || 0} ₽
				</Button>
			</div>
		</div>
	);
};
