import axios from './axios.service';
import type { UpsertExpenseDto } from '@src/dto/upsertExpense.dto.ts';

export const getExpensesList = (page: number) => axios.get(`/expenses/list?page=${page}`);

export const createExpense = (body: UpsertExpenseDto) => axios.post(`/expenses`, body);

export const updateExpense = (id: string, body: UpsertExpenseDto) =>
  axios.put(`/expenses/${id}`, body);

export const deleteExpense = (id: string) => axios.delete(`/expenses/${id}`);
