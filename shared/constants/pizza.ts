export const pizzaSize = {
	30: 'Маленькая',
	35: 'Средняя',
	40: 'Большая',
} as const;

export const pizzaType = {
	1: 'Тонкое',
	2: 'Традиционное',
} as const;

export const pizzaSizes = Object.entries(pizzaSize).map(([value, name]) => ({
	name,
	value,
}));

export const pizzaTypes = Object.entries(pizzaType).map(([value, name]) => ({
	name,
	value,
}));

export type PizzaSize = keyof typeof pizzaSize;
export type PizzaType = keyof typeof pizzaType;
