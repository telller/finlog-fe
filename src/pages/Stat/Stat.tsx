import { useEffect } from 'react';
import { Flex } from 'antd';
import dayjs from 'dayjs';
import { ExpensesBarChart, ExpensesPieChart, ExpensesStatTable } from '@src/components';
import {
  useExpensesStatListState,
  useDaysStatState,
  useTagsStatState,
  useTagsState,
} from '@src/state';
import './Stat.css';

function Stat() {
  const { expensesStatList, loading: expLoading, getExpensesStatList } = useExpensesStatListState();
  const { tagsStat, loading: tagsStatLoading, getTagsStat } = useTagsStatState();
  const { daysStat, loading: daysStatLoading, getDaysStat } = useDaysStatState();
  const { tags, loading: tagsLoading, getTagsList } = useTagsState();

  const fromDateTime = dayjs().utc().startOf('month').format();
  const toDateTime = dayjs().utc().endOf('month').format();

  console.log({ fromDateTime, toDateTime });

  useEffect(() => {
    (async () => await getExpensesStatList({ page: 1, fromDateTime, toDateTime }))();
  }, [getExpensesStatList, fromDateTime, toDateTime]);

  useEffect(() => {
    (async () => await getTagsStat({ fromDateTime, toDateTime }))();
  }, [getTagsStat, fromDateTime, toDateTime]);

  useEffect(() => {
    (async () => await getDaysStat({ fromDateTime, toDateTime }))();
  }, [getDaysStat, fromDateTime, toDateTime]);

  useEffect(() => {
    (async () => await getTagsList())();
  }, [getTagsList]);

  console.log({ expensesStatList, expLoading });
  console.log({ tagsStat, tagsStatLoading });
  console.log({ daysStat, daysStatLoading });
  console.log({ tags, tagsLoading });

  return (
    <Flex gap="middle" vertical className="stat-container">
      <Flex>
        <ExpensesPieChart />
        <ExpensesBarChart />
      </Flex>
      <ExpensesStatTable expenses={expensesStatList} loading={expLoading} />
    </Flex>
  );
}

export default Stat;
