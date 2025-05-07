export const deliveryType = {
	DEFAULT: { name: 'Стандарт', price: 39 },
	COMET: { name: 'Комета', price: 99 },
	LIGHT: { name: 'Свет', price: 199 },
} as const;

export const deliveryTypes = Object.entries(deliveryType).map(
	([value, name]) => ({
		name,
		value,
	})
);

export type DeliveryType = keyof typeof deliveryType;
