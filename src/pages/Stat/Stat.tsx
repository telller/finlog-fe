import { useExpensesStatState, useTagsState } from '@src/state';
import { useEffect } from 'react';
import dayjs from 'dayjs';

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

  return <h1>STAT PAGE</h1>;
}

export default Stat;
