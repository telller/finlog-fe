import axios from './axios.service';

export const getExpensesList = () =>
  axios.get(
    'http://localhost:3000/api/v1/expenses/list?page=1&fromDateTime=2025-11-18T18%3A46%3A42%2B02%3A00&toDateTime=2025-11-20T18%3A46%3A42%2B02%3A00',
  );
