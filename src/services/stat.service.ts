import axios from './axios.service';
import qs from 'query-string';
import type { ExpenseStatFilterDto, GetExpenseStatListDto } from '@src/dto';

export const getTagsStat = (query: ExpenseStatFilterDto) => {
  return axios.get(`/stat/tags-stat?${qs.stringify(query)}`);
};

export const getDaysStat = (query: ExpenseStatFilterDto) => {
  return axios.get(`/stat/days-stat?${qs.stringify(query)}`);
};

export const getExpensesStatList = (query: GetExpenseStatListDto) => {
  return axios.get(`/stat/expenses-list?${qs.stringify(query)}`);
};
