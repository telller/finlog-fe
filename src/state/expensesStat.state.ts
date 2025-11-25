import { create } from 'zustand';
import type { GetExpenseStatListDto } from '@src/dto';
import { getExpensesStatList } from '@src/services';
import type { Expense } from '@src/types';

interface ExpensesStatState {
  getExpensesStatList: (data: GetExpenseStatListDto) => Promise<void>;
  expensesStat: Expense[];
  loading: boolean;
}

export const useExpensesStatState = create<ExpensesStatState>((set) => ({
  expensesStat: [],
  loading: true,
  getExpensesStatList: async (data: GetExpenseStatListDto) => {
    set({ loading: true });
    const { data: expensesStat } = await getExpensesStatList(data);
    set({ expensesStat, loading: false });
  },
}));
