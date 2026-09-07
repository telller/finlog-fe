import { Flex, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import type { Expense } from '@src/types';
import { useTagsState } from '@src/state';
import './ExpensesStatTable.css';

interface ExpensesTableProps {
  expenses: Expense[];
  loading: boolean;
}

const ExpensesStatTable = ({ expenses, loading }: ExpensesTableProps) => {
  const { tagsMap } = useTagsState();
  const columns = [
    {
      title: 'Дата',
      dataIndex: 'spendAt',
      width: 200,
      render: (spendAt: string) => dayjs(spendAt).format('DD.MM.YYYY'),
    },
    {
      title: 'Опис',
      dataIndex: 'description',
    },
    {
      title: 'Категорія',
      dataIndex: 'tagId',
      width: 200,
      render: (tagId: string) => {
        const tag = tagsMap.get(tagId);
        return (
          <Tag key={tagId} color={tag?.color} className="tag">
            {tag?.name}
          </Tag>
        );
      },
    },
    {
      title: 'Сумма',
      dataIndex: 'amount',
      width: 200,
      render: (amount: string) => `-${amount} UAH`,
    },
  ];
  return (
    <Flex className="expenses-stat-table-container">
      <Table
        dataSource={expenses}
        scroll={{ y: '100%' }}
        pagination={false}
        columns={columns}
        loading={loading}
        size="small"
        rowKey="id"
      />
    </Flex>
  );
};

export default ExpensesStatTable;
