import { useEffect, useState } from 'react';
import { Flex } from 'antd';
import dayjs from 'dayjs';
import { ExpensesBarChart, ExpensesPieChart, ExpensesStatTable, StatFilter } from '@src/components';
import {
  useExpensesStatListState,
  useDaysStatState,
  useTagsStatState,
  useTagsState,
} from '@src/state';
import './Stat.css';
import type { ExpenseStatFilterDto } from '@src/dto';

function Stat() {
  const fromDateTime = dayjs().utc().startOf('month').format();
  const toDateTime = dayjs().utc().endOf('month').format();
  const { expensesStatList, loading: expLoading, getExpensesStatList } = useExpensesStatListState();
  const { tagsStat, loading: tagsStatLoading, getTagsStat } = useTagsStatState();
  const { daysStat, loading: daysStatLoading, getDaysStat } = useDaysStatState();
  const { tags, loading: tagsLoading, getTagsList } = useTagsState();
  const [statFilter, setStatFilter] = useState<ExpenseStatFilterDto>({ fromDateTime, toDateTime });

  useEffect(() => {
    (async () => await getExpensesStatList({ page: 1, ...statFilter }))();
  }, [getExpensesStatList, statFilter]);

  useEffect(() => {
    (async () => await getTagsStat(statFilter))();
  }, [getTagsStat, statFilter]);

  useEffect(() => {
    (async () => await getDaysStat(statFilter))();
  }, [getDaysStat, statFilter]);

  useEffect(() => {
    (async () => await getTagsList())();
  }, [getTagsList]);

  console.log({ expensesStatList, expLoading });
  console.log({ tagsStat, tagsStatLoading });
  console.log({ daysStat, daysStatLoading });
  console.log({ tags, tagsLoading });

  return (
    <Flex gap="middle" vertical className="stat-container">
      <StatFilter onApply={(filter: ExpenseStatFilterDto) => setStatFilter(filter)} />
      <Flex>
        <ExpensesPieChart />
        <ExpensesBarChart />
      </Flex>
      <ExpensesStatTable expenses={expensesStatList} loading={expLoading} />
    </Flex>
  );
}

export default Stat;
