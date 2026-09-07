import { create } from 'zustand';
import { getTagsStat, getDaysStat, getExpensesStatList, getGeneralStat } from '@src/services';
import type { ExpenseStatFilterDto, GetExpenseStatListDto } from '@src/dto';
import type { DayStat, Expense, GeneralStat, TagStat } from '@src/types';

interface GeneralStatState {
  getGeneralStat: (data: ExpenseStatFilterDto) => Promise<void>;
  generalStat: GeneralStat;
  loading: boolean;
}

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

export const useGeneralStatState = create<GeneralStatState>((set) => ({
  generalStat: {
    total: 0,
    average: 0,
    averagePerDay: 0,
    transactions: 0,
  },
  loading: true,
  getGeneralStat: async (data: ExpenseStatFilterDto) => {
    console.log(data);
    set({ loading: true });
    const { data: generalStat } = await getGeneralStat(data);
    set({ generalStat, loading: false });
  },
}));

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
