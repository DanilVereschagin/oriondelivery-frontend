import React from 'react';
import { Container } from '../Container';
import { ChartPie } from '@/components/ui/charts/chart-pie';
import { Title } from '../Title';
import {
	getCount,
	getCountByCategory,
	getProductByCategory,
} from '@/services/statistics';
import {
	convertStatisticsToCategoryChart,
	convertToCategoryStat,
} from '@/shared/lib/chart';
import { AdminCategoryStats } from './AdminCategoryStats';

interface Props {
	className?: string;
}

export const AdminStatistics: React.FC<Props> = async ({ className }) => {
	const sum = await getCount();
	const countByCategory = await getCountByCategory();
	const productsByCategory = await getProductByCategory();

	const partsOfChart = await convertStatisticsToCategoryChart(countByCategory!);
	const chartData = await convertToCategoryStat(productsByCategory!);

	return (
		<Container className={className}>
			<Title size='xl' text='Статистика' className='font-bold' />
			<ChartPie chartData={partsOfChart} sum={sum!} />
			<AdminCategoryStats chartData={chartData} className='mt-10' />
		</Container>
	);
};
