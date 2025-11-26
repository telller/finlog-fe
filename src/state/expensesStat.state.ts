import { create } from 'zustand';
import type { ExpenseStatFilterDto, GetExpenseStatListDto } from '@src/dto';
import { getExpensesStatList, getTagsStat } from '@src/services';
import type { Expense, TagStat } from '@src/types';

interface TagsStateState {
  getTagsStat: (data: ExpenseStatFilterDto) => Promise<void>;
  tagsStat: TagStat[];
  loading: boolean;
}

interface ExpensesStatListState {
  getExpensesStatList: (data: GetExpenseStatListDto) => Promise<void>;
  expensesStatList: Expense[];
  loading: boolean;
}

export const useTagsStatState = create<TagsStateState>((set) => ({
  tagsStat: [],
  loading: true,
  getTagsStat: async (data: ExpenseStatFilterDto) => {
    console.log(data);
    set({ loading: true });
    const { data: tagsStat } = await getTagsStat(data);
    set({ tagsStat, loading: false });
  },
}));

export const useExpensesStatListState = create<ExpensesStatListState>((set) => ({
  expensesStatList: [],
  loading: true,
  getExpensesStatList: async (data: GetExpenseStatListDto) => {
    console.log(data);
    set({ loading: true });
    const { data: expensesStatList } = await getExpensesStatList(data);
    set({ expensesStatList, loading: false });
  },
}));
