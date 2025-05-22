import { create } from 'zustand';

type State = {
	page?: string;
	setPage: (page: string) => void;
};

export const useAdminStore = create<State>((set) => ({
	page: 'Пицца',
	setPage: (page: string) => set({ page }),
}));
