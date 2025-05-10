import { create } from 'zustand';

type State = {
	price?: number;
	setPrice: (price: number) => void;
	type?: string;
	setType: (type: string) => void;
};

export const useDeliveryStore = create<State>((set) => ({
	price: 39,
	setPrice: (price) => set({ price: price }),
	type: 'DEFAULT',
	setType: (type) => set({ type: type }),
}));
