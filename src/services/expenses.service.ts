import axios from './axios.service';
import qs from 'query-string';
import type { GetExpenseStatListDto, UpsertExpenseDto } from '@src/dto';

export const getExpensesList = (page: number) => axios.get(`/expenses/list?page=${page}`);

export const getExpensesStatList = (query: GetExpenseStatListDto) => {
  return axios.get(`/expenses/stat-list?${qs.stringify(query)}`);
};

export const createExpense = (body: UpsertExpenseDto) => axios.post(`/expenses`, body);

export const updateExpense = (id: string, body: UpsertExpenseDto) =>
  axios.put(`/expenses/${id}`, body);

export const deleteExpense = (id: string) => axios.delete(`/expenses/${id}`);
