const pizzaSize = {
	30: 'Маленькая',
	35: 'Средняя',
	40: 'Большая',
} as const;

const pizzaType = {
	1: 'Тонкое',
	2: 'Традиционное',
} as const;

export const pizzaSizes = Object.entries(pizzaSize).map(([value, name]) => ({
	name,
	value,
}));
