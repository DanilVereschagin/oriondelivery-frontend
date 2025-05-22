'use client';

import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	XAxis,
	YAxis,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
	count: {
		label: 'count',
		color: '#6d28d9',
	},
	label: {
		color: 'hsl(var(--background))',
	},
} satisfies ChartConfig;

interface ChartBarProps {
	title: string;
	chartData: {
		product: string;
		count: number;
	}[];
}

export function ChartBar({ title, chartData }: ChartBarProps) {
	const numberOfProducts = chartData.length;
	const barHeight = 50;
	const chartHeight = numberOfProducts * barHeight + 50;

	return (
		<Card className='mb-10 p-4'>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent
				style={{
					height: chartHeight,
					minHeight: chartHeight,
					maxHeight: chartHeight,
				}}
			>
				<ChartContainer
					config={chartConfig}
					style={{
						height: chartHeight,
						minHeight: chartHeight,
						maxHeight: chartHeight,
					}}
				>
					<BarChart
						accessibilityLayer
						data={chartData}
						layout='vertical'
						margin={{
							right: 10,
						}}
						height={chartHeight}
						barSize={chartHeight}
						maxBarSize={chartHeight}
					>
						<CartesianGrid horizontal={false} />
						<YAxis
							dataKey='product'
							type='category'
							tickLine={false}
							tickMargin={20}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
							hide
						/>
						<XAxis dataKey='count' type='number' hide />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator='line' />}
						/>
						<Bar
							dataKey='count'
							layout='vertical'
							fill='var(--color-count)'
							radius={4}
							barSize={barHeight}
						>
							<LabelList
								dataKey='product'
								position='insideLeft'
								offset={8}
								className='fill-[--color-label]'
								fontSize={12}
								style={{ fill: 'white' }}
							/>
							<LabelList
								dataKey='count'
								position='right'
								offset={8}
								className='fill-foreground'
								fontSize={12}
								style={{ fill: 'white' }}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
