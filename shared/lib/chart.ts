import { ProductStatistics } from '@prisma/client';

interface ChartItem {
	_sum: {
		count: number | null;
	};
	categoryId: number;
}

const getCategoryName = (id: number) => {
	switch (id) {
		case 1:
			return 'Пицца';
		case 2:
			return 'Завтраки';
		case 3:
			return 'Комбо';
		case 4:
			return 'Закуски';
		case 5:
			return 'Супы';
		case 6:
			return 'Соусы';
		case 7:
			return 'Десерты';
		case 8:
			return 'Напитки';
	}
};

export const convertStatisticsToCategoryChart = async (charts: ChartItem[]) => {
	let chartData = [
		{ category: 'Пицца', count: 0, fill: '#a78bfa' },
		{ category: 'Завтраки', count: 0, fill: '#7c3aed' },
		{ category: 'Комбо', count: 0, fill: '#8b5cf6' },
		{ category: 'Закуски', count: 0, fill: '#6d28d9' },
		{ category: 'Супы', count: 0, fill: '#4c1d95' },
		{ category: 'Соусы', count: 0, fill: '#5b21b6' },
		{ category: 'Десерты', count: 0, fill: '#7e22ce' },
		{ category: 'Напитки', count: 0, fill: '#a855f7' },
	];

	charts.forEach((chart) => {
		if (chart._sum.count) {
			chartData = chartData.map((item) => {
				if (item.category === getCategoryName(chart.categoryId)) {
					return { ...item, count: item.count + chart._sum.count! };
				}
				return item;
			});
		}
	});
	return chartData;
};

export const convertToCategoryStat = async (charts: ProductStatistics[]) => {
	const chartData = {
		Пицца: [],
		Завтраки: [],
		Комбо: [],
		Закуски: [],
		Супы: [],
		Соусы: [],
		Десерты: [],
		Напитки: [],
	};

	charts.map((chart) => {
		chartData[getCategoryName(chart.categoryId)].push({
			product: chart.name,
			count: chart.count,
		});
	});

	return chartData;
};
