'use client';

import { convertIngredientsToString } from '@/shared/lib/convert-ingredients-to-string';
import {
	PizzaSize,
	pizzaSizes,
	pizzaType,
	PizzaType,
	pizzaTypes,
} from '@/shared/constants/pizza';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { GroupVariants } from '@/components/shared/GroupVariants';
import { ProductImage } from '@/components/shared/ProductImage';
import { Title } from '../Title';
import { AddCartItem } from '@/services/cart';
import { Ingredient as IngredientType, Product } from '@prisma/client';
import { FC, useEffect, useState } from 'react';
import { useSet } from 'react-use';
import { useCartStore } from '@/shared/store/cart';
import toast from 'react-hot-toast';
import { getAll } from '@/services/ingredients';
import { Button } from '@/components/ui';
import { Plus } from 'lucide-react';
import { Ingredient } from '../Ingredient';
import classes from '@/components/style/Roll.module.scss';

interface Props {
	className?: string;
	product: Product;
}

export const ProductPageForm: FC<Props> = ({ className, product }) => {
	const isPizza = Boolean(product.variants[0]?.pizzaType);
	const [size, setSize] = useState<PizzaSize>(product.variants[0]?.size);
	const [type, setType] = useState<PizzaType>(product.variants[0]?.pizzaType);
	const [ingredients, setIngredients] = useState<IngredientType[]>([]);
	const [selectedIngredients, { toggle: toggleSelectedIngredients }] = useSet(
		new Set<number>([])
	);
	const { addCartItem, loading } = useCartStore((state) => state);

	let info = '';

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
	};

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

		addToCart({
			productVariantId: varId,
			ingredients: Array.from(selectedIngredients),
		});
	};

	return (
		<>
			<div className='flex flex-col flex-1 p-6'>
				<div className='w-[700px] bg-violet-100 p-7 rounded-lg'>
					<Title
						text={product.name}
						size='md'
						className='font-extrabold mb-1 text-black'
					/>

					<p className='text-violet-400'>{info}</p>

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

					<div className='w-[700px] h-[500px] flex items-center justify-center'>
						<ProductImage
							imageClassName={ isPizza ? classes.roll_in_left_normal : ''}
							src={product.imageUrl}
							alt={product.name}
							size={size}
							isPizza={isPizza}
						/>
					</div>

					{isPizza && (
						<div className='p-5 mt-4 h-[420px] overflow-auto scrollbar'>
							<div className='grid grid-cols-4 gap-3'>
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
					)}

					<Button
						loading={loading}
						onClick={handleAddToCart}
						className='h-[55px] px-10 mt-10 text-base w-full rounded-lg'
					>
						<Plus className='w-5 h-5 mr-1' />
						Добавить в корзину за {totalPrice || 0} ₽
					</Button>
				</div>
			</div>
			<div className='flex flex-1 p-6'>
				<div className='w-[700px] p-7 rounded-lg'>
					<div className='w-[600px] h-[400px] flex items-center justify-center bg-violet-700 mb-20'>
						Оставить отзыв
					</div>

					<Title text={'Отзывы'} size='md' className='font-extrabold mb-1' />

					<Carousel
						opts={{
							align: 'start',
						}}
						orientation='vertical'
						className='w-full max-w-[100%]'
					>
						<CarouselContent className='-mt-1 h-[500px]'>
							{Array.from({ length: 5 }).map((_, index) => (
								<CarouselItem
									key={index}
									className='pt-1 w-full h-full basis-1/3'
								>
									<div className='p-1 h-1/3'>
										<div className='bg-violet-700 rounded-lg'>
											<div className='flex items-center justify-center p-6'>
												<span className='text-xl font-semibold'>
													{index + 1}
													<div>q</div>
												</span>
											</div>
										</div>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</div>
		</>
	);
};
