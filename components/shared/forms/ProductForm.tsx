'use client';

import React, { useEffect, useState } from 'react';
import { Title } from '../Title';
import { Ingredient as IngredientType, Product } from '@prisma/client';
import { cn } from '@/shared/lib/utils';
import { ProductImage } from '../ProductImage';
import { Button } from '@/components/ui';
import { PictureInPicture, Plus } from 'lucide-react';
import { GroupVariants } from '../GroupVariants';
import {
	PizzaSize,
	pizzaSizes,
	pizzaType,
	PizzaType,
	pizzaTypes,
} from '@/shared/constants/pizza';
import { Ingredient } from '../Ingredient';
import { useSet } from 'react-use';
import { AddCartItem } from '@/services/cart';
import { getAll } from '@/services/ingredients';
import { convertIngredientsToString } from '@/shared/lib/convert-ingredients-to-string';
import classes from '@/components/style/Slide.module.scss';

interface Props {
	className?: string;
	product: Product;
	onClickAdd: (data: AddCartItem) => void;
	loading?: boolean;
}

export const ProductForm: React.FC<Props> = ({
	className,
	product,
	onClickAdd,
	loading,
}) => {
	const isPizza = Boolean(product.category.name === 'Пицца');
	const [size, setSize] = useState<PizzaSize>(product.variants[0]?.size);
	const [type, setType] = useState<PizzaType>(product.variants[0]?.pizzaType);
	const [ingredients, setIngredients] = useState<IngredientType[]>([]);

	let info = '';
	const [selectedIngredients, { toggle: toggleSelectedIngredients }] = useSet(
		new Set<number>([])
	);

	if (isPizza) {
		info = `${size} см, ${pizzaType[type]} тесто, 630 грамм, `;
		info += convertIngredientsToString(product.ingredients);
	} else {
		info = `630 грамм`;
	}

	let productPrice = 0;
	let ingredientsPrice = 0;

	if (isPizza) {
		productPrice = product.variants?.find(
			(variant) => variant.size === size && variant.pizzaType === type
		)?.price;
		ingredientsPrice = ingredients
			?.filter((ingredient: IngredientType) =>
				selectedIngredients.has(ingredient.id)
			)
			.reduce((acc, curr) => acc + curr.price, 0);
	} else {
		productPrice = product.variants[0]?.price;
	}

	const totalPrice = productPrice + ingredientsPrice;

	const availablePizzas = product.variants?.filter(
		(variant) => variant.pizzaType === type
	);
	const availablePizzaSizes = pizzaSizes.map((item) => ({
		name: item.name,
		value: item.value,
		disabled: !availablePizzas?.some(
			(variant) => Number(variant.size) === Number(item.value)
		),
	}));

	const fetchIngredients = async () => {
		const ingredients = await getAll();

		if (!isPizza) {
			return;
		}

		setIngredients(
			ingredients.filter((ingredient) => {
				return product.ingredients.every(
					(productIngredient: IngredientType) =>
						productIngredient.id !== ingredient.id
				);
			})
		);
	};

	useEffect(() => {
		fetchIngredients();
	}, [product]);

	useEffect(() => {
		const currentSize = availablePizzas?.find(
			(variant) => Number(variant.size) === Number(size)
		);
		const availableSize = availablePizzaSizes?.find((item) => !item.disabled);
		if (availableSize && !currentSize) {
			setSize(Number(availableSize.value) as PizzaSize);
		}
	}, [type]);

	const handleAddToCart = () => {
		let varId = product.variants[0]?.id;

		if (isPizza) {
			varId = product.variants?.find(
				(variant) => variant.size === size && variant.pizzaType === type
			)?.id;
		}

		onClickAdd({
			productVariantId: varId,
			ingredients: Array.from(selectedIngredients),
		});
	};

	return (
		<div className={cn(className, 'flex flex-1 h-[100%]')}>
			<ProductImage
				className={classes.slide_in_left_normal}
				src={product.imageUrl}
				alt={product.name}
				size={size}
				isPizza={isPizza}
			/>

			<div
				className={cn(
					classes.slide_in_right_normal,
					'w-[490px] p-7 rounded-lg bg-violet-100'
				)}
			>
				<Title text={product.name} size='md' className='font-bold text-black' />

				<p className='text-violet-400 text-ellipsis line-clamp-2'>{info}</p>

				{isPizza && (
					<div className='mt-5 flex flex-col gap-4'>
						<GroupVariants
							items={availablePizzaSizes}
							selectedValue={String(size)}
							onClick={(selectedValue) =>
								setSize(Number(selectedValue) as PizzaSize)
							}
						/>

						<GroupVariants
							items={pizzaTypes}
							selectedValue={String(type)}
							onClick={(selectedValue) =>
								setType(Number(selectedValue) as PizzaType)
							}
						/>
					</div>
				)}

				<div className='p-5 h-[420px] overflow-auto scrollbar'>
					<div className='grid grid-cols-3 gap-3'>
						{ingredients.map((ingredient: IngredientType) => (
							<Ingredient
								key={ingredient.id}
								name={ingredient.name}
								imageUrl={ingredient.imageUrl}
								price={ingredient.price}
								active={selectedIngredients.has(ingredient.id)}
								onClick={() => toggleSelectedIngredients(ingredient.id)}
							/>
						))}
					</div>
				</div>

				<div className='flex flex-row items-center gap-4 mt-10'>
					<Button
						loading={loading}
						variant={'outline'}
						onClick={handleAddToCart}
						className='h-[55px] rounded-lg'
					>
						<PictureInPicture className='w-5 h-5 mr-1' />
						Перейти на страницу товара
					</Button>
					<Button
						loading={loading}
						onClick={handleAddToCart}
						className='h-[55px] rounded-lg'
					>
						<Plus className='w-5 h-5 mr-1' />
						Добавить в корзину за {totalPrice || 0} ₽
					</Button>
				</div>
			</div>
		</div>
	);
};
