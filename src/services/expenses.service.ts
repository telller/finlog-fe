import axios from './axios.service';

export const getExpensesList = (page: number, fromDateTime: string, toDateTime: string) =>
  axios.get(
    `http://localhost:3000/api/v1/expenses/list?page=${page}&fromDateTime=${fromDateTime}&toDateTime=${toDateTime}`,
  );
