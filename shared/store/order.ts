import { create } from 'zustand';

type State = {
	amount: number;
	setAmount: (price: number) => void;
};

export const useOrderStore = create<State>((set) => ({
	amount: 0,
	setAmount: (amount) => set({ amount: amount }),
}));
