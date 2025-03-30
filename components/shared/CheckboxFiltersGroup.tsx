'use client';

import React, { useEffect } from 'react';
import { FilterCheckbox, FilterCheckboxProps } from './FilterCheckbox';
import { Input, Skeleton } from '../ui';

type Item = FilterCheckboxProps;

interface Props {
	title: string;
	items: Item[];
	defaultItems?: Item[];
	limit?: number;
	loading?: boolean;
	searchInputPlaceholder?: string;
	onClickCheckbox?: (id: string) => void;
	selectedValues?: Set<string>;
	name?: string;
	className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 6,
	loading,
	searchInputPlaceholder = 'Поиск...',
	onClickCheckbox,
	selectedValues,
	name,
	className,
}) => {
	const [showAll, setShowAll] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState('');
	const [sortedItems, setSortedItems] = React.useState<Item[]>([]);
	const effectiveLimitRef = React.useRef(limit);

	useEffect(() => {
		const selectedCount = selectedValues?.size || 0;
		const minRequiredLimit = Math.max(limit, selectedCount);

		effectiveLimitRef.current = minRequiredLimit;

		const newItems = [
			...items.filter((item) => selectedValues?.has(item.value)),
			...items.filter((item) => !selectedValues?.has(item.value)),
		];

		setSortedItems(newItems);
	}, [items, limit]);

	if (loading) {
		return (
			<div className={className}>
				<p className='font-bold mb-3'>{title}</p>
				{...Array(limit)
					.fill(0)
					.map((_, index) => (
						<Skeleton key={index} className='bg-violet-200 h-6 mb-5' />
					))}
			</div>
		);
	}

	const list = showAll
		? sortedItems.filter((item) =>
				item.text.toLowerCase().includes(searchValue.toLowerCase())
		  )
		: (defaultItems || sortedItems).slice(0, effectiveLimitRef.current);

	const onChangeSearchInput = (value: string) => {
		setSearchValue(value);
	};

	return (
		<div className={className}>
			<p className='font-bold mb-3'>{title}</p>

			{showAll && (
				<div className='mb-5'>
					<Input
						onChange={(e) => onChangeSearchInput(e.target.value)}
						placeholder={searchInputPlaceholder}
						className='bg-violet-50 border-none'
					/>
				</div>
			)}

			<div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
				{list.map((item, index) => (
					<FilterCheckbox
						onCheckedChange={() => onClickCheckbox?.(item.value)}
						checked={selectedValues?.has(item.value)}
						key={index}
						value={item.value}
						text={item.text}
						endAdornment={item.endAdornment}
						name={name}
					/>
				))}
			</div>

			{items.length > effectiveLimitRef.current && (
				<div className={showAll ? 'border-t border-t-violet-200 mt-4' : ''}>
					<button
						onClick={() => setShowAll(!showAll)}
						className='text-primary mt-3'
					>
						{showAll ? 'Скрыть' : 'Показать все'}
					</button>
				</div>
			)}
		</div>
	);
};
