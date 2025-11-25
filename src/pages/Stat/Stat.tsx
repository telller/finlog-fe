import { useEffect } from 'react';
import { Flex } from 'antd';
import dayjs from 'dayjs';
import { ExpensesPieChart, ExpensesStatTable } from '@src/components';
import { useExpensesStatState, useTagsState } from '@src/state';
import './Stat.css';

function Stat() {
  const { expensesStat, loading, getExpensesStatList } = useExpensesStatState();
  const { tags, loading: tagsLoading, getTagsList } = useTagsState();

  const fromDateTime = dayjs().utc().startOf('month').format();
  const toDateTime = dayjs().utc().endOf('month').format();

  useEffect(() => {
    (async () => await getExpensesStatList({ fromDateTime, toDateTime }))();
  }, [fromDateTime, getExpensesStatList, toDateTime]);

  useEffect(() => {
    (async () => await getTagsList())();
  }, [getTagsList]);

  console.log({ expensesStat, loading });
  console.log({ tags, tagsLoading });

  return (
    <Flex gap="middle" vertical className="stat-container">
      <ExpensesPieChart />
      <ExpensesStatTable expenses={expensesStat} loading={loading} />
    </Flex>
  );
}

export default Stat;
