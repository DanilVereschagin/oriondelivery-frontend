'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
	count: {
		label: 'Продажи',
	},
	Пицца: {
		label: 'Пицца',
		color: 'hsl(var(--chart-1))',
	},
	Завтраки: {
		label: 'Завтраки',
		color: 'hsl(var(--chart-2))',
	},
	Комбо: {
		label: 'Комбо',
		color: 'hsl(var(--chart-3))',
	},
	Закуски: {
		label: 'Закуски',
		color: 'hsl(var(--chart-4))',
	},
	Супы: {
		label: 'Супы',
		color: 'hsl(var(--chart-5))',
	},
	Соусы: {
		label: 'Соусы',
		color: 'hsl(var(--chart-6))',
	},
	Десерты: {
		label: 'Десерты',
		color: 'hsl(var(--chart-7))',
	},
	Напитки: {
		label: 'Напитки',
		color: 'hsl(var(--chart-8))',
	},
} satisfies ChartConfig;

interface ChartPieProps {
	sum: number;
	chartData: {
		category: string;
		count: number;
		fill: string;
	}[];
}

export function ChartPie({ sum, chartData }: ChartPieProps) {
	return (
		<Card className='flex flex-col'>
			<CardHeader className='items-center pb-0'>
				<CardTitle>Список продаж по категориям</CardTitle>
			</CardHeader>
			<CardContent className='flex-1 pb-0'>
				<ChartContainer
					config={chartConfig}
					className='mx-auto aspect-square max-h-[250px]'
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey='count'
							nameKey='category'
							innerRadius={60}
							strokeWidth={5}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor='middle'
												dominantBaseline='middle'
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className='fill-foreground text-3xl font-bold'
												>
													{sum.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className='fill-muted-foreground text-primary '
												>
													Продаж
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
