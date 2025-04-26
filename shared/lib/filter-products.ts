import { prisma } from '@/prisma/PrismaClient';
import { Category } from '@prisma/client';

export interface SearchParams {
	query: string;
	sizes?: string;
	pizzaTypes?: string;
	priceFrom?: string;
	priceTo?: string;
	ingredients?: string;
}

const PRICE_LIMIT = {
	from: 0,
	to: 10000,
};

export const filterProducts = async (
	searchParams: SearchParams
): Promise<Category[]> => {
	const sizes = searchParams.sizes?.split(',').map(Number) || [];
	const pizzaTypes = searchParams.pizzaTypes?.split(',').map(Number) || [];
	const ingredientsId = searchParams.ingredients?.split(',').map(Number) || [];

	const minPrice = searchParams.priceFrom
		? Number(searchParams.priceFrom)
		: PRICE_LIMIT.from;
	const maxPrice = searchParams.priceTo
		? Number(searchParams.priceTo)
		: PRICE_LIMIT.to;

	const categories = await prisma.category.findMany({
		include: {
			products: {
				where: {
					ingredients:
						ingredientsId.length > 0
							? { some: { id: { in: ingredientsId } } }
							: undefined,
					variants: {
						some: {
							size: { in: sizes.length > 0 ? sizes : undefined },
							pizzaType: { in: pizzaTypes.length > 0 ? pizzaTypes : undefined },
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
					},
				},
				include: {
					ingredients: true,
					variants: {
						where: {
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
					},
				},
			},
		},
	});

	return categories;
};
