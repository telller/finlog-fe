import { create } from 'zustand';
import { getExpensesList } from '@src/services/expenses.service.ts';
import type { Expense } from '@src/types/expenses.ts';

interface ExpensesListState {
  expenses: {
    items: Expense[];
    total: number;
  };
  getExpensesList: () => Promise<void>;
}

export const useExpensesList = create<ExpensesListState>((set) => ({
  expenses: {
    items: [],
    total: 0,
  },
  getExpensesList: async () => {
    const res = await getExpensesList();
    set({ expenses: res.data });
  },
}));
