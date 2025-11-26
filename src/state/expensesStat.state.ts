import { create } from 'zustand';
import { getTagsStat, getDaysStat, getExpensesStatList } from '@src/services';
import type { ExpenseStatFilterDto, GetExpenseStatListDto } from '@src/dto';
import type { DayStat, Expense, TagStat } from '@src/types';

interface TagsStatState {
  getTagsStat: (data: ExpenseStatFilterDto) => Promise<void>;
  tagsStat: TagStat[];
  loading: boolean;
}

interface DaysStatState {
  getDaysStat: (data: ExpenseStatFilterDto) => Promise<void>;
  daysStat: DayStat[];
  loading: boolean;
}

interface ExpensesStatListState {
  getExpensesStatList: (data: GetExpenseStatListDto) => Promise<void>;
  expensesStatList: Expense[];
  loading: boolean;
}

export const useTagsStatState = create<TagsStatState>((set) => ({
  tagsStat: [],
  loading: true,
  getTagsStat: async (data: ExpenseStatFilterDto) => {
    console.log(data);
    set({ loading: true });
    const { data: tagsStat } = await getTagsStat(data);
    set({ tagsStat, loading: false });
  },
}));

export const useDaysStatState = create<DaysStatState>((set) => ({
  daysStat: [],
  loading: true,
  getDaysStat: async (data: ExpenseStatFilterDto) => {
    console.log(data);
    set({ loading: true });
    const { data: daysStat } = await getDaysStat(data);
    set({ daysStat, loading: false });
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
