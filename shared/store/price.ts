import { create } from 'zustand';

type State = {
	priceFrom?: number;
	setPriceFrom: (price: number) => void;
	priceTo?: number;
	setPriceTo: (price: number) => void;
};

export const usePriceStore = create<State>((set, get) => ({
	priceFrom: 0,
	priceTo: 10000,
	setPriceFrom: (price) => set({ priceFrom: price }),
	setPriceTo: (price) => set({ priceTo: price }),
}));
