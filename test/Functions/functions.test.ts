import { convertIngredients, convertCart, bePromocode } from './functions';

describe('Functions', () => {
	test('convertIngredients', () => {
		const ingredients = [
			{
				name: 'Мука',
				id: 1,
				price: 100,
				imageUrl: 'https://example.com',
				createdAt: new Date(),
				updateAt: new Date(),
			},
			{
				name: 'Сахар',
				id: 2,
				price: 100,
				imageUrl: 'https://example.com',
				createdAt: new Date(),
				updateAt: new Date(),
			},
			{
				name: 'Яблоки',
				id: 3,
				price: 100,
				imageUrl: 'https://example.com',
				createdAt: new Date(),
				updateAt: new Date(),
			},
		];
		const result = convertIngredients(ingredients);
		expect(result).toBe('Мука, Сахар, Яблоки');
	});

	test('convertToCart', () => {
		const cart = {
			id: 3,
			userId: 8,
			token: '9f680c8b-9c21-4afc-ae2e-537b90c8ddb1',
			totalAmount: 465,
			createdAt: '2025-05-22T21:16:25.511Z',
			updateAt: '2025-05-25T00:55:00.106Z',
			cartItems: [
				{
					id: 4,
					productVariantId: 1,
					cartId: 3,
					quantity: 1,
					createdAt: '2025-05-25T00:55:00.101Z',
					updateAt: '2025-05-25T00:55:00.101Z',
					productVariant: {
						id: 1,
						price: 465,
						size: 30,
						pizzaType: 1,
						productId: 1,
						createdAt: '2025-05-22T15:28:30.949Z',
						updateAt: '2025-05-22T15:28:30.949Z',
						product: {
							id: 1,
							name: 'Чилл Грилл',
							imageUrl: '/assets/Pizza/Чилл_Грилл.avif',
							categoryId: 1,
							createdAt: '2025-05-22T15:28:30.925Z',
							updateAt: '2025-05-22T15:28:30.925Z',
						},
					},
					ingredients: [],
				},
			],
		};
		const result = convertCart(cart);
		expect(result).toEqual({
			cartItems: [
				{
					id: 4,
					quantity: 1,
					name: 'Чилл Грилл',
					imageUrl: '/assets/Pizza/Чилл_Грилл.avif',
					price: 465,
					size: 30,
					pizzaType: 1,
					ingredients: [],
				},
			],
			totalAmount: 465,
		});
	});

	test('bePromocode', async () => {
		const code = 'TEST';
		const result = await bePromocode(code);
		expect(result).toBe(true);
	});
});
