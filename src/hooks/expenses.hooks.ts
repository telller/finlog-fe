import { create } from 'zustand';
import { getExpensesList } from '@src/services/expenses.service.ts';
import type { Expense } from '@src/types/expenses.ts';

interface ExpensesListState {
  expenses: {
    items: Expense[];
    total: number;
  };
  getExpensesList: (page: number, fromDateTime: string, toDateTime: string) => Promise<void>;
}

export const useExpensesList = create<ExpensesListState>((set) => ({
  expenses: {
    items: [],
    total: 0,
  },
  getExpensesList: async (page: number, fromDateTime: string, toDateTime: string) => {
    const res = await getExpensesList(page, fromDateTime, toDateTime);
    set({ expenses: res.data });
  },
}));
