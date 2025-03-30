'use client';
import React, { useEffect } from 'react';
import { Title } from './Title';
import { FilterCheckbox } from './FilterCheckbox';
import { Input } from '../ui';
import { RangeSlider } from './RangeSlider';
import { CheckboxFiltersGroup } from './CheckboxFiltersGroup';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import { usePriceStore } from '@/store/price';
import { useDebounce, useSet } from 'react-use';
import qs from 'qs';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
	className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { ingredients, selectedIngredients, onSelectId, onAdd } =
		useFilterIngredients();
	const { priceFrom, priceTo, setPriceFrom, setPriceTo } = usePriceStore();
	const [sizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(
			searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []
		)
	);
	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
		new Set<string>(
			searchParams.has('pizzaTypes')
				? searchParams.get('pizzaTypes')?.split(',')
				: []
		)
	);

	useEffect(() => {
		setPriceFrom(Number(searchParams.get('priceFrom') || 0));
		setPriceTo(Number(searchParams.get('priceTo') || 0));

		const items = searchParams.get('ingredients')?.split(',');

		if (items) {
			for (const item of items) {
				onAdd(item);
			}
		}
	}, [onAdd, searchParams, setPriceFrom, setPriceTo]);

	useDebounce(
		() => {
			const query = {
				priceFrom,
				priceTo,
				sizes: Array.from(sizes),
				pizzaTypes: Array.from(pizzaTypes),
				ingredients: Array.from(selectedIngredients),
			};

			const queryString = qs.stringify(query, {
				arrayFormat: 'comma',
			});

			router.push(`?${queryString}`, { scroll: false });
		},
		200,
		[priceFrom, priceTo, selectedIngredients, sizes, pizzaTypes]
	);

	return (
		<div className={className}>
			<Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

			<div className='flex flex-col gap-4'>
				<FilterCheckbox text='Можно собрать' value='1' />
				<FilterCheckbox text='Новинки' value='2' />
			</div>

			<div className='mt-5 border-y border-y-violet-200 py-6 pb-7'>
				<p className='font-bold mb-3'>Цена от и до:</p>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder='0'
						min={0}
						max={10000}
						value={priceFrom}
						onChange={(e) => setPriceFrom(+e.target.value)}
					/>
					<Input
						type='number'
						placeholder='10000'
						min={0}
						max={10000}
						value={priceTo}
						onChange={(e) => setPriceTo(+e.target.value)}
					/>
				</div>

				<RangeSlider
					min={0}
					max={10000}
					step={10}
					value={[priceFrom || 0, priceTo || 10000]}
					onValueChange={([from, to]) => {
						setPriceFrom(from);
						setPriceTo(to);
					}}
				/>
			</div>

			<CheckboxFiltersGroup
				title='Тип теста'
				className='mt-5'
				items={[
					{
						text: 'Тонкое',
						value: '1',
					},
					{
						text: 'Традиционное',
						value: '2',
					},
				]}
				onClickCheckbox={togglePizzaTypes}
				selectedValues={pizzaTypes}
				name='pizzaTypes'
			/>

			<CheckboxFiltersGroup
				title='Размеры пиццы'
				className='mt-5'
				items={[
					{
						text: '30см',
						value: '30',
					},
					{
						text: '35см',
						value: '35',
					},
					{
						text: '40см',
						value: '40',
					},
				]}
				onClickCheckbox={toggleSizes}
				selectedValues={sizes}
				name='sizes'
			/>

			<CheckboxFiltersGroup
				title='Ингредиенты'
				className='mt-5'
				limit={6}
				items={ingredients}
				loading={ingredients.length === 0}
				onClickCheckbox={onSelectId}
				selectedValues={selectedIngredients}
				name='ingredients'
			/>
		</div>
	);
};
