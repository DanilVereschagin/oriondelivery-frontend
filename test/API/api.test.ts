import { ingredients } from '../../prisma/constants';
import {
	getAllIngredients,
	getAllProducts,
	getCartById,
	getProductsByString,
	hasPromocode,
} from './api';

describe('API', () => {
	test('Ingredients', async () => {
		const result = await getAllIngredients();
		expect(result).toEqual(
			expect.arrayContaining(
				ingredients.map((ingredient) => expect.objectContaining(ingredient))
			)
		);
	});

	test('products', async () => {
		const result = await getAllProducts();
		expect(result).toBe(true);
	});

	test('hasPromocode', async () => {
		const result = await hasPromocode('123');
		expect(result).toBe(true);
	});

	test('getCartById', async () => {
		const result = await getCartById();
		expect(result).toBe(true);
	});

	test('getProductsByString', async () => {
		const result = await getProductsByString('Сырн');
		expect(result).toEqual([
			{
				id: 5,
				name: 'Сырная',
				imageUrl: '/assets/Pizza/Сырная.png',
				categoryId: 1,
				createdAt: '2025-05-22T15:28:30.934Z',
				updateAt: '2025-05-22T15:28:30.934Z',
			},
			{
				id: 13,
				name: 'Омлет сырный в пите',
				imageUrl:
					'https://media.dodostatic.net/image/r:233x233/019591e783ae7565839c0f49857593de.avif',
				categoryId: 2,
				createdAt: '2025-05-22T15:28:30.941Z',
				updateAt: '2025-05-22T15:28:30.941Z',
			},
			{
				id: 15,
				name: 'Сырники со сгущённым молоком',
				imageUrl:
					'https://media.dodostatic.net/image/r:233x233/11ef90613992fbc69c3dd4772681c783.avif',
				categoryId: 2,
				createdAt: '2025-05-22T15:28:30.941Z',
				updateAt: '2025-05-22T15:28:30.941Z',
			},
			{
				id: 16,
				name: 'Сырники с малиновым вареньем',
				imageUrl:
					'https://media.dodostatic.net/image/r:233x233/11ef9060f35d7c26bf41590b9079febe.avif',
				categoryId: 2,
				createdAt: '2025-05-22T15:28:30.941Z',
				updateAt: '2025-05-22T15:28:30.941Z',
			},
			{
				id: 17,
				name: 'Сырники',
				imageUrl:
					'https://media.dodostatic.net/image/r:233x233/11ef9060dd723610942e8f368b03540a.avif',
				categoryId: 2,
				createdAt: '2025-05-22T15:28:30.941Z',
				updateAt: '2025-05-22T15:28:30.941Z',
			},
		]);
	});
});
