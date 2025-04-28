import { Ingredient } from '@prisma/client';

export const convertIngredientsToString = (ingredients: Ingredient[]) => {
	let result = '';

	ingredients.forEach((ingredient) => {
		result += `${ingredient.name}, `;
	});

	return result.slice(0, -2);
};
