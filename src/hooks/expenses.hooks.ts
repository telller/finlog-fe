import { create } from 'zustand';
import { getExpensesList } from '@src/services/expenses.service';
import type { Expense } from '@src/types';

interface ExpensesListState {
  expenses: {
    items: Expense[];
    total: number;
  };
  loading: boolean;
  getExpensesList: (page: number) => Promise<void>;
}

export const useExpensesList = create<ExpensesListState>((set) => ({
  expenses: {
    items: [],
    total: 0,
  },
  loading: false,
  getExpensesList: async (page: number) => {
    set({ loading: true });
    const res = await getExpensesList(page);
    set((state) => ({
      expenses:
        page === 1
          ? res.data
          : { items: [...state.expenses.items, ...res.data.items], total: res.data.total },
      loading: false,
    }));
  },
}));
