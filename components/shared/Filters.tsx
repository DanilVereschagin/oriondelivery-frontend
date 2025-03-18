import React from 'react';
import { Title } from './Title';
import { FilterCheckbox } from './FilterCheckbox';
import { Input } from '../ui';
import { RangeSlider } from './RangeSlider';
import { CheckboxFiltersGroup } from './CheckboxFiltersGroup';

interface Props {
	className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
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
						defaultValue={0}
					/>
					<Input type='number' placeholder='10000' min={0} max={10000} />
				</div>

				<RangeSlider min={0} max={10000} step={10} value={[0, 10000]} />
			</div>

			<CheckboxFiltersGroup
				title='Ингредиенты'
				className='mt-5'
				limit={6}
				defaultItems={[
					{ text: 'Сыр', value: '1' },
					{ text: 'Курица', value: '2' },
					{ text: 'Салат', value: '3' },
					{ text: 'Бекон', value: '4' },
					{ text: 'Помидор', value: '5' },
					{ text: 'Солёные огурцы', value: '6' },
				]}
				items={[
					{ text: 'Сыр', value: '1' },
					{ text: 'Курица', value: '2' },
					{ text: 'Салат', value: '3' },
					{ text: 'Бекон', value: '4' },
					{ text: 'Помидор', value: '5' },
					{ text: 'Солёные огурцы', value: '6' },
					{ text: 'Грибы', value: '7' },
					{ text: 'Креветки', value: '8' },
				]}
			/>
		</div>
	);
};
