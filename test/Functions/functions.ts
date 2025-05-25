import { convertToCart } from '../../shared/lib/convert-to-cart';
import { convertIngredientsToString } from '../../shared/lib/convert-ingredients-to-string';
import { Cart, Ingredient } from '@prisma/client';
import { hasPromocode } from '../../shared/lib/hasPromocode';

export const convertIngredients = (ingredients: Ingredient[]) => {
	return convertIngredientsToString(ingredients);
};

export const convertCart = (cart: Cart) => {
	const plateCart = convertToCart(cart);
	return plateCart;
};

export const bePromocode = async (code: string) => {
	const result = await hasPromocode(code);
	if (result) {
		return true;
	}
	return false;
};
