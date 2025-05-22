'use client';

import React, { Fragment } from 'react';
import { Container } from '../Container';
import { Title } from '../Title';
import { useAdminStore } from '@/shared/store/admin';
import { categories } from '@/prisma/constants';
import { Button } from '@/components/ui';
import { cn } from '@/shared/lib/utils';
import { ChartBar } from '@/components/ui/charts/chart-bar';

interface Props {
	chartData: {
		Пицца: {
			product: string;
			count: number;
		}[];
		Завтраки: {
			product: string;
			count: number;
		}[];
		Комбо: {
			product: string;
			count: number;
		}[];
		Закуски: {
			product: string;
			count: number;
		}[];
		Супы: {
			product: string;
			count: number;
		}[];
		Соусы: {
			product: string;
			count: number;
		}[];
		Десерты: {
			product: string;
			count: number;
		}[];
		Напитки: {
			product: string;
			count: number;
		}[];
	};
	className?: string;
}

export const AdminCategoryStats: React.FC<Props> = ({
	className,
	chartData,
}) => {
	const { page } = useAdminStore();

	const categoryList = categories;

	return (
		<Container className={className}>
			<Title size='lg' text='По категориям' className='font-bold' />
			<div className='w-fit flex flex-row gap-4 mt-4 mb-4 border border-violet-700 rounded-2xl p-2'>
				{categoryList.map((category) => (
					<div
						key={category.name}
						className='flex flex-col items-center justify-center'
					>
						<Button
							type='button'
							size='lg'
							onClick={() => useAdminStore.setState({ page: category.name })}
							className={cn('font-bold bg-violet-400 text-white', {
								'bg-violet-700 text-white': page === category.name,
							})}
						>
							{category.name}
						</Button>
					</div>
				))}
			</div>
			{categories.map((category) => (
				<Fragment key={category.name}>
					{page === category.name! && (
						<ChartBar
							title={category.name}
							chartData={chartData[category.name as keyof typeof chartData]}
						/>
					)}
				</Fragment>
			))}
		</Container>
	);
};
