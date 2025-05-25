export const getAllIngredients = async () => {
	const response = await fetch('http://localhost:3000/api/ingredients');
	return response.json();
};

export const getAllProducts = async () => {
	try {
		const response = await fetch('http://localhost:3000/api/categories');
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const hasPromocode = async (code: string) => {
	try {
		const response = await fetch(
			`http://localhost:3000/api/promocode?promo=${code}`
		);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const getCartById = async () => {
	try {
		const response = await fetch(`http://localhost:3000/api/cart/`);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const getProductsByString = async (str: string) => {
	try {
		const response = await fetch(
			`http://localhost:3000/api/products/search?q=${str}`
		);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	} catch (error) {
		console.log(error);
		return false;
	}
};
