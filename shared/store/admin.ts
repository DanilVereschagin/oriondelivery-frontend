import { create } from 'zustand';

type State = {
	page?: string;
	setPage: (page: string) => void;
};

export const useAdminStore = create<State>((set) => ({
	page: 'ORDERS',
	setPage: (page: string) => set({ page }),
}));
