import { create } from 'zustand';

type State = {
	price?: number;
	setPrice: (price: number) => void;
};

export const useDeliveryStore = create<State>((set) => ({
	price: 39,
	setPrice: (price) => set({ price: price }),
}));
