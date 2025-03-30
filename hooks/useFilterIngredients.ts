import { Api } from '@/services/api';
import { useEffect, useState } from 'react';
import { useSet } from 'react-use';

type Item = {
	text: string;
	value: string;
};

type Props = {
	ingredients: Item[];
	selectedIngredients: Set<string>;
	onSelectId: (id: string) => void;
	onAdd: (id: string) => void;
};

export const useFilterIngredients = (): Props => {
	const [ingredients, setIngredients] = useState<Item[]>([]);
	const [selectedIngredients, { toggle, add }] = useSet(new Set<string>([]));

	async function getData() {
		await Api.ingredients
			.getAll()
			.then((data) =>
				setIngredients(
					data.map((item) => ({ text: item.name, value: item.id.toString() }))
				)
			)
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		getData();
	}, []);

	return { ingredients, selectedIngredients, onSelectId: toggle, onAdd: add };
};
