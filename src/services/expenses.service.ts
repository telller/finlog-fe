import axios from './axios.service';
import type { UpsertExpenseDto } from '@src/dto/upsertExpense.dto.ts';

export const getExpensesList = (page: number, fromDateTime: string, toDateTime: string) =>
  axios.get(
    `http://localhost:3000/api/v1/expenses/list?page=${page}&fromDateTime=${fromDateTime}&toDateTime=${toDateTime}`,
  );

export const createExpense = (body: UpsertExpenseDto) =>
  axios.post(`http://localhost:3000/api/v1/expenses`, body);

export const updateExpense = (id: string, body: UpsertExpenseDto) =>
  axios.put(`http://localhost:3000/api/v1/expenses/${id}`, body);

export const deleteExpense = (id: string) =>
  axios.delete(`http://localhost:3000/api/v1/expenses/${id}`);
