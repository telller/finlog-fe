import { useEffect } from 'react';
import { useExpensesList } from '@src/hooks/expenses.hooks.ts';

function Stat() {
  const { expenses, getExpensesList } = useExpensesList();

  useEffect(() => {
    (async () => await getExpensesList())();
  }, [getExpensesList]);

  console.log(expenses);
  return <h1>{expenses.items.length} around here ...</h1>;
}

export default Stat;
