import { create } from 'zustand';
import { getExpensesList } from '@src/services';
import type { Expense } from '@src/types';

interface ExpensesListState {
  getExpensesList: (page: number) => Promise<void>;
  expenses: { items: Expense[]; total: number };
  loading: boolean;
}

export const useExpensesState = create<ExpensesListState>((set) => ({
  expenses: { items: [], total: 0 },
  loading: true,
  getExpensesList: async (page: number) => {
    set({ loading: true });
    const { data } = await getExpensesList(page);
    set((state) => ({
      expenses:
        page === 1 ? data : { items: [...state.expenses.items, ...data.items], total: data.total },
      loading: false,
    }));
  },
}));
